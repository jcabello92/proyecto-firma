<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class TipoSolicitud extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'tipos_solicitudes';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}