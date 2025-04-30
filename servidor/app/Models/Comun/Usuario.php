<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'usuarios';
    protected $fillable = [
        'id',
        'usuario',
        'contrasena',
        'rol',
        'persona',
        'activo'
    ];
}