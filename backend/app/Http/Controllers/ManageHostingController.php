<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageHostingStoreRequest;
use App\Http\Requests\ManageHostingUpdateRequest;
use App\Models\ManageHosting;
use Illuminate\Http\Request;

class ManageHostingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $ManageHosting = ManageHosting::all();

        if($ManageHosting){
            return response()->json([
                'ManageHosting'=>$ManageHosting,
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ManageHostingStoreRequest $request)
    {
        //
        $validatedData = $request->validated();

        $ManageHosting = ManageHosting::create([
            'hosting_name' => $validatedData['hostingName'],
            'hosting_provider' => $validatedData['hostingProvider'],
            'hosting_expired_date' => $validatedData['hostingExpired'],
        ]);

        if($ManageHosting){
            return response()->json([
                'ManageHosting'=>$ManageHosting,
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
        $ManageHosting = ManageHosting::findOrFail($id);

        if($ManageHosting){
            return response()->json([
                'ManageHosting'=>$ManageHosting,
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
     * Update the specified resource in storage.
     */
    public function update(ManageHostingUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();
        
        $ManageHosting = ManageHosting::findOrFail($id);
        
        $ManageHostingUpdate = $ManageHosting->update([
            'hosting_name' => $validatedData['hostingName'],
            'hosting_provider' => $validatedData['hostingProvider'],
            'hosting_expired_date' => $validatedData['hostingExpired'],
        ]);
        
        if($ManageHostingUpdate) {
            return response()->json([
                'ManageHosting'=>$ManageHosting,
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
        $ManageHosting = ManageHosting::findOrFail($id);

        $ManageHostingDelete = $ManageHosting->delete();

        if($ManageHostingDelete){
            return response()->json([
                'Message'=>'Data deleted sucessfully',
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
}
