<?php

namespace App\Http\Controllers\SoporteTecnico;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\SoporteTecnico\Traspaso;

class TraspasoController extends Controller
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
            'usuario_emisor',
            'usuario_receptor',
            'fecha_emision',
            'hora_emision',
            'fecha_recepcion',
            'hora_recepcion',
            'usuario_aceptante',
            'justificacion',
            'estado_traspaso'
        ];

        $elementos = Traspaso::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

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
            'usuario_emisor',
            'usuario_receptor',
            'fecha_emision',
            'hora_emision',
            'fecha_recepcion',
            'hora_recepcion',
            'usuario_aceptante',
            'justificacion',
            'estado_traspaso'
        ];

        $elemento = Traspaso::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

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
            'usuario_emisor' => 'integer|digits_between:1,2|required',
            'usuario_receptor' => 'integer|digits_between:1,2|required',
            'fecha_emision' => 'size:10|required',
            'hora_emision' => 'size:8|required',
            'fecha_recepcion' => 'size:10|required',
            'hora_recepcion' => 'size:8|required',
            'usuario_aceptante' => 'integer|digits_between:1,2|required',
            'justificacion' => 'max:500|required',
            'estado_traspaso' => 'integer|digits_between:1,1|required'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $elemento = Traspaso::insert([
            'ticket' => $request->ticket,
            'usuario_emisor' => $request->usuario_emisor,
            'usuario_receptor' => $request->usuario_receptor,
            'fecha_emision' => $request->fecha_emision,
            'hora_emision' => $request->hora_emision,
            'fecha_recepcion' => $request->fecha_recepcion,
            'hora_recepcion' => $request->hora_recepcion,
            'usuario_aceptante' => $request->usuario_aceptante,
            'justificacion' => $request->justificacion,
            'estado_traspaso' => $request->estado_traspaso
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
        $elemento = Traspaso::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'ticket' => 'integer|digits_between:1,8',
            'usuario_emisor' => 'integer|digits_between:1,2',
            'usuario_receptor' => 'integer|digits_between:1,2',
            'fecha_emision' => 'size:10',
            'hora_emision' => 'size:8',
            'fecha_recepcion' => 'size:10',
            'hora_recepcion' => 'size:8',
            'usuario_aceptante' => 'integer|digits_between:1,2',
            'justificacion' => 'max:500',
            'estado_traspaso' => 'integer|digits_between:1,1',
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
        if($request->has('usuario_emisor'))
        {
            $elemento->usuario_emisor = $request->usuario_emisor;
        }
        if($request->has('usuario_receptor'))
        {
            $elemento->usuario_receptor = $request->usuario_receptor;
        }
        if($request->has('fecha_emision'))
        {
            $elemento->fecha_emision = $request->fecha_emision;
        }
        if($request->has('hora_emision'))
        {
            $elemento->hora_emision = $request->hora_emision;
        }
        if($request->has('fecha_recepcion'))
        {
            $elemento->fecha_recepcion = $request->fecha_recepcion;
        }
        if($request->has('hora_recepcion'))
        {
            $elemento->hora_recepcion = $request->hora_recepcion;
        }
        if($request->has('usuario_aceptante'))
        {
            $elemento->usuario_aceptante = $request->usuario_aceptante;
        }
        if($request->has('justificacion'))
        {
            $elemento->justificacion = $request->justificacion;
        }
        if($request->has('estado_traspaso'))
        {
            $elemento->estado_traspaso = $request->estado_traspaso;
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
        $elemento = Traspaso::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }
}