<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class Traspaso extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'traspasos';
    protected $fillable = [
        'id',
        'ticket',
        'usuario_emisor',
        'usuario_receptor',
        'fecha_emision',
        'hora_emision',
        'fecha_recepcion',
        'hora_recepcion',
        'usuario_aceptante',
        'justificacion',
        'estado_traspaso',
        'activo'
    ];
}