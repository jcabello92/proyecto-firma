<?php

namespace App\Http\Controllers\Comun;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Comun\Region;

class RegionController extends Controller
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
            'nombre',
            'abreviatura',
            'capital'
        ];

        $elementos = Region::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

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
            'nombre',
            'abreviatura',
            'capital'
        ];

        $elemento = Region::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

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
            'nombre' => 'max:64|required|unique:App\Models\Region,nombre',
            'abreviatura' => 'max:4|required|unique:App\Models\Region,abreviatura',
            'capital' => 'integer|digits_between:1,3|required|unique:App\Models\Region,capital'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $elemento = Region::insert([
            'nombre' => $request->nombre,
            'abreviatura' => $request->abreviatura,
            'capital' => $request->capital
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
        $elemento = Region::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'max:64|unique:App\Models\Region,nombre',
            'abreviatura' => 'max:4|unique:App\Models\Region,abreviatura',
            'capital' => 'integer|digits_between:1,3|unique:App\Models\Region,capital',
            'activo' => 'integer|digits_between:1,1'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        if($request->has('nombre'))
        {
            $elemento->nombre = $request->nombre;
        }
        if($request->has('abreviatura'))
        {
            $elemento->abreviatura = $request->abreviatura;
        }
        if($request->has('capital'))
        {
            $elemento->capital = $request->capital;
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
        $elemento = Region::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }
}