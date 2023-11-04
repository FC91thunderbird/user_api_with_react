<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Models\User_detail;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(1000)->create();
        // \App\Models\User_detail::factory(10)->create();


        $users = User::all(); 

        foreach ($users as $user) {
            \App\Models\User_detail::factory()->create([
                'user_id' => $user->id, 
            ]);
        }

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // $this->call(UserTableSeeder::class);
        // $this->call(UserDetailsTableSeeder::class);
        
   
    }
}
