<?php

namespace App\Http\Controllers\SoporteTecnico;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\SoporteTecnico\Mensaje;

class MensajeController extends Controller
{
    # OBTIENE UNA LISTA DE ELEMENTOS
    public function index(int $pagina)
    {
        $pagina--;

        if($pagina > 0)
        {
            $pagina = $pagina * 50;
        }

        $campos = [
            'id',
            'ticket',
            'usuario',
            'orden',
            'mensaje',
            'fecha_envio',
            'hora_envio'
        ];

        $elementos = Mensaje::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

        if($elementos->isEmpty())
        {
            return 'No se encontraron elementos registrados en el sistema.';
        }

        return $elementos;
    }





    # OBTIENE UN ELEMENTO
    public function show(int $id)
    {
        $campos = [
            'id',
            'ticket',
            'usuario',
            'orden',
            'mensaje',
            'fecha_envio',
            'hora_envio'
        ];

        $elemento = Mensaje::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

        if($elemento->isEmpty())
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }
        
        return $elemento;
    }





    # AGREGA UN ELEMENTO
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ticket' => 'integer|digits_between:1,8|required',
            'usuario' => 'integer|digits_between:1,2|required',
            'orden' => 'integer|digits_between:1,5|required',
            'mensaje' => 'max:500|required',
            'fecha_envio' => 'size:10|required',
            'hora_envio' => 'size:8|required'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $elemento = Mensaje::insert([
            'ticket' => $request->ticket,
            'usuario' => $request->usuario,
            'orden' => $request->orden,
            'mensaje' => $request->mensaje,
            'fecha_envio' => $request->fecha_envio,
            'hora_envio' => $request->hora_envio
        ]);

        if(!$elemento)
        {
            return 'No se pudo registrar el elemento en el sistema.';
        }

        return 'Elemento registrado con éxito en el sistema.';
    }





    # ACTUALIZA UN ELEMENTO
    public function update(int $id, Request $request)
    {
        $elemento = Mensaje::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'ticket' => 'integer|digits_between:1,8',
            'usuario' => 'integer|digits_between:1,2',
            'orden' => 'integer|digits_between:1,5',
            'mensaje' => 'max:500',
            'fecha_envio' => 'size:10',
            'hora_envio' => 'size:8',
            'activo' => 'integer|digits_between:1,1'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        if($request->has('ticket'))
        {
            $elemento->ticket = $request->ticket;
        }
        if($request->has('usuario'))
        {
            $elemento->usuario = $request->usuario;
        }
        if($request->has('orden'))
        {
            $elemento->orden = $request->orden;
        }
        if($request->has('mensaje'))
        {
            $elemento->mensaje = $request->mensaje;
        }
        if($request->has('fecha_envio'))
        {
            $elemento->fecha_envio = $request->fecha_envio;
        }
        if($request->has('hora_envio'))
        {
            $elemento->hora_envio = $request->hora_envio;
        }
        if($request->has('activo'))
        {
            $elemento->activo = $request->activo;
        }

        $elemento->save();

        return 'Elemento actualizado con éxito en el sistema.';
    }





    # ELIMINA UN ELEMENTO
    public function destroy(int $id)
    {
        $elemento = Mensaje::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }
}