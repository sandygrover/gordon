<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginSession extends Model
{
    use HasFactory;
    public $table = 'login_sessions';
    public $guarded = [];
    public static function boot()
    {
        parent::boot();

        static::creating(function($post)
        {
            $post->user_id = auth()->user()->id;
        });
    }
}
