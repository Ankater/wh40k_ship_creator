<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\HullResource;
use App\Models\Hull;
use Illuminate\Http\JsonResponse;
use Knuckles\Scribe\Attributes as Scribe;   // ← IMPORT!

#[Scribe\Group('Hulls')]
#[Scribe\Subgroup('Index')]
#[Scribe\ResponseFromApiResource(
    HullResource::class,
    Hull::class,
    collection: true,
    with: ['traits.trait']
)]
#[Scribe\Authenticated]
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
