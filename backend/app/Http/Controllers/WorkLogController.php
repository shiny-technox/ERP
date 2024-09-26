<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkLogStoreRequest;
use App\Http\Requests\WorkLogUpdateRequest;
use App\Models\WorkLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WorkLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $WorkLog = WorkLog::with("ManageProjectArr")->with("ManageUserArr")->get();

        $WorkLog->transform(function($log) {
            $log->date = Carbon::parse($log->created_at)->format('Y-m-d'); // Change 'Y-m-d' to the desired format
            return $log;
        });
       // dd($WorkLog);
        return response()->json([
            'WorkLog'=>$WorkLog,
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
    public function store(WorkLogStoreRequest $request)
    {
        //
        $validatedData = $request->validated();
        //dd($validatedData);
        foreach ($validatedData as $taskData) {
         WorkLog::create([
            'emp_id' => $taskData['emp_id'],
            'proj_id' => $taskData['projId'],
            'task_title' => $taskData['taskTitle'],
            'task_desc' => $taskData['taskDescription'],
            'task_time' => $taskData['taskTime'],
            'task_status' => $taskData['workStatusId']
        ]);
    }

        return response()->json([
            'Message'=>"sucessfully inserted data",
            'code'=>200,
            'status'=>'success'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
       // return $id;
       $WorkLog = WorkLog::where('emp_id', $id)->with("ManageProjectArr")->with("ManageUserArr")->get();

       $WorkLog->transform(function($log) {
           $log->date = Carbon::parse($log->created_at)->format('Y-m-d'); // Change 'Y-m-d' to the desired format
           return $log;
       });
      // dd($WorkLog);
       return response()->json([
           'WorkLog'=>$WorkLog,
           'code'=>200,
           'status'=>'success'
           ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $WorkLog = WorkLog::where('id',$id)->with("ManageProjectArr")->with("ManageUserArr")->get();

        $WorkLog->transform(function($log) {
            $log->date = Carbon::parse($log->created_at)->format('Y-m-d'); 
            return $log;
        });
       // dd($WorkLog);
        return response()->json([
            'WorkLog'=>$WorkLog,
            'code'=>200,
            'status'=>'success'
            ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WorkLogUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();
        $workLogQry = WorkLog::findOrFail($id);
        //dd($validatedData);
        foreach ($validatedData as $taskData) {
            $workLogQry->update([
            'emp_id' => $taskData['emp_id'],
            'proj_id' => $taskData['projId'],
            'task_title' => $taskData['taskTitle'],
            'task_desc' => $taskData['taskDescription'],
            'task_time' => $taskData['taskTime'],
            'task_status' => $taskData['workStatusId']
        ]);
    }

        return response()->json([
            'WorkLog'=>$workLogQry,
            'code'=>200,
            'status'=>'success'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $WorkLog = WorkLog::findOrFail($id);
        $WorkLog->delete();
        return response()->json([
            'message'=>'Work Log deleted sucessfully',
            'code'=>200,
            'status'=>'success'
        ],200);
    }
}
