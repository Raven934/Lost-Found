<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'role:admin'])->group(function(){
    Route::get('/allitems',[ItemController::class, 'index']);
    Route::get('/items/{id}',[ItemController::class, 'show']);
    Route::put('/updateitems/{id}',[ItemController::class, 'update']);
    Route::delete('/deleteitems/{id}',[ItemController::class, 'destroy']);

});