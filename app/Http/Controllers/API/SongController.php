
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Song;
use Illuminate\Support\Facades\Validator;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $songs = Song::all();
        return response()->json($songs);
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
            'artist' => 'required|string|max:255',
            'key' => 'required|string|max:10',
            'tempo' => 'required|integer|min:40|max:240',
            'lyrics' => 'nullable|string',
            'chords' => 'nullable|string',
            'category' => 'required|string|max:100',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $song = Song::create($request->all());
        return response()->json($song, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $song = Song::findOrFail($id);
        return response()->json($song);
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
        $song = Song::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'artist' => 'string|max:255',
            'key' => 'string|max:10',
            'tempo' => 'integer|min:40|max:240',
            'lyrics' => 'nullable|string',
            'chords' => 'nullable|string',
            'category' => 'string|max:100',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $song->update($request->all());
        return response()->json($song);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $song = Song::findOrFail($id);
        $song->delete();
        return response()->json(null, 204);
    }
}
