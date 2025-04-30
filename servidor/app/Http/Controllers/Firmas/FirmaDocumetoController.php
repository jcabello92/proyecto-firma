<?php

namespace App\Http\Controllers\Firmas;

//use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Firmas\Documeto;
use App\Models\Firmas\DocumentoFirmado;
use App\Models\Firmas\Token;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class FirmaDocumetoController extends Controller
{
    public function firmar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'documento_id' => 'required|integer',
            'usuario_id'  => 'required|integer',
            'token'       => 'required|string'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }
        /*
        $request->validate([
            'documento_id' => 'required|integer',
            'usuario_id'  => 'required|integer',
            'token'       => 'required|string'
        ]);*/

        //return "hola xd";

        // Verificar si el token existe, está activo y corresponde al documento
        $tokenValido = Token::where('id_documentos', $request->documento_id)
                            ->where('token', $request->token)
                            ->where('usado', 1)
                            ->first();

        if (!$tokenValido) {
            return response()->json(['mensaje' => 'Token inválido o ya usado para este documento'], 403);
        }

        // Verificar si el usuario ya firmó ese documento
        $firmaExistente = DocumentoFirmado::where('documento_id', $request->documeto_id)
                                        ->where('usuario_id', $request->usuario_id)
                                        ->first();

        if ($firmaExistente) {
            return response()->json(['mensaje' => 'El usuario ya firmó este documento'], 403);
        }

        // Registrar la firma
        DocumentoFirmado::create([
            'documento_id' => $request->documento_id,
            'usuario_id'  => $request->usuario_id,
            'fecha_firma' => Carbon::now()
        ]);

        // Marcar token como usado y eliminarlo si quieres
        $tokenValido->usado = 0;
        $tokenValido->save();

        // Si quieres eliminarlo directamente:
        // $tokenValido->delete();

        return response()->json(['mensaje' => 'Firma registrada correctamente']);
    }
}
