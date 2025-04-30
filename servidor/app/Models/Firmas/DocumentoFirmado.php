<?php

namespace App\Models\Firmas;

use Illuminate\Database\Eloquent\Model;

class DocumentoFirmado extends Model
{
    protected $connection = 'municurico_firma';
    protected $table = 'documetos_firmados';
    protected $fillable = ['documento_id', 'usuario_id', 'fecha_firma'];
}
