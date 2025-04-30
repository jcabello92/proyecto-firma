<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class AsignacionTipoSolicitud extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'asignaciones_tipos_solicitudes';
    protected $fillable = [
        'id',
        'usuario',
        'tipo_solicitud',
        'activo'
    ];
}