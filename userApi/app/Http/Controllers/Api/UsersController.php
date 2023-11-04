<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\User_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Validator;

class UsersController extends MyController
{
    function index(){
        Cache::forget('user_with_profile');
        $users = Cache::remember('user_with_profile', 60, function () {
            return User::with('profile')->orderBy('id', 'desc')->paginate(10);
        });
        


        // $users = User::with('profile')->paginate(10);

        // Cache::put('users', $users, 3600);
        
        return UserResource::collection($users);
        // return response()->json($users);
    }

    function store(CreateUserRequest $request){

        $userData = $request->only(['name', 'email', 'password']);
        $user = User::create($userData);
    
        $userDetailData = $request->only(['address', 'phone', 'gender', 'city']);
        $userDetailData['user_id'] = $user->id;
        User_detail::create($userDetailData);

        Cache::forget('user_with_profile');

        return $this->successResponse(new UserResource(User::find($user->id)), 'User Created..');
    }

    function edit($id){
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse('User not found');
        }
        
        return $this->successResponse(new UserResource($user), 'Fetch User Details');
    }

    function update($id, UpdateUserRequest $request){

        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse('User not found');
        }

        $userData = $request->only(['name', 'email', 'password']);
        $user->update($userData);
    
        $detailFind = User_detail::where('user_id', $id)->first();
        if($detailFind){
            $userDetailData = $request->only(['address', 'phone', 'gender', 'city']);
            $detailFind->update($userDetailData);
        }

        Cache::forget('user_with_profile');
        return $this->successResponse(new UserResource($user), 'User Updated..');
    }

    function destroy($id){

        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse('User not found');
        }

        $detailFind = User_detail::where('user_id', $id)->first();
        $detailFind->delete();
        $user->delete();
        Cache::forget('user_with_profile');

        return $this->successResponse([], 'User Deleted..');
    }
}
