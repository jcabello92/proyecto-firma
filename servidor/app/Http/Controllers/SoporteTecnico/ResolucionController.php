<?php

namespace App\Http\Controllers\SoporteTecnico;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\SoporteTecnico\Resolucion;

class ResolucionController extends Controller
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
            'resolucion',
            'fecha_resolucion',
            'hora_resolucion'
        ];

        $elementos = Resolucion::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

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
            'resolucion',
            'fecha_resolucion',
            'hora_resolucion'
        ];

        $elemento = Resolucion::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

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
            'resolucion' => 'max:500|required',
            'fecha_resolucion' => 'size:10|required',
            'hora_resolucion' => 'size:8|required'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $elemento = Resolucion::insert([
            'ticket' => $request->ticket,
            'usuario' => $request->usuario,
            'resolucion' => $request->resolucion,
            'fecha_resolucion' => $request->fecha_resolucion,
            'hora_resolucion' => $request->hora_resolucion
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
        $elemento = Resolucion::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'ticket' => 'integer|digits_between:1,8|required',
            'usuario' => 'integer|digits_between:1,2|required',
            'resolucion' => 'max:500|required',
            'fecha_resolucion' => 'size:10|required',
            'hora_resolucion' => 'size:8|required',
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
        if($request->has('resolucion'))
        {
            $elemento->resolucion = $request->resolucion;
        }
        if($request->has('fecha_resolucion'))
        {
            $elemento->fecha_resolucion = $request->fecha_resolucion;
        }
        if($request->has('hora_resolucion'))
        {
            $elemento->hora_resolucion = $request->hora_resolucion;
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
        $elemento = Resolucion::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }
}