<?php

namespace App\Http\Controllers\Firmas;
use App\Http\Controllers\Firmas\Controller;
use Illuminate\Http\Request;
use App\Models\Firmas\Token;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class TokenController extends Controller
{
    // Generar token y enviar por correo
    public function generarToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'id_documentos'  => 'required|integer',
            'email' => 'required|email'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }
        /*$request->validate([
            'user_id' => 'required|integer',
            'id_documentos' => 'required|integer',
            'email' => 'required|email'
        ]);*/

        // Generar código de 6 dígitos
        $codigo = rand(100000, 999999);

        // Crear token en BD
        $token = Token::create([
            'token' => $codigo,
            'usado' => 1,
            'user_id' => $request->user_id,
            'id_documentos' => $request->id_documentos
        ]);

        // Enviar correo (PERSOLALIZAR)
        Mail::raw("Tu código de firma es: $codigo", function($message) use ($request) {
            $message->to($request->email)
                    ->subject("Código de firma electrónica");
        });

        return response()->json(['mensaje' => 'Token generado y enviado', 'codigo' => $codigo]);
    }
}
