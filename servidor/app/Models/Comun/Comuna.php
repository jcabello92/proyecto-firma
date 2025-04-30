<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Comuna extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'comunas';
    protected $fillable = [
        'id',
        'nombre',
        'provincia',
        'activo'
    ];
}