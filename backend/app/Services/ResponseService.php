<?php
namespace App\Services;

use App\Models\Response;

class ResponseService
{
    public function update(int $id, array $data): Response
    {
        $response = Response::findOrFail($id);
        $response->update($data);
        return $response;
    }
}

?>