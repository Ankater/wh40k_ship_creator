<?php

namespace App\Http\Resources;

use App\Models\Hull;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Hull
 */
class HullResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'hull_class'    => $this->hull_class,
            'space'         => $this->space,
            'cost'          => $this->cost,
            'source'        => $this->source,
            'speed'         => $this->speed,
            'detection'     => $this->detection,
            'armor'         => $this->armor,
            'maneuver'      => $this->maneuver,
            'hull_integrity'=> $this->hull_integrity,
            'turret_mounts' => $this->turret_mounts,
            'length'        => $this->length,
            'width'         => $this->width,
            'mass'          => $this->mass,
            'crew'          => $this->crew,
            'acceleration'  => $this->acceleration,
            'traits'        => TraitForHullResource::collection($this->whenLoaded('traits')),
        ];
    }
}
