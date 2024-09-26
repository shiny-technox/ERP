<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginPostRequest;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterPostRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function register(RegisterPostRequest $request)
    {
        //
        $validatedData = $request->validated();
        
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password'])
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
     * Show the form for creating a new resource.
     */
    public function login(LoginPostRequest $request)
    {
        //
        $validatedData = $request->validated();
        if(!Auth::attempt($validatedData)){
            return response()->json([
                'code'=>422,
                'status'=>'failed',
                'message'=>'login credential is wrong'
            ],422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'token'=>$token,
            'user'=>$user,
            'code'=>200,
            'status'=>'success'
        ],200);
    }
    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
    
}
