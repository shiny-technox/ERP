<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageSSLStoreRequest;
use App\Http\Requests\ManageSSLUpdateRequest;
use App\Models\ManageSSL;
use Illuminate\Http\Request;

class ManageSSLController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $manageSSL = ManageSSL::all();

        if ($manageSSL) {
            return response()->json([
                'manageSSL' => $manageSSL,
                'code' => 200,
                'status' => 'success'
            ], 200);
        } else {
            return response()->json([
                'Message' => "No SSL certificates found",
                'code' => 404,
                'status' => 'not found'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ManageSSLStoreRequest $request)
    {
     
        $validatedData = $request->validated();

        $manageSSL = ManageSSL::create([
            'ssl_certificate' => $validatedData['sslCertificate'],
            'ssl_provider' => $validatedData['sslProvider'],
            'ssl_expiry_date' => $validatedData['sslExpired'],
        ]);

        if ($manageSSL) {
            return response()->json([
                'manageSSL' => $manageSSL,
                'code' => 200,
                'status' => 'success'
            ], 200);
        } else {
            return response()->json([
                'Message' => "Failed to store SSL certificate",
                'code' => 422,
                'status' => 'failed'
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function edit(string $id)
    {
        $manageSSL = ManageSSL::findOrFail($id);

        if ($manageSSL) {
            return response()->json([
                'manageSSL' => $manageSSL,
                'code' => 200,
                'status' => 'success'
            ], 200);
        } else {
            return response()->json([
                'Message' => "SSL certificate not found",
                'code' => 404,
                'status' => 'not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ManageSSLUpdateRequest $request, string $id)
    {
        $validatedData = $request->validated();

        $manageSSL = ManageSSL::findOrFail($id);

        $updateResult = $manageSSL->update([
            'ssl_certificate' => $validatedData['sslCertificate'],
            'ssl_provider' => $validatedData['sslProvider'],
            'ssl_expiry_date' => $validatedData['sslExpired'],
        ]);

        if ($updateResult) {
            return response()->json([
                'manageSSL' => $manageSSL,
                'code' => 200,
                'status' => 'success'
            ], 200);
        } else {
            return response()->json([
                'Message' => "Failed to update SSL certificate",
                'code' => 422,
                'status' => 'failed'
            ], 422);
        }
    }
 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $manageSSL = ManageSSL::findOrFail($id);

        $deleteResult = $manageSSL->delete();

        if ($deleteResult) {
            return response()->json([
                'Message' => "SSL certificate deleted successfully",
                'code' => 200,
                'status' => 'success'
            ], 200);
        } else {
            return response()->json([
                'Message' => "Failed to delete SSL certificate",
                'code' => 422,
                'status' => 'failed'
            ], 422);
        }
    }
}
