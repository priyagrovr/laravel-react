<?php

namespace App\Services;
use App\Models\Question;

class QuestionService
{
    public function create(array $data): Question
    {
        return Question::create($data);
    }
}

?>