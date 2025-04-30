<?php

namespace App\Http\Controllers\SoporteTecnico;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\SoporteTecnico\AsignacionTicket;

class AsignacionTicketController extends Controller
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
            'usuario',
            'ticket',
            'fecha_asignacion',
            'hora_asignacion',
            'estado_asignacion'
        ];

        $elementos = AsignacionTicket::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

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
            'usuario',
            'ticket',
            'fecha_asignacion',
            'hora_asignacion',
            'estado_asignacion'
        ];

        $elemento = AsignacionTicket::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

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
            'usuario' => 'integer|digits_between:1,2|required',
            'ticket' => 'integer|digits_between:1,8|required',
            'fecha_asignacion' => 'size:10|required',
            'hora_asignacion' => 'size:8|required'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $elemento = AsignacionTicket::insert([
            'usuario' => $request->usuario,
            'ticket' => $request->ticket,
            'fecha_asignacion' => $request->fecha_asignacion,
            'hora_asignacion' => $request->hora_asignacion
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
        $elemento = AsignacionTicket::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'usuario' => 'integer|digits_between:1,2',
            'ticket' => 'integer|digits_between:1,8',
            'fecha_asignacion' => 'size:10',
            'hora_asignacion' => 'size:8',
            'estado_asignacion' => 'integer|digits_between:1,1',
            'activo' => 'integer|digits_between:1,1'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        if($request->has('usuario'))
        {
            $elemento->usuario = $request->usuario;
        }
        if($request->has('ticket'))
        {
            $elemento->ticket = $request->ticket;
        }
        if($request->has('fecha_asignacion'))
        {
            $elemento->fecha_asignacion = $request->fecha_asignacion;
        }
        if($request->has('hora_asignacion'))
        {
            $elemento->hora_asignacion = $request->hora_asignacion;
        }
        if($request->has('estado_asignacion'))
        {
            $elemento->estado_asignacion = $request->estado_asignacion;
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
        $elemento = AsignacionTicket::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }
}