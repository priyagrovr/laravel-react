<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\AssessmentController;

Route::post('/candidates', [CandidateController::class, 'store']);
Route::get('/candidates', [CandidateController::class, 'index']);
Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/questions', [QuestionController::class, 'store']);
Route::put('/responses/{id}', [ResponseController::class, 'update']);
Route::post('/assessments', [AssessmentController::class, 'store']);
Route::get('/assessments/{id}/report', [AssessmentController::class, 'report']);
