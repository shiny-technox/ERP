<?php

namespace App\Http\Controllers\employee;

use App\Http\Controllers\Controller;
use App\Http\Requests\ScheduleInterviewStoreRequest;
use App\Http\Requests\ScheduleInterviewUpdateRequest;
use App\Models\EmployeeScheduleInterview;
use Illuminate\Http\Request;

class EmployeeScheduleInterviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $ScheduleInterview = EmployeeScheduleInterview::all();
        return response()->json([
            'ScheduleInterview'=>$ScheduleInterview,
            'code'=>200,
            'status'=>'success'
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ScheduleInterviewStoreRequest $request)
    {
        //
        $validatedData = $request->validated();
        $scheduleInterview = EmployeeScheduleInterview::create([
            'interviewer_name' => $request->interviewerName,
            'interviewer_email' => $request->interviewerEmail,
            'interviewer_phone' => $request->interviewerPhone,
            'interview_schedule_date' => $request->interviewScheduleDate,
            'interview_schedule_time' => $request->interviewScheduleTime
        ]);
        if($scheduleInterview){
            return response()->json([
                'scheduleInterview' => $scheduleInterview,
                'message' => 'Data inserted sucessfully',
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $scheduleInterviewQry = EmployeeScheduleInterview::findOrFail($id);

        if($scheduleInterviewQry){
            return response()->json([
                'scheduleInterview' => $scheduleInterviewQry,
                'message' => 'Data inserted sucessfully',
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

    /**
     * Update the specified resource in storage.
     */
    public function update(ScheduleInterviewUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();

        $scheduleInterviewQry = EmployeeScheduleInterview::findOrFail($id);

        $scheduleInterview = $scheduleInterviewQry->update([
            'interviewer_name' => $request->interviewerName,
            'interviewer_email' => $request->interviewerEmail,
            'interviewer_phone' => $request->interviewerPhone,
            'interview_schedule_date' => $request->interviewScheduleDate,
            'interview_schedule_time' => $request->interviewScheduleTime
        ]);

        if($scheduleInterview){
            return response()->json([
                'ScheduleInterview' => $scheduleInterview,
                'message' => 'Data updated sucessfully',
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $scheduleInterviewQry = EmployeeScheduleInterview::findOrFail($id);
        $scheduleInterviewDel = $scheduleInterviewQry->delete();
        if($scheduleInterviewDel){
            return response()->json([
                'message' => 'Data deleted sucessfully',
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
