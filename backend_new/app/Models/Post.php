<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
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

    public function like()
    {
        return $this->hasMany(PostLike::class, 'post_id');
    }

    public function comment()
    {
        return $this->hasMany(PostComment::class, 'post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
