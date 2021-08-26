<?php

use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [App\Http\Controllers\Auth\AuthController::class, 'login']);
    Route::post('/social-auth',[App\Http\Controllers\Auth\AuthController::class, 'socialLogin']);
    Route::post('/register', [App\Http\Controllers\Auth\AuthController::class, 'register']);
    Route::post('/logout', [App\Http\Controllers\Auth\AuthController::class, 'logout']);
    Route::post('/refresh', [App\Http\Controllers\Auth\AuthController::class, 'refresh']);
    Route::get('/user-profile', [App\Http\Controllers\Auth\AuthController::class, 'userProfile']);
    Route::post('/update-profile', [App\Http\Controllers\Auth\AuthController::class, 'updateProfile']);
    Route::post('/forgot-password', [App\Http\Controllers\Auth\AuthController::class, 'forgotPassword']);
    Route::post('/change_password', [App\Http\Controllers\Auth\AuthController::class, 'changePassword']);
    Route::get('/delete-account', [App\Http\Controllers\Auth\AuthController::class, 'deleteAccount']);
    Route::get('/get-country', [App\Http\Controllers\Auth\AuthController::class, 'getCountry']);
    Route::post('/add-card', [App\Http\Controllers\Auth\AuthController::class, 'addCard']);
    Route::get('/get-card', [App\Http\Controllers\Auth\AuthController::class, 'getCard']);
    Route::delete('/delete-card/{id}', [App\Http\Controllers\Auth\AuthController::class, 'deleteCard']);

    Route::post('/add-bank', [App\Http\Controllers\Auth\AuthController::class, 'addBank']);
    Route::get('/get-bank', [App\Http\Controllers\Auth\AuthController::class, 'getBank']);
    Route::delete('/delete-bank/{id}', [App\Http\Controllers\Auth\AuthController::class, 'deleteBank']);

    Route::get('/get-notifications', [App\Http\Controllers\Auth\AuthController::class, 'getNotifications']);
    Route::get('/get-sessions', [App\Http\Controllers\Auth\AuthController::class, 'getSessions']);
    Route::post('/add-session', [App\Http\Controllers\Auth\AuthController::class, 'addSession']);
    Route::get('/clear-session', [App\Http\Controllers\Auth\AuthController::class, 'clearSession']);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::resource('posts', PostController::class);
        Route::get('/otheruserpost', [App\Http\Controllers\PostController::class, 'otheruserpost']);
        Route::get('/posts/{id}/hide', [App\Http\Controllers\PostController::class, 'hide']);
        Route::post('/posts/comment', [App\Http\Controllers\PostController::class, 'postComment']);

        Route::post('/posts/getComment', [App\Http\Controllers\PostController::class, 'getComment']);

        Route::post('/posts/like', [App\Http\Controllers\PostController::class, 'postLike']);
        Route::post('/posts/report', [App\Http\Controllers\PostController::class, 'postReport']);
        Route::resource('follows', FollowController::class);
        Route::get('/followerList', [App\Http\Controllers\FollowController::class, 'followerList']);
        Route::get('/followingList', [App\Http\Controllers\FollowController::class, 'followingList']);

        Route::get('/users/creator', [App\Http\Controllers\Auth\AuthController::class, 'creatorList']);
    });
});
