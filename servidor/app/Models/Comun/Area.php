<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'areas';
    protected $fillable = [
        'id',
        'nombre',
        'area_padre',
        'encargado',
        'activo'
    ];
}