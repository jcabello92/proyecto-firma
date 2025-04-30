<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'mensajes';
    protected $fillable = [
        'id',
        'ticket',
        'usuario',
        'orden',
        'mensaje',
        'fecha_envio',
        'hora_envio',
        'activo'
    ];
}