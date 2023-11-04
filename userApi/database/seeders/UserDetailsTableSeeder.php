<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\User_detail;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserDetailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // factory(User_detail::class, 5)->create();
       
        $users = User::all(); 

        foreach ($users as $user) {
            \App\Models\User_detail::factory(1000)->create([
                'user_id' => $user->id, 
            ]);
        }
    }
}
