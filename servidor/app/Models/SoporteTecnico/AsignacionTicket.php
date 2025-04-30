<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class AsignacionTicket extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'asignaciones_tickets';
    protected $fillable = [
        'id',
        'usuario',
        'ticket',
        'fecha_asignacion',
        'hora_asignacion',
        'estado_asignacion',
        'activo'
    ];
}