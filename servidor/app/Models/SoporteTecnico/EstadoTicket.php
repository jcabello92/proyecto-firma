<?php

namespace App\Models\SoporteTecnico;

use Illuminate\Database\Eloquent\Model;

class EstadoTicket extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_soporte_tecnico';
    protected $table = 'estados_tickets';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}