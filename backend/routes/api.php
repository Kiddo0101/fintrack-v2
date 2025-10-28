<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DvController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Auth routes
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // DV routes
        Route::apiResource('dvs', DvController::class);
        Route::post('/dvs/{dv}/approve', [DvController::class, 'approve']);
        Route::post('/dvs/{dv}/disapprove', [DvController::class, 'disapprove']);
    });
});
