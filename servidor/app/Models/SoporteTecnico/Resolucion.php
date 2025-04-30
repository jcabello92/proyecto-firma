<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class Resolucion extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'resoluciones';
    protected $fillable = [
        'id',
        'ticket',
        'usuario',
        'resolucion',
        'fecha_resolucion',
        'hora_resolucion',
        'activo'
    ];
}