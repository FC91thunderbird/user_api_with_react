<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MyController extends Controller
{
    function successResponse($result, $message){
        $response = [
            'success'=> true,
            'data'=> $result,
            'message' => $message
        ];

        return response()->json($response, 200);
    }

    function errorResponse($error, $message = [], $code = 404){
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if( !empty($message) ){
            $response['data'] = $message;
        }

        return response()->json($response, $code);
    }
}
