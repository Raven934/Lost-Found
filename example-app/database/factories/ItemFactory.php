<?php

namespace Database\Factories;
use App\Models\User;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>fake()->name(),
            'description'=>fake()->paragraph(),
            'type'=>fake()->randomElement(['lost','found']),
            'image'=>fake()->imageUrl(),
            'location'=>fake()->city(),
            'date'=>fake()->date(),
            'user_id'=>User::where('role','user')->get(['id'])->random(),
        ];
    }
}
