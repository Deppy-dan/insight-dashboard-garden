
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Routes for API Authentication
Route::post('/login', 'App\Http\Controllers\API\AuthenticatedSessionController@store');
Route::post('/logout', 'App\Http\Controllers\API\AuthenticatedSessionController@destroy');

// Route to serve the React application on any other URL
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
