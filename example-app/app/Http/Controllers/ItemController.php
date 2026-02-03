<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
             $items=Item::all();

               return response()->json([
                'message' => 'Items retrieved successfully',
                'items' => $items,
                'count' => $items->count()
            ], 200);
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
    public function store(AddItemRequest $request) {
        $user=$request->user();
    
         if(!$user){
        return response()->json([
                    'error' => 'Authentication Required',
                    'message' => 'You must be logged in to create an item.',
                    'details' => 'Please login and try again.'
        ], 401);

        };
          $data = $request->validated();

        if ($request->hasFile('image')) {
                $path = $request->file('image')->store('items', 'public');
                $data['image'] = Storage::url($path);
        }
          

          $data['user_id'] = $user->id;
    
          $item=Item::create($data);
             return response()->json([
                'message' => 'Item created successfully',
                'item' =>  $item->fresh()
            ], 201);
}

/**
 * Display the specified resource.
 */
public function show(string $id)
    {
        $item= Item::findOrFail($id);
        return response()->json([
            'message'=>'Item retreived successfully.',
            'item'=>$item

        ],200);
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
    public function update(UpdateItemRequest $request, string $id) {

           $item= Item::findOrFail($id);
           $user=$request->user();
           if($user->role !=='admin'){
            if($item->user_id !==$user->id){
                  return response()->json([
                    'error' => 'Forbidden',
                    'message' => 'You are not allowed to update this item'
                ], 403);
            }
           $data=$request->except('status');
        }else{
            $data=$request->validated();

        }
          if ($request->hasFile('image')) {
            $path = $request->file('image')->store('items', 'public');
            $data['image'] = Storage::url($path);
        }
           $item->update($data);
           return response()->json([
      'message' => 'Item updated successfully',
      'item' => $item

       ], 200);
    }

    public function showmine(Request $request){

       $user=$request->user();
        $item = $user->item()->get();

          return response()->json([
        'message' => 'Items retrieved successfully',
        'items' => $item,
        'count' => $item->count()
    ], 200);

    }
        


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
                $item= Item::findOrFail($id);
                $item->delete();

             return response()->json([
                'message' => 'Item deleted successfully',
            ], 200);
    }

}