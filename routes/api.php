
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MusicianController;
use App\Http\Controllers\API\ScheduleController;
use App\Http\Controllers\API\SongController;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rotas públicas
Route::post('/login', [AuthController::class, 'login']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    // Usuário atual
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Rotas de músicos
    Route::apiResource('musicians', MusicianController::class);
    Route::get('/musicians/user/{userId}', [MusicianController::class, 'getByUserId']);
    
    // Rotas de agendamentos
    Route::apiResource('schedules', ScheduleController::class);
    Route::get('/schedules/musician/{musicianId}', [ScheduleController::class, 'getByMusicianId']);
    
    // Rotas de músicas
    Route::apiResource('songs', SongController::class);
});
