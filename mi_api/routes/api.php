<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AuthController;

// Login
Route::post('login', [AuthController::class, 'login']);
// Publico
Route::get('productos', [ProductoController::class, 'index']);
Route::get('productos/{id}', [ProductoController::class, 'show']);

// Protegidas
Route::middleware('auth:api')->group(function () {
    Route::post('productos', [ProductoController::class, 'store']);
    Route::post('productos/{id}', [ProductoController::class, 'update']);
    Route::patch('productos/{id}', [ProductoController::class, 'patch']);
    Route::delete('productos/{id}', [ProductoController::class, 'destroy']);
});