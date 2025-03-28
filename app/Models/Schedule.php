
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'date',
        'time',
        'location',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Get the musicians associated with the schedule.
     */
    public function musicians()
    {
        return $this->belongsToMany(Musician::class, 'schedule_musician')
                    ->withPivot('instrument', 'confirmed')
                    ->withTimestamps();
    }

    /**
     * Get the songs associated with the schedule.
     */
    public function songs()
    {
        return $this->belongsToMany(Song::class, 'schedule_song')
                    ->withPivot('order')
                    ->withTimestamps();
    }
}
