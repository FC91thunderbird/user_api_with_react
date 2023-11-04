<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,

            'address' => $this->profile->address,
            'phone' => $this->profile->phone,
            'gender' => $this->profile->gender,
            'city' => $this->profile->city,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
