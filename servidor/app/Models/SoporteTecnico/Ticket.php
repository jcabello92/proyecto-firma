<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'tickets';
    protected $fillable = [
        'id',
        'usuario',
        'area',
        'tipo_ticket',
        'solicitud',
        'asunto',
        'detalle',
        'fecha_creacion',
        'hora_creacion',
        'estado_ticket',
        'activo'
    ];
}