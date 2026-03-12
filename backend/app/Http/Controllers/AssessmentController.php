<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Assessment;
use App\Services\AssessmentService;

class AssessmentController extends Controller
{
    public function __construct(private AssessmentService $assessmentService){
        $this->assessmentService = $assessmentService;
    }
   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidate,id',
            'question_ids' => 'required|array|min:1',
            'question_ids.*' => 'exists:questions,id',
            'scheduled_at' => 'nullable|date',
        ]);


        $assessment = $this->assessmentService->schedule($validated);


        return response()->json(['data' => $assessment,'message' => 'Assessment scheduled successfully'], 201);
    }

    public function report($id){
        $report = $this->assessmentService->generateReport($id);

        return response()->json([
            'data' => $report,
        ]);
    }
}
