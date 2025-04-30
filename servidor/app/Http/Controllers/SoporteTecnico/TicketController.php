<?php

namespace App\Http\Controllers\SoporteTecnico;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\SoporteTecnico\Ticket;

class TicketController extends Controller
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
            'area',
            'tipo_ticket',
            'solicitud',
            'asunto',
            'detalle',
            'fecha_creacion',
            'hora_creacion',
            'estado_ticket'
        ];

        $elementos = Ticket::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

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
            'area',
            'tipo_ticket',
            'solicitud',
            'asunto',
            'detalle',
            'fecha_creacion',
            'hora_creacion',
            'estado_ticket'
        ];

        $elemento = Ticket::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

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
            'usuario' => 'integer|digits_between:1,4|required',
            'area' => 'integer|digits_between:1,3|required',
            'tipo_ticket' => 'integer|digits_between:1,1|required',
            'solicitud' => 'integer|digits_between:1,2|required',
            'asunto' => 'max:50|required',
            'detalle' => 'max:500',
            'fecha_creacion' => 'size:10|required',
            'hora_creacion' => 'size:8|required'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $detalle = null;
        if($request->has('detalle'))
        {
            $detalle = $request->detalle;
        }

        $elemento = Ticket::insert([
            'usuario' => $request->usuario,
            'area' => $request->area,
            'tipo_ticket' => $request->tipo_ticket,
            'solicitud' => $request->solicitud,
            'asunto' => $request->asunto,
            'detalle' => $detalle,
            'fecha_creacion' => $request->fecha_creacion,
            'hora_creacion' => $request->hora_creacion
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
        $elemento = Ticket::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'usuario' => 'integer|digits_between:1,4',
            'area' => 'integer|digits_between:1,3',
            'tipo_ticket' => 'integer|digits_between:1,1',
            'solicitud' => 'integer|digits_between:1,2',
            'asunto' => 'max:50',
            'detalle' => 'max:500',
            'fecha_creacion' => 'size:10',
            'hora_creacion' => 'size:8',
            'estado_ticket' => 'integer|digits_between:1,1',
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
        if($request->has('area'))
        {
            $elemento->area = $request->area;
        }
        if($request->has('tipo_ticket'))
        {
            $elemento->tipo_ticket = $request->tipo_ticket;
        }
        if($request->has('solicitud'))
        {
            $elemento->solicitud = $request->solicitud;
        }
        if($request->has('asunto'))
        {
            $elemento->asunto = $request->asunto;
        }
        if($request->has('detalle'))
        {
            $elemento->detalle = $request->detalle;
        }
        if($request->has('fecha_creacion'))
        {
            $elemento->fecha_creacion = $request->fecha_creacion;
        }
        if($request->has('hora_creacion'))
        {
            $elemento->hora_creacion = $request->hora_creacion;
        }
        if($request->has('estado_ticket'))
        {
            $elemento->estado_ticket = $request->estado_ticket;
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
        $elemento = Ticket::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }
}