
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'artist',
        'key',
        'tempo',
        'lyrics',
        'chords',
        'category',
        'notes',
    ];

    /**
     * Get the schedules that include this song.
     */
    public function schedules()
    {
        return $this->belongsToMany(Schedule::class, 'schedule_song')
                    ->withPivot('order')
                    ->withTimestamps();
    }
}
