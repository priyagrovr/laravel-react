<?php
namespace App\Services;

use App\Models\Assessment;
use Illuminate\Support\Facades\DB;

class AssessmentService
{
    public function schedule(array $data): Assessment
    {
        return DB::transaction(function () use ($data) {
            $assessment = Assessment::create([
                'candidate_id' => $data['candidate_id'],
                'scheduled_at' => $data['scheduled_at'] ?? now(),
            ]);
        
            foreach ($data['question_ids'] as $questionId) {
                $assessment->responses()->create([
                    'question_id' => $questionId,
                    'assessment_id' => $assessment->id,
                ]);
            }   
            $assessment->load('responses.question');
            return $assessment;
        });
    }

    public function generateReport(int $assessmentId): array
    {
        $assessment = Assessment::with('candidate','responses.question')->findOrFail($assessmentId);

        $totalScore = $assessment->responses->sum('score');
        $responseCount = $assessment->responses->count();
        $averageScore = $responseCount > 0 ? round($totalScore / $responseCount, 2) : 0;

        return [
            'assessment_id' => $assessment->id,
            'scheduled_at' => $assessment->scheduled_at,
            'candidate' => $assessment->candidate,
            'responses' => $assessment->responses->map(function ($response) {
                return [
                    'question' => $response->question,
                    'answer_text' => $response->answer_text,
                    'score' => $response->score,
                    'response_id' => $response->id,
                ];
            }),
            'total_score' => $totalScore,
            'average_score' => $averageScore,
        ];
    }   
}

?>