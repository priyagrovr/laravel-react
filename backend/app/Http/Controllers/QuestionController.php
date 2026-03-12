<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Services\QuestionService;

class QuestionController extends Controller
{

public function __construct(private QuestionService $questionService){
    $this->questionService = $questionService;
}

    public function index()
    {
        $questions = $this->questionService->getAll();
        return response()->json($questions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'difficulty' => 'required|in:easy,medium,hard',
            'category' => 'required|in:backend,frontend,hardware',
        ]);

        $question = $this->questionService->create($validated);

        return response()->json(['data' => $question,'message' => 'Question created successfully'], 201);
    }   
}
