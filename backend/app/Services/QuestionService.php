<?php

namespace App\Services;
use App\Models\Question;

class QuestionService
{
    public function getAll()
    {
        return Question::all();
    }

    public function create(array $data): Question
    {
        return Question::create($data);
    }
}

?>