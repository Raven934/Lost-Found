<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Requests\FormRequest;
use App\Models\Item;
use App\Services\CloudinaryService;
use Cloudinary\Cloudinary;
use Illuminate\Foundation\Http\FormRequest as HttpFormRequest;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    protected $cloudinary;

    public function __construct(CloudinaryService $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

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
    public function store(AddItemRequest $request)
    {
        try{
        $user=$request->user();
    if(!$user){
        return response()->json([
                    'error' => 'Authentication Required',
                    'message' => 'You must be logged in to create an item.',
                    'details' => 'Please login and try again.'
        ], 401);

    };
    $data = $request->validated();

    if($request->hasFile('image')){
        $data['image'] = app(CloudinaryService::class)->upload($request->file('image'), 'items');
    }

    $data['user_id'] = $user->id;
    
    $item=Item::create($data);
      return response()->json([
                'message' => 'Item created successfully',
                'item' =>  $item->fresh()
            ], 201);
}catch (\Exception $e){
      return response()->json([
        'error' => 'Creation failed',
        'details' => $e->getMessage()
    ], 500);
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
           $item->update($data);
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

      public function filter(Request $request){
             $type=$request->input('type');
    $location=$request->input('location');
    $query=Item::query();
    if($type){
        $query->where('type', $type);
    }
    if($location){
        $query->where('location',$location);
    }
    $items= $query->get();
    
     return response()->json([
        'message' => 'Items retrieved successfully',
        'items' => $items,
        'count' => $items->count()
       ], 200);
    }

    public function showmine(Request $request){
        $user=$request->user();
        $item = $user->items()->get();
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
