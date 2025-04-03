
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

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
Route::post('/login', [AuthenticatedSessionController::class, 'login']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

// Test route
Route::get('/teste', function () {
    return response()->json(['status' => 'API carregada corretamente!']);
});

// Route to serve the React application on any other URL
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
