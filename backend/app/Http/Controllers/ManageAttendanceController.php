<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\applyLeaveRequest;
use App\Http\Requests\AssignLeaveRequest;
use App\Http\Requests\ManaageAttendanceUpdateRequest;
use App\Http\Requests\ManageAttendanceStoreRequest;
use App\Models\apply_leave;
use App\Models\ApplyLeave;
use App\Models\ManageAttendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManageAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $attendanceRecords = ManageAttendance::select('date', 'user_id', DB::raw('MAX(id) as max_id'), DB::raw('MIN(inTime) as minInTime')) ->with('arrUser') ->groupBy('date', 'user_id') ->get();
        // $currentDate = Carbon::now()->format('Y-m-d');
        $arrData = [];
        foreach ($attendanceRecords as $key => $attendanceData) {
            $attLastTime = ManageAttendance::select('outTime')->where('id', $attendanceData->max_id)->first();
            //dd($attLastTime);
            $minInTime = $attendanceData->minInTime;
            $maxOutTime = $attLastTime->outTime;
            $userId = $attendanceData->user_id;
            $date = $attendanceData->date;
            $userName = $attendanceData->arrUser[0]->name;
            $empId = $attendanceData->arrUser[0]->emp_id;
            $totalTimeWorking=null;
            if($maxOutTime){
                $manageAttendanceAll = ManageAttendance::where('user_id', $userId)->where('date',$date)->get();
                $totalTimeWorking = $this->workingTimeNow($manageAttendanceAll);
            }
            
            $arrData[] = [
                'minInTime' => $minInTime,
                'maxOutTime' => $maxOutTime,
                'totalWorking' => $totalTimeWorking,
                'id' => $userId,
                'name' => $userName,
                'empId' => $empId,
                'date' => $date
            ];
        }

        return response()->json([
            'ManageAttendance' => $arrData,
            'code' => 200,
            'status' => 'success'
        ], 200);
    }

    public function store(ManageAttendanceStoreRequest $request)
    {
        //
        $validatedData = $request->validated();
        $currentTime = Carbon::now()->format('H:i');
        $ManageAttendance = ManageAttendance::create([
            'user_id' => $validatedData['user_id'],
            'date' => $validatedData['date'],
            'inTime' => $currentTime,
        ]);

        return response()->json([
            'ManageAttendance' => $ManageAttendance,
            'code' => 200,
            'status' => 'success'
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $currentDate = Carbon::now()->format('Y-m-d');
        $ManageAttend = ManageAttendance::where('user_id',$id)->where('date',$currentDate)->where('outTime',null)->orderByDesc('id')->first();
        //dd($ManageAttend);
        return response()->json([
            'ManageAttendance' => $ManageAttend,
            'code' => 200,
            'status' => 'success'
        ], 200);
    }

    public function update(ManaageAttendanceUpdateRequest $request, string $id)
    {
        // Validate the request data
        $validatedData = $request->validated();
        $currentTime = Carbon::now()->format('H:i');
        $currentDate = Carbon::now()->format('Y-m-d');
        // Find the specific attendance record by ID, user_id, and date
        $manageAttendance = ManageAttendance::where('id', $id)
            ->where('user_id', $validatedData['user_id'])
            ->where('date', $validatedData['date'])
            ->firstOrFail();

        // Update the outTime
        $manageAttendance->update([
            'outTime' => $currentTime,
        ]);

        // Refresh the model to get the latest data
        $manageAttendance->refresh();

        // Retrieve all attendance records for the user
        $manageAttendanceAll = ManageAttendance::where('user_id', $validatedData['user_id'])->where('date',$currentDate)->get();
        //dd($manageAttendanceAll);

        $totalTimeWorking = $this->workingTimeNow($manageAttendanceAll);
        // Return the response
        return response()->json([
            'workingTimeEnd' => $totalTimeWorking,
            'message' => 'Attendance updated',
            'code' => 200,
            'status' => 'success',
        ], 200);
    }

    public function workingTimeNow($manageAttendanceAll)
    {
        // Calculate the total working time
        $totalSeconds = $manageAttendanceAll->reduce(function ($carry, $attendance) {
            $inTimeRaw = Carbon::parse($attendance->inTime);
            $outTimeRaw = Carbon::parse($attendance->outTime);

            $inTime = Carbon::parse($inTimeRaw);
            $outTime = Carbon::parse($outTimeRaw);

            $workinTimeRaw = $inTime->diff($outTime);

            $workingTime = $workinTimeRaw->format('%H:%I');

            list($hours, $minutes) = explode(':', $workingTime);
            return $carry + ($hours * 3600) + ($minutes * 60);
        }, 0);

        // Convert total seconds back to hours and minutes
        $totalHours = floor($totalSeconds / 3600);
        $totalMinutes = floor(($totalSeconds % 3600) / 60);

        // Format the total time as H:i
        return $totalTimeWorking = sprintf('%02d:%02d', $totalHours, $totalMinutes);
    }

    public function monthlyReport(Request $request)
{
    // Validate the request parameters
    $validated = $request->validate([
        'employeeName' => 'required|integer|exists:users,id',
        'month' => 'required|integer|between:1,12',
        'year' => 'required|integer|min:1900|max:' . date('Y'),
    ]);

    $employeeId = $validated['employeeName'];
    $month = $validated['month'];
    $year = $validated['year'];

    // Fetch the monthly attendance records
    $MonthlyAttendance = ManageAttendance::selectRaw('user_id, date, COUNT(*) as total_attendances,MIN(inTime) as inTime, MAX(outTime) as outTime')
        ->where('user_id', $employeeId)
        ->whereMonth('date', $month)
        ->whereYear('date', $year)
        ->groupBy('user_id', 'date')
        ->with('arrUser') // Ensure 'arrUser' relationship is loaded
        ->get();

    $attendanceData = [];

    foreach ($MonthlyAttendance as $dataAttendance) {
        $user = $dataAttendance->arrUser->first(); // Assuming each ManageAttendance has one related User
        if ($user) {
            // Calculate total working time for the current date
            $manageAttendanceAll = ManageAttendance::where('user_id', $employeeId)
                ->whereDate('date', $dataAttendance->date)
                ->get();
                $totalTimeWorking= null;
                if($dataAttendance->outTime){
                    $totalTimeWorking = $this->workingTimeNow($manageAttendanceAll);
                }
            

            // Collect attendance data
            $attendanceData[] = [
                'user_id' => $dataAttendance->user_id,
                'date' => $dataAttendance->date,
                'inTime'=>$dataAttendance->inTime,
                'outTime'=>$dataAttendance->outTime,
                'name' => $user->name,
                'emp_id' => $user->emp_id,
                'total_working_time' => $totalTimeWorking,
            ];
        }
    }

    // Return the response as JSON
    return response()->json([
        'MonthlyAttendance' => $attendanceData,
        'message' => 'Attendance updated',
        'code' => 200,
        'status' => 'success',
    ], 200);
}

public function apply_leave(applyLeaveRequest $request)
{
    // Validate the request parameters
    $validatedData = $request->validated();
    $applyLeave = ApplyLeave::create([
        'employee_id' => $request->empId,
        'from_date' => $request->fromDate,
        'to_date' => $request->toDate,
        'duration' => $request->duration,
        'leave_type' => $request->leaveType,
        'from_time' => $request->fromTime,
        'to_time' => $request->toTime,
        'attachments' => $request->attachments,
        'comments' => $request->comments
    ]);
    if($applyLeave){
        return response()->json([
            'message' => 'Attendance updated',
            'code' => 200,
            'status' => 'success',
        ], 200);
    } else {
        return response()->json([
            'message' => 'Somthing went w',
            'code' => 420,
            'status' => 'success',
        ], 420);
    }

}

public function assign_leave(AssignLeaveRequest $request)
{
    $validatedData = $request->validated();
    $assignLeave = ApplyLeave::create([
        'from_date' => $request->fromDate,
        'to_date' => $request->toDate,
        'duration' => $request->duration,
        'leave_type' => $request->leaveType,
        'from_time' => $request->fromTime,
        'to_time' => $request->toTime,
        'comments' => $request->comments
    ]);
    if($assignLeave){
        return response()->json([
            'message' => 'Leave updated',
            'code' => 200,
            'status' => 'success',
        ], 200);
    } else {
        return response()->json([
            'message' => 'Somthing went wrong',
            'code' => 420,
            'status' => 'success',
        ], 420);
    }
}

}    