<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Hello Omar! Connection Successful.',
        'status' => 'Full-Stack is Ready'
    ]);
}); 