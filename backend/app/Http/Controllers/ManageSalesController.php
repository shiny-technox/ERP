<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageSaleInvoiceUpdateRequest;
use App\Http\Requests\ManageSaleStoreRequest;
use App\Http\Requests\ManageSaleUpdateRequest;
use App\Models\ManageaSaleInvoice;
use App\Models\ManageSale;
use Illuminate\Http\Request;

class ManageSalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $managesale = ManageaSaleInvoice::with('arrSale')->get();
        // dd($managesale);
        // return response()->json([
        //     'ManageSale' => $managesale,
        //     'code' => 200,
        //     'status' => 'success'
        // ], 200);
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
    // public function storeInvoice(ManageSaleStoreRequest $request)
    // {
    //     $validatedData = $request->validated();

    //     foreach ($validatedData as $taskData) {
    //         if (is_array($taskData)) { 
    //             ManageaSaleInvoice::create([
    //                 'sale_id' => $taskData['sale_id'],
    //                 'particulars' => $taskData['particulars'],
    //                 'quantity' => $taskData['quantity'],
    //                 'price' => $taskData['price'],
    //             ]);
    //         }
    //     }
        
    //     return response()->json([
    //         'Message' => "Successfully inserted data",
    //         'code' => 200,
    //         'status' => 'success'

    

    //     ], 200);
    // }

    public function store(ManageSaleStoreRequest $request)
    {
        $validatedData = $request->validated();
      
        $manageSale = ManageSale::create([
            'name' => $validatedData[0]['name'],
            'addressLine1' => $validatedData[0]['addressLine1'],
            'addressLine2' => $validatedData[0]['addressLine2'],
            'city' => $validatedData[0]['city'],
            'state' => $validatedData[0]['state'],
            'pincode' => $validatedData[0]['pincode'],
            'gstin' => $validatedData[0]['gstin'],
            'cgst' => $validatedData[0]['cgst'],
            'sgst' => $validatedData[0]['sgst'],
        ]);
        $sale_id= $manageSale->id;
       
        foreach ($validatedData as $taskData) {
            if (is_array($taskData)) { 
                ManageaSaleInvoice::create([
                    'sale_id' => $sale_id,
                    'particulars' => $taskData['particulars'],
                    'quantity' => $taskData['quantity'],
                    'price' => $taskData['price'],
                ]);
            }
        }
        
        if ($manageSale) {
            return response()->json([
                'manageSaleData' => $manageSale,
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
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateInvoice(ManageSaleUpdateRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $ManageSaleQry = ManageSale::findOrFail($id);

        foreach ($validatedData as $taskData) {
            if (is_array($taskData)) { // Ensure $taskData is an array
                $ManageSaleQry->update([
                    'particulars' => $taskData['particulars'],
                    'quantity' => $taskData['quantity'],
                    'price' => $taskData['price'],
                ]);
            }
        }
        
        return response()->json([
            'Manage sale data' => $ManageSaleQry,
            'code' => 200,
            'status' => 'success'
        ], 200);
    }

    public function update(ManageSaleUpdateRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $ManageSale = ManageSale::findOrFail($id);
    
        $ManageSaleUpdate = $ManageSale->update([
            'name' => $validatedData['name'],
            'addressLine1' => $validatedData['addressLine1'],
            'addressLine2' => $validatedData['addressLine2'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'pincode' => $validatedData['pincode'],
            'gstin' => $validatedData['gstin'],
            'cgst' => $validatedData['cgst'],
            'sgst' => $validatedData['sgst'],
        ]);

        if ($ManageSaleUpdate) {
            return response()->json([
                'ManageSale' => $ManageSale,
                'code' => 200,
                'status' => 'success'
            ], 200);
        } else {
            return response()->json([
                'Message' => "Something went wrong",
                'code' => 422,
                'status' => 'failed'
            ], 422);
        }
    }

    public function destroy(string $id)
    {
        //
    }
}
