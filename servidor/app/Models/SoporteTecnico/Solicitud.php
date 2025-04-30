<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'solicitudes';
    protected $fillable = [
        'id',
        'nombre',
        'tipo_solicitud',
        'activo'
    ];
}