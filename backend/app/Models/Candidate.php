<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    protected $table = 'candidate';

    protected $fillable = [
        'name',
        'email',
        'experience_years',
    ];

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }   
}
