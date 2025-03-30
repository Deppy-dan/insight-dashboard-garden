
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

// Rota para API Authentication
Route::post('/login', 'App\Http\Controllers\API\AuthenticatedSessionController@store');
Route::post('/logout', 'App\Http\Controllers\API\AuthenticatedSessionController@destroy');

// Rota para servir a aplicação React em qualquer outra URL
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
