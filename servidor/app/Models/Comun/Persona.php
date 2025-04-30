<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'personas';
    protected $fillable = [
        'id',
        'rut',
        'nombre',
        'apellido',
        'sexo',
        'fecha_nacimiento',
        'direccion',
        'comuna',
        'telefono_fijo',
        'telefono_movil',
        'correo',
        'activo'
    ];
}