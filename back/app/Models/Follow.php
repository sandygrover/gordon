<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;
    public $guarded = [];
    public static function boot()
    {
        parent::boot();

        static::creating(function($post)
        {
            $post->follower_id = auth()->user()->id;
        });
    }
}
