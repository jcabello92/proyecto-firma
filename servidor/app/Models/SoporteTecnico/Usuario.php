<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'usuarios';
    protected $fillable = [
        'id',
        'usuario',
        'rol',
        'activo'
    ];
}