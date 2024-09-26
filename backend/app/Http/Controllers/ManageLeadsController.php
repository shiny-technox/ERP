<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageLeadsStatusStoreRequest;
use App\Http\Requests\ManageLeadsStoreRequest;
use App\Http\Requests\ManageLeadsUpdateRequest;
use App\Models\ManageLeads;
use App\Models\ManageLeadsProgres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ManageLeadsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $ManageLeads = ManageLeads::all();
       // dd($ManageLeads);
        if($ManageLeads){
            return response()->json([
                'ManageLeads'=>$ManageLeads,
                'code'=>200,
                'status'=>'success'
               ],200);
        } else {
            return response()->json([
                'Message'=>"Somthing Went Wrong",
                'code'=>422,
                'status'=>'faild'
               ],422);
        }

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
    public function store(ManageLeadsStoreRequest $request)
    {
        //
        $ManageLeads = ManageLeads::create([
            'date' => $request->date,
            'name' => $request->name,
            'company' => $request->company,
            'leads_type' => $request->leadType,
            'contact_numer' => $request->contactNumber,
            'owner_contact_number' => $request->ownerContactNumber,
            'requirement' => $request->requirement,
            'status' => $request->status,
        ]);
        if($ManageLeads){
            return response()->json([
                'ManageLeads'=>$ManageLeads,
                'code'=>200,
                'status'=>'success'
            ],200);
        } else {
            return response()->json([
                'Message'=>"Something went wrong",
                'code'=>422,
                'status'=>'faild'
            ],422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function status(ManageLeadsStatusStoreRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();
        
        $ManageLeadsProgress = ManageLeadsProgres::create([
            'leads_id' => $id,
            'progress' => $request->progress,
            'description' => $request->description,
            'next_follow_date' => $request->next_appointment_date,
            'next_follow_time' => $request->next_appointment_time
        ]);

        if($ManageLeadsProgress) {
            return response()->json([
                'ManageLeads'=>$ManageLeadsProgress,
                'code'=>200,
                'status'=>'success'
            ],200);
        } else {
            return response()->json([
                'Message'=>"Something went wrong",
                'code'=>422,
                'status'=>'faild'
            ],422);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $ManageLeads = ManageLeads::findOrFail($id);
        // dd($ManageLeads);
         if($ManageLeads) {
             return response()->json([
                 'ManageLeads'=>$ManageLeads,
                 'code'=>200,
                 'status'=>'success'
                ],200);
         } else {
             return response()->json([
                 'Message'=>"Somthing Went Wrong",
                 'code'=>422,
                 'status'=>'faild'
                ],422);
         }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ManageLeadsUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();
        $ManageLeads = ManageLeads::findOrFail($id);
        $ManageLeadsUpdate = $ManageLeads->update([
            'date' => $request->date,
            'name' => $request->name,
            'company' => $request->company,
            'leads_type' => $request->leadType,
            'contact_numer' => $request->contactNumber,
            'owner_contact_number' => $request->ownerContactNumber,
            'requirement' => $request->requirement,
            'status' => $request->status,
        ]);
        if($ManageLeadsUpdate) {
            return response()->json([
                'ManageLeads'=>$ManageLeads,
                'code'=>200,
                'status'=>'success'
            ],200);
        } else {
            return response()->json([
                'Message'=>"Something went wrong",
                'code'=>422,
                'status'=>'faild'
            ],422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
