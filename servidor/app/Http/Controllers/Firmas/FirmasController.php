<?php

namespace App\Http\Controllers\Firmas;

//use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Firmas\DocumentoFirmado;

class FirmasController extends Controller
{
    // Listar las firmas
    public function verFirmas($documento_id)
    {
        $firmas = DocumentoFirmado::where('documento_id', $documento_id)->get();
        return response()->json($firmas);
    }
}
