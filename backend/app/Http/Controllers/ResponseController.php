<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ResponseService;

class ResponseController extends Controller
{
    public function __construct(private ResponseService $responseService){
        $this->responseService = $responseService;
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'answer' => 'required|string',
            'score' => 'required|integer|min:0|max:100',
        ]);

        $response = $this->responseService->update($id, $validated);

        return response()->json(['data' => $response,'message' => 'Response updated successfully']);
    }
}
