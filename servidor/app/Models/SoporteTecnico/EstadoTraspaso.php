<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class EstadoTraspaso extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'estados_traspasos';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}