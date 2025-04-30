<?php

namespace App\Models\Archivo;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    public $timestamps = false;

    protected $connection = 'municurico_archivo';
    protected $table = 'documentos';
    protected $fillable = [
        'id',
        'tipo_documento',
        'nombre',
        'url',
        'area_prioritaria',
        'usuario_subida',
        'fecha_subida',
        'hora_subida',
        'activo'
    ];
}