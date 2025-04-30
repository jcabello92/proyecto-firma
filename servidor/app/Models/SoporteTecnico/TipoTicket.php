<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class TipoTicket extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'tipos_tickets';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}