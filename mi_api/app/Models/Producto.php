<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [

        'maker',
        'model',
        'introduced',

        'notable_user1',
        'notable_user2',
        'notable_user3',

        'feature1',
        'feature2',
        'feature3',
        'feature4',
        'feature5',

        'popularity',
        'dates',

        'finish1',
        'finish2',
        'finish3',
        'finish4',
        'finish5',

        'tipo',

        'imagen',
        'review_video',
        'imagen_producto',

        'precio'
    ];
};
