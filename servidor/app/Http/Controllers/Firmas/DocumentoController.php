<?php

namespace App\Http\Controllers\Firmas;

//use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Firmas\Documento;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DocumentoController extends Controller
{
    public function subirDocumento(Request $request)
    {
        $validator = Validator::make($request->all(), [
        'documento' => 'required|file|mimes:pdf',
        'user_id'  => 'required|integer',
    ]);

    if($validator->fails())
    {
        return 'Ocurrió un error en los datos recibidos.';
    }
        /*$request->validate([
            'documento' => 'required|file|mimes:pdf',
            'user_id' => 'required|integer'
        ]);*/

        $file = $request->file('documento');
        $ruta = $file->store('public/documentos');

        $documento = Documento::create([
            'nombre' => $file->getClientOriginalName(),
            'ruta' => $ruta,
            'user_id' => $request->user_id
        ]);

        return response()->json(['mensaje' => 'Documento subido', 'documento' => $documento]);
    }
}
