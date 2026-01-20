<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'type',
        'image',
        'location', 
        'date',
        'status',
        'user_id'
    ];

     public function user(){
        return $this->belongsTo(User::class);
    }
}
