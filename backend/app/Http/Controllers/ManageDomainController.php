<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageDomainStoreRequest;
use App\Http\Requests\ManageDomainUpdateRequest;
use App\Models\DomainExpiring;
use App\Models\ManageDomain;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ManageDomainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $manageDomain = ManageDomain::all();
        if($manageDomain){
            return response()->json([
                'manageDomain'=>$manageDomain,
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
    public function store(ManageDomainStoreRequest $request)
    {
        //
        $validatedData = $request->validated();

        $ManageDomain = ManageDomain::create([
            'domain_name' => $validatedData['domainName'],
            'domain_provider' => $validatedData['domainProvider'],
            'domain_expired_date' => $validatedData['domainExpired'],
        ]);

        if($ManageDomain){
            return response()->json([
                'ManageDomain'=>$ManageDomain,
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
        $manageDomain = ManageDomain::findOrFail($id);

        if($manageDomain){
            return response()->json([
                'manageDomain'=>$manageDomain,
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
    public function update(ManageDomainUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();

        $ManageDomainQry = ManageDomain::findOrFail($id);

        $ManageDomain = $ManageDomainQry->update([
            'domain_name' => $validatedData['domainName'],
            'domain_provider' => $validatedData['domainProvider'],
            'domain_expired_date' => $validatedData['domainExpired'],
        ]);

        if($ManageDomain) {
            return response()->json([
                'ManageDomain'=>$ManageDomainQry,
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
        $ManageDomainQry = ManageDomain::findOrFail($id);

        $ManageDomain = $ManageDomainQry->delete();

        if($ManageDomain) {
            return response()->json([
                'Message'=>"Deleted sucessfully",
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
  

    public function Expirestore(Request $request)
    {
        $request->validate([
            'notifications' => 'required|array',
            'notifications.*.notification_type' => 'required|string',
            'notifications.*.description' => 'nullable|string',
            'notifications.*.seen' => 'nullable|integer',
        ]);
    
        $storedNotifications = [];
    
        foreach ($request->notifications as $notification) {
            try {
                // Use firstOrCreate to insert only if not exists
                $domainExpiring = DomainExpiring::firstOrCreate([
                    'notification_type' => $notification['notification_type'],
                    'description' => $notification['description'],
                    'seen' => $notification['seen'] ?? 0,
                ]);
    
                $storedNotifications[] = $domainExpiring;
            } catch (\Exception $e) {
                return response()->json([
                    'Message' => "Failed to store notification: " . $e->getMessage(),
                    'code' => 422,
                    'status' => 'failed'
                ], 422);
            }
        }
    
        return response()->json([
            'data' => $storedNotifications,
            'code' => 200,
            'status' => 'success'
        ], 200);
    }
    public function markAsSeen(Request $request)
    {
        $request->validate([
            'notifications' => 'required|array',
            'notifications.*' => 'required|integer', // Assuming these are notification IDs
        ]);

        try {
            // Update all notifications with the given IDs to mark them as seen
            DomainExpiring::whereIn('id', $request->notifications)
                ->update(['seen' => 1]);

            return response()->json([
                'message' => 'Notifications marked as seen successfully.',
                'code' => 200,
                'status' => 'success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to mark notifications as seen: ' . $e->getMessage(),
                'code' => 422,
                'status' => 'failed'
            ], 422);
        }
    }
    

}
