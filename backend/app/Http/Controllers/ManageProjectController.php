<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageProjectCreateRequest;
use App\Http\Requests\ManageProjectUpdateRequest;
use App\Models\ManageProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ManageProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
       $ManageProject = ManageProject::all();
       return response()->json([
        'ManageProject'=>$ManageProject,
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
    public function store(ManageProjectCreateRequest $request)
    {
        //
        $validatedData = $request->validated();

        $ManageProject = ManageProject::create([
            'projName' => $validatedData['projName'],
            'clientName' => $validatedData['clientName'],
            'clientPhone' => $validatedData['clientPhone'],
            'clientEmail' => $validatedData['clientEmail'],
            'projDuration' => $validatedData['projDuration']
        ]);

            return response()->json([
                'ManageProject'=>$ManageProject,
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
        $ManageProject = ManageProject::findOrFail($id);
        return response()->json([
         'ManageProject'=>$ManageProject,
         'code'=>200,
         'status'=>'success'
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ManageProjectUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();

        $ManageProjectQry = ManageProject::findOrFail($id);

        $ManageProject = $ManageProjectQry->update([
            'projName' => $validatedData['projName'],
            'clientName' => $validatedData['clientName'],
            'clientPhone' => $validatedData['clientPhone'],
            'clientEmail' => $validatedData['clientEmail'],
            'projDuration' => $validatedData['projDuration']
        ]);

            return response()->json([
                'ManageProject'=>$ManageProject,
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
        $manage_project = ManageProject::findOrFail($id);
        $manage_project->delete();
        return response()->json([
            'message'=>'Data deleted sucessfully',
            'code'=>200,
            'status'=>'success'
        ],200);
    }
}
