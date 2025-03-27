
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Musician extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'instruments',
        'availability',
        'skillLevel',
        'joined',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'instruments' => 'array',
        'availability' => 'array',
        'joined' => 'date',
    ];

    /**
     * Get the user that owns the musician.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
