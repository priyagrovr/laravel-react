<?php

namespace App\Services;
use App\Models\Candidate;

class CandidateService
{
    public function getAll()
    {
        return Candidate::all();
    }
    
    public function create(array $data): Candidate
    {
        return Candidate::create($data);
    }
}


?>