<?php

namespace App\Http\Controllers\Comun;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Comun\Usuario;

class UsuarioController extends Controller
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
            'rol',
            'persona'
        ];

        $elementos = Usuario::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

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
            'rol',
            'persona'
        ];

        $elemento = Usuario::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

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
            'usuario' => 'max:30|required|unique:App\Models\Usuario,usuario',
            'contrasena' => 'size:32|required',
            'rol' => 'integer|digits_between:1,1|required',
            'persona' => 'integer|digits_between:1,4|required|unique:App\Models\Usuario,persona'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $elemento = Usuario::insert([
            'usuario' => $request->usuario,
            'contrasena' => $request->contrasena,
            'rol' => $request->rol,
            'persona' => $request->persona
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
        $elemento = Usuario::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'usuario' => 'max:30|unique:App\Models\Usuario,usuario',
            'contrasena' => 'size:32',
            'rol' => 'integer|digits_between:1,1',
            'persona' => 'integer|digits_between:1,4|unique:App\Models\Usuario,persona',
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
        if($request->has('contrasena'))
        {
            $elemento->contrasena = $request->contrasena;
        }
        if($request->has('rol'))
        {
            $elemento->rol = $request->rol;
        }
        if($request->has('persona'))
        {
            $elemento->persona = $request->persona;
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
        $elemento = Usuario::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }





    # INICIA SESIÓN
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario' => 'max:30|required',
            'contrasena' => 'size:32|required'
        ]);

        $campos = [
            'id',
            'usuario',
            'rol',
            'persona'
        ];

        $elemento = Usuario::select($campos)->where('usuario', $request->usuario)->where('contrasena', $request->contrasena)->where('activo', 1)->limit(1)->get();

        if($elemento->isEmpty())
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }
        
        return $elemento;
    }
}