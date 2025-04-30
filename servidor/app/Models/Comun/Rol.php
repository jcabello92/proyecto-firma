<?php

namespace App\Models\Comun;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_comun';
    protected $table = 'roles';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}