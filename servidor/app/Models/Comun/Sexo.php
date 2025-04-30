<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Sexo extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'sexos';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}