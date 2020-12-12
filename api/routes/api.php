<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthenticationController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\RandomUsersController;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\Api\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/register', [AuthenticationController::class, 'register']);

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('/logout', [AuthenticationController::class, 'logout']);
    Route::apiResource('/users', UsersController::class)
        ->only(['index', 'show']);
    Route::get('/random-users/{randomUsers?}', [RandomUsersController::class, 'show']);
    Route::get('/user-profile', [UserProfileController::class, 'index']);
    Route::put('/user-profile', [UserProfileController::class, 'update']);
    Route::delete('/user-profile', [UserProfileController::class, 'destroy']);
    Route::apiResource('/messages', MessageController::class)
        ->only(['store', 'show']);
});
