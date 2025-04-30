<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'provincias';
    protected $fillable = [
        'id',
        'nombre',
        'region',
        'activo'
    ];
}