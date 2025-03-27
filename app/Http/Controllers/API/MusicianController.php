
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Musician;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MusicianController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $musicians = Musician::all();
        return response()->json($musicians);
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:musicians',
            'phone' => 'required|string|max:20',
            'instruments' => 'required|array',
            'availability' => 'required|array',
            'skillLevel' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $musician = Musician::create($request->all());
        return response()->json($musician, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $musician = Musician::findOrFail($id);
        return response()->json($musician);
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
        $musician = Musician::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'email|unique:musicians,email,'.$id,
            'phone' => 'string|max:20',
            'instruments' => 'array',
            'availability' => 'array',
            'skillLevel' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $musician->update($request->all());
        return response()->json($musician);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $musician = Musician::findOrFail($id);
        $musician->delete();
        return response()->json(null, 204);
    }

    /**
     * Get musician by user ID.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function getByUserId($userId)
    {
        $musician = Musician::where('user_id', $userId)->first();
        
        if (!$musician) {
            return response()->json(['message' => 'Musician not found'], 404);
        }
        
        return response()->json($musician);
    }
}
