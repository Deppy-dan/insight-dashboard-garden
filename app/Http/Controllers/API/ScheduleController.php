
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $schedules = Schedule::with(['musicians'])->get();
        return response()->json($schedules);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string',
            'description' => 'nullable|string',
            'musicians' => 'array',
            'songs' => 'array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $schedule = Schedule::create($request->all());
        
        // Attach musicians if provided
        if ($request->has('musicians') && is_array($request->musicians)) {
            $schedule->musicians()->sync($request->musicians);
        }
        
        // Attach songs if provided
        if ($request->has('songs') && is_array($request->songs)) {
            $schedule->songs()->sync($request->songs);
        }

        return response()->json($schedule->load(['musicians', 'songs']), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $schedule = Schedule::with(['musicians', 'songs'])->findOrFail($id);
        return response()->json($schedule);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $schedule = Schedule::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'date' => 'date',
            'time' => 'string',
            'location' => 'string',
            'description' => 'nullable|string',
            'musicians' => 'array',
            'songs' => 'array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $schedule->update($request->all());
        
        // Sync musicians if provided
        if ($request->has('musicians')) {
            $schedule->musicians()->sync($request->musicians);
        }
        
        // Sync songs if provided
        if ($request->has('songs')) {
            $schedule->songs()->sync($request->songs);
        }

        return response()->json($schedule->load(['musicians', 'songs']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->musicians()->detach();
        $schedule->songs()->detach();
        $schedule->delete();
        
        return response()->json(null, 204);
    }

    /**
     * Get schedules for a specific musician.
     *
     * @param  int  $musicianId
     * @return \Illuminate\Http\Response
     */
    public function getByMusicianId($musicianId)
    {
        $schedules = Schedule::whereHas('musicians', function($query) use ($musicianId) {
            $query->where('musicians.id', $musicianId);
        })->with(['musicians', 'songs'])->get();
        
        return response()->json($schedules);
    }
}
