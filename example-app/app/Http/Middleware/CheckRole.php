<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = $request->user();
        if (!$user) {
           return response()->json([
                'error' => 'Unauthenticated',
                'message' => 'You must be logged in to access this resource.',
            ], 401);
        }

        if ($user->role !== $role) {
            return response()->json([
                'error' => 'Insufficient Privileges',
                'message' => 'You do not have the required role to access this resource.',
                'details' => "This endpoint requires '{$role}' role access.",
                'your_role' => $user->role,
                'required_role' => $role,
            ], 403);
        }

        return $next($request);
}
}
