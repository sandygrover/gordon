<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;
    public $guarded = [];
    public $hidden = [
        'updated_at',
        'created_at'
    ];
    public static function boot()
    {
        parent::boot();

        static::creating(function($post)
        {
            $post->user_id = auth()->user()->id;
        });
    }
}
