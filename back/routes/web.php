<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        return \Redirect::route('home');
    }
    return view('auth.login');
});

Auth::routes();

Route::get('email/verify/{id}', [App\Http\Controllers\Auth\AuthController::class, 'verify'])->name('verification.verify'); // Make sure to keep this as your route name
Route::get('/customMessage', [App\Http\Controllers\Auth\AuthController::class , 'customMessage'])->name('customMessage');
