<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    use HasFactory;
    public $guarded = [];
    public static function boot()
    {
        parent::boot();

        static::creating(function($post)
        {
            $post->user_id = auth()->user()->id;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
