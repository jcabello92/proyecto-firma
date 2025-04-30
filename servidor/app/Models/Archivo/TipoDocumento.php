<?php

namespace App\Models\Archivo;

use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_archivo';
    protected $table = 'tipos_documentos';
    protected $fillable = [
        'id',
        'nombre',
        'activo'
    ];
}