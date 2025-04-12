<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\HullResource;
use App\Models\Hull;
use Illuminate\Http\JsonResponse;

class HullController extends BaseController
{
    public function index(): JsonResponse
    {
        $hulls = Hull::with('traits')
            ->orderBy('hull_class')
            ->get();

        return $this->sendCollectionResponse(HullResource::collection($hulls), 'Hulls retrieved successfully.');
    }
}
