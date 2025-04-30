<?php

namespace App\Models\Firmas;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $connection = 'municurico_firma';
    protected $table = 'documentos';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'ruta',
        'user_id'
    ];
}
