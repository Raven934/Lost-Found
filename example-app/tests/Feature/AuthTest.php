<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_user_can_register(){
        $data=[
            'name'=>'test',
            'email'=>'test'.time().'@gmail.com',
            'password'=>bcrypt('1234567'),
            'role'=>'user'
        ];

        $response=$this->postJson('/api/register', $data);

        $response->assertStatus(201)->assertJson([
            'message'=>'User registered successfully',
        ]);

        $this->assertDatabaseHas('users', ['email'=>$data['email']
        ]);
    }

    public function test_user_can_login(){
        $user= User::create([
            'name'=>'test',
            'email'=>'testuser'.time().'@gmail.com',
            'password'=>bcrypt('1234567'),
            'role'=>'user'
            ]);
            $this->assertInstanceOf(User::class, $user);
            $this->assertEquals('test', $user->name);
            $this->assertDatabaseHas('users', ['email'=> $user->email]);
    }

     public function test_user_can_logout(){
    $user=User::factory()->create();

    $token=$user->createToken('auth_token')->plainTextToken;

    $response=$this->withHeader('Authorization', 'Bearer ' . $token)->postJson('/api/logout');
    $response->assertStatus(200)->assertJson([
        'message'=>'Logout successful',
    ]);
}
}
