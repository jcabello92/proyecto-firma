<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'roles';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}