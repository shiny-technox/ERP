<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageTaskStoreRequest;
use App\Http\Requests\ManageTaskUpdateRequest;
use App\Models\ManageTask;
use Illuminate\Http\Request;

class ManageTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
       $manageTask = ManageTask::with('arrProject')->get();
        // dd($manageTask);
       return response()->json([
        'ManageTask'=>$manageTask,
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
    public function store(ManageTaskStoreRequest $request)
    {
        //
        $validatedData = $request->validated();

        $ManageTask = ManageTask::create([
            'projectId' => $validatedData['projId'],
            'employeeId' => $validatedData['empId'],
            'taskTitle' => $validatedData['taskTitle'],
            'taskDescription' => $validatedData['taskDescription'],
            'taskTime' => $validatedData['taskTime']
        ]);

        return response()->json([
            'ManageTask'=>$ManageTask,
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
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $manageTask = ManageTask::findOrFail($id);

        return response()->json([
         'ManageTask'=>$manageTask,
         'code'=>200,
         'status'=>'success'
         ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ManageTaskUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();

        $ManageTaskQry = ManageTask::findOrFail($id);

        $ManageTask = $ManageTaskQry->update([
            'projectId' => $validatedData['projId'],
            'employeeId' => $validatedData['empId'],
            'taskTitle' => $validatedData['taskTitle'],
            'taskDescription' => $validatedData['taskDescription'],
            'taskTime' => $validatedData['taskTime']
        ]);

        return response()->json([
            'ManageTask'=>$ManageTaskQry,
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
        $manageTask = ManageTask::findOrFail($id);
        $manageTask->delete();
        return response()->json([
            'message'=>'Manage Task deleted sucessfully',
            'code'=>200,
            'status'=>'success'
        ],200);
    }
}
