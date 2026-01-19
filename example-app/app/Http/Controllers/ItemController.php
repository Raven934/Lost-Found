<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
           try{
             $items=Item::all();

               return response()->json([
                'message' => 'Items retrieved successfully',
                'items' => $items,
                'count' => $items->count()
            ], 200);
        }catch(\Exception){
            return response()->json([
                'error' => 'Database Error',
                'message' => 'Failed to retrieve items from database.',
                'details' => 'Please check database connection and try again.'
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
     
       

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormRequest $request)
    {
        try{
       $user=$request->user();
       $info = $request->validated();
    if(!$user){
        return response()->json([
                    'error' => 'Authentication Required',
                    'message' => 'You must be logged in to create a item.',
                    'details' => 'Please login and try again.'
        ], 401);

    };
    if($request->hasFile('image')){
        $uploadImage = Cloudinary::upload(
            $request->file('image')->getSecurePath()
        );
        $infos['image']=$uploadImage->getSecurePath();
    }
    $item=Item::create($infos);
      return response()->json([
                'message' => 'Item created successfully',
                'item' => $item
            ], 201);
        }catch (\Exception $e){
               if ($e->getCode() == '23000') {
                return response()->json([
                    'error' => 'Database Constraint Error',
                    'message' => 'Invalid user ID or database constraint violation.',
                    'details' => 'Please check that the user exists and try again.'
                ], 422);
        }
 

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
        $item= Item::findOrFail($id);
        return response()->json([
            'message'=>'Item retreived successfully.',
            'item'=>$item

        ],200);
        } catch (\Exception $e) {
    return response()->json([
        'error' => 'Failed to retrieve item',
        'details' => $e->getMessage()
    ], 404);
}
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, string $id)
    {
        try{
           $item= Item::findOrFail($id);
           $item->update($request->validated());
           return response()->json([
    'message' => 'Item updated successfully',
    'item' => $item
], 200);

        } catch (\Exception $e) {
    return response()->json([
        'error' => 'Update failed',
        'details' => $e->getMessage()
    ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            if(!$id || !is_numeric($id)){
                return response()->json([
                    'error' => 'Invalid Parameter',
                    'message' => 'A valid item ID is required.',
                    'details' => 'Please provide a numeric item ID.'
                ], 400);
            }

                $item= Item::findOrFail($id);
                $itemData = $item->toArray();
                $item->delete();
                
            
             return response()->json([
                'message' => 'Item deleted successfully',
                'deleted_item' => $itemData
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Item Not Found',
                'message' => 'The item you are trying to delete does not exist.',
                'details' => 'Please check the item ID and try again.'
            ], 404);
        }
    }
}
