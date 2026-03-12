<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $table = 'responses';
    protected $fillable = [
        'assessment_id',
        'question_id',
        'answer_text',
        'score',
    ];
    public function assessment()
    {
        return $this->belongsTo(Assessment::class); 
    }
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
