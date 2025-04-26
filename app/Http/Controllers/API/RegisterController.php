<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class RegisterController extends BaseController
{
    /**
     * Register the user in and return a bearer token.
     *
     * @bodyParam email string required The user's email. Example: john@example.com
     * @bodyParam password string required The user's password. Example: secret123
     *
     * @response 200 scenario="Successful login" {
     *   "success": true,
     *   "data": {
     *     "token": "1|xYzAbC...",
     *     "name": "John Doe"
     *   },
     *   "message": "User login successfully."
     * }
     * @response 401 scenario="Wrong credentials" {
     *   "success": false,
     *   "error": "Unauthorised"
     * }
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors()->getMessages());
        }

        $input = $request->all();
        $input['password'] = bcrypt((string)$input['password']);
        $user = User::create($input);

        $success = [];
        $success['token'] =  $user->createToken('auth_token')->plainTextToken;
        $success['name'] =  $user->name;

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Log the user in and return a bearer token.
     *
     * @bodyParam email string required The user's email. Example: john@example.com
     * @bodyParam password string required The user's password. Example: secret123
     *
     * @response 200 scenario="Successful login" {
     *   "success": true,
     *   "data": {
     *     "token": "1|xYzAbC...",
     *     "name": "John Doe"
     *   },
     *   "message": "User login successfully."
     * }
     * @response 401 scenario="Wrong credentials" {
     *   "success": false,
     *   "error": "Unauthorised"
     * }
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors()->getMessages());
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();

            if (!$user) {
                return $this->sendError('User not found.', ['error' => 'User not found']);
            }

            $success['token'] =  $user->createToken('auth_user')->plainTextToken;
            $success['name'] =  $user->name;

            return $this->sendResponse($success, 'User login successfully.');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
    }
}
