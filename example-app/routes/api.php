<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;

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
Route::get('/allitems',[ItemController::class, 'index']);
Route::get('/items/{id}',[ItemController::class, 'show']);

Route::middleware(['auth:sanctum',])->group(function(){
    Route::get('/myitems',[ItemController::class, 'showmine']);
    Route::put('/updateitems/{id}',[ItemController::class, 'update']);
    Route::post('/additem',[ItemController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function(){
Route::delete('/deleteitems/{id}',[ItemController::class, 'destroy']);
});