<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';
    protected $fillable = [
        'title',
        'difficulty',
        'category',
    ];
    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
