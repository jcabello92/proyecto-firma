<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'regiones';
    protected $fillable = [
        'id',
        'nombre',
        'abreviatura',
        'capital',
        'activo'
    ];
}