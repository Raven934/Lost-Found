<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

   public function register(RegisterRequest $request){
        $user= User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=> Hash::make($request->password),
            'role'=>'user'
            ]);
                return response()->json([
            'message'=> 'User registered successfully',
            'user'=>$user
        ], 201);
   }

   public function login(LoginRequest $request){
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json([
               'error' => 'Authentication Failed',
                'message' => 'Invalid email or password.',
                'details' => 'Please check your credentials and try again.'
            ], 422);
        }
        $user= User::where('email', $request->email)->FirstOrFail();
        $token= $user->createToken('auth_token')->plainTextToken;
        return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token
        ], 200);
   
   }

   public function logout(Request $request){
        if(!$request->user() || !$request->user()->currentAccessToken()){
            return response()->json([
                 'error' => 'Not Authenticated',
                    'message' => 'No active session found.',
                    'details' => 'You are already logged out.'
            ], 422);
        }
             $request->user()->currentAccessToken()->delete();
           return response()->json([
                'message' => 'Logout successful',
                'details' => 'You have been successfully logged out.'
            ], 200);

   }

}


