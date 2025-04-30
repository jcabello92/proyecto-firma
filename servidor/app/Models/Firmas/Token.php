<?php

namespace App\Models\Firmas;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $connection= 'municurico_firma';
    protected $table = 'tokens';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'token',
        'usado',
        'user_id',
        'id_documentos'
    ];
}
