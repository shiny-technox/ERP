<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\ManageEmployeeProfileUpdateRequest;
use App\Http\Requests\EmployeeCreateRequest;
use App\Http\Requests\EmployeePasswordUpdateRequest;
use App\Http\Requests\EmployeeProfileUpdateRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use App\Http\Requests\ManageRoleStoreRequest;
use App\Http\Requests\ManageRoleUpdateRequest;
use App\Models\ManageRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index(){
        $user = User::all();
        return response()->json([
            'user'=>$user,
            'code'=>200,
            'status'=>'success'
        ],200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeCreateRequest $request)
    {
        //
        $validatedData = $request->validated();
        // dd($validatedData);
        $user = User::create([
            'name' => $validatedData['empName'],
            'emp_id' => $validatedData['empId'],
            'email' => $validatedData['empMail'],
            'password' => bcrypt($validatedData['empPass']),
            'emp_role' => $validatedData['empRole'],
            'empSalary' => $validatedData['empSalary']

        ]);
        $token = $user->createToken('main')->plainTextToken;

            return response()->json([
                'token'=>$token,
                'user'=>$user,
                'code'=>200,
                'status'=>'success'
            ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        $employee = User::findOrFail($id);
        $token = $employee->createToken('main')->plainTextToken;
        if($employee){
            return response()->json([
                'token'=>$token,
                'user'=>$employee,
                'code'=>200,
                'status'=>'success'
            ],200);
        }else{
            return response()->json([
                'code'=>404,
                'status'=>'failed',
                'message'=>'employee id not found'
            ],404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function profile(EmployeeProfileUpdateRequest $request,  string $id)
    {
        //
        $validatedData = $request->validated();
        $employee = User::findOrFail($id);
        $token = $employee->createToken('main')->plainTextToken;
        $employeeUpdate = $employee->update([
            'name' => $validatedData['profName'],
            'emp_id' => $validatedData['empId'],
            'email' => $validatedData['empEmail'],
        ]);
        if($employeeUpdate){
            return response()->json([
                'token'=>$token,
                'user'=>$employee,
                'code'=>200,
                'status'=>'success'
            ],200);
        }else{
            return response()->json([
                'code'=>404,
                'status'=>'failed',
                'message'=>'employee id not found'
            ],404);
        }
    }
    public function updatePassword(EmployeePasswordUpdateRequest $request, string $id)
    {
        try {
            // Validate the incoming request
            $validatedData = $request->validated();
    
            // Find the employee by ID
            $employee = User::findOrFail($id);
    
            // Verify if the current password matches
            if (!Hash::check($validatedData['currentPassword'], $employee->password)) {
                return response()->json([
                    'code' => 422,
                    'status' => 'error',
                    'message' => 'Current password does not match.'
                ], 422);
            }
    
            // Check if new password and confirmation match
            if ($validatedData['newPassword'] !== $validatedData['newPassword_confirmation']) {
                return response()->json([
                    'code' => 422,
                    'status' => 'error',
                    'message' => 'New password confirmation does not match.'
                ], 422);
            }
    
            // Update the password
            $employee->password = Hash::make($validatedData['newPassword']);
            $employee->save();
    
            return response()->json([
                'code' => 200,
                'status' => 'success',
                'message' => 'Password updated successfully.'
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error updating password:', ['error' => $e->getMessage()]);
    
            return response()->json([
                'code' => 500,
                'status' => 'error',
                'message' => 'Internal server error'
            ], 500);
        }
    }
    
    
    
    
    

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeUpdateRequest $request, string $id)
    {
        //
        $validatedData = $request->validated();
        $employee = User::findOrFail($id);
        $token = $employee->createToken('main')->plainTextToken;
        $employeeUpdate = $employee->update([
            'name' => $validatedData['empName'],
            'emp_id' => $validatedData['empId'],
            'email' => $validatedData['empMail'],
            'emp_role' => $validatedData['empRole'],
            'empSalary' => $validatedData['empSalary'],
        ]);
        if($employeeUpdate){
            return response()->json([
                'token'=>$token,
                'user'=>$employee,
                'code'=>200,
                'status'=>'success'
            ],200);
        }else{
            return response()->json([
                'code'=>404,
                'status'=>'failed',
                'message'=>'employee id not found'
            ],404);
        }
    }

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $employee = User::findOrFail($id);
        $token = $employee->createToken('main')->plainTextToken;
        $employeeDel = $employee->delete();

        return response()->json([
            'token'=>$token,
            'code'=>200,
            'status'=>'success',
            'message'=>'Deleted sucessfully'
        ],200);
    }
 

    public function storeRole(ManageRoleStoreRequest $request)
    {
        //
        $validatedData = $request->validated();
     
        $userrole = ManageRole::create([
            'role' => $validatedData['role'],
           
        ]);
       
        return response()->json([
            
            'userRole'=>$userrole,
            'code'=>200,
            'status'=>'success'
        ],200);
    }
    public function fetchRole()
    {
        $roles = ManageRole::all(); 
        
        return response()->json([
            'EmployeeRole'=>$roles,
            'code'=>200,
            'status'=>'success'
        ],200);
    }

    public function profileUpdate(ManageEmployeeProfileUpdateRequest $request, $id)
    {
        
        $validatedData = $request->validated();
        
      
        $user = User::findOrFail($id);
        $user->update([
       
            'contact_number' => $validatedData['contactNumber'],
            'emergency_contact_number' => $validatedData['emergencyContactNumber'],
            'dob' => $validatedData['dob'],
            'address_line_1' => $validatedData['addressLine1'],
            'address_line_2' => $validatedData['addressLine2'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'pincode' => $validatedData['pincode'],
            'bankName' => $validatedData['bankName'],
            'accountHolderName' => $validatedData['accountHolderName'],
            'accountNumber' => $validatedData['accountNumber'],
            'ifscCode' => $validatedData['ifscCode'],
            'upiId' => $validatedData['upiId'],
            'panCard' => $validatedData['panCard'],
            'aadhaarCard' => $validatedData['aadhaarCard'],
          
        ]);
        return response()->json([
             
            'userdata'=>$user,
            'code'=>200,
            'status'=>'success'
        ],200);
  
    }
    
    public function editRole(string $id)
    {
        $userRole = ManageRole::findOrFail($id);

        return response()->json([
            'EmployeeRole'=>$userRole,
            'code'=>200,
            'status'=>'success'
        ],200);
    }
    public function updateRole(ManageRoleUpdateRequest $request, string $id)
    {
        $validatedData = $request->validated();

        $userRole = ManageRole::findOrFail($id);
     
        $updateRole = $userRole->update([
            'role' => $validatedData['role'],
           
        ]);
       
        return response()->json([
            'ManageRole'=>$updateRole,
            'code'=>200,
            'status'=>'success'
        ],200);
    }
    public function roleDestroy(string $id)
    {
        $userRole = ManageRole::findOrFail($id);
        $delRole = $userRole->delete();
        if($delRole){
            return response()->json([
                'Message'=>"Row Deleted Sucessfully",
                'code'=>200,
                'status'=>'success'
            ],200);
        }

    }
}