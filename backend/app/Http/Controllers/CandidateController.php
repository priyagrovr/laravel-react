<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidate;
use App\Services\CandidateService;

class CandidateController extends Controller
{
    public function __construct(private CandidateService $candidateService)
    {
        $this->candidateService = $candidateService;
    }

    public function index()
    {
        $candidates = $this->candidateService->getAll();
        return response()->json($candidates);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:candidate,email',
            'experience_years' => 'required|integer|min:0',
        ]);

        $candidate = $this->candidateService->create($validated);

        return response()->json(['data' => $candidate,'message' => 'Candidate created successfully'], 201);
    }   
}
