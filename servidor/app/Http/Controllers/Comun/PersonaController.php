<?php

namespace App\Http\Controllers\Comun;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Comun\Persona;

class PersonaController extends Controller
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
            'rut',
            'nombre',
            'apellido',
            'sexo',
            'fecha_nacimiento',
            'direccion',
            'comuna',
            'telefono_fijo',
            'telefono_movil',
            'correo'
        ];

        $elementos = Persona::select($campos)->where('activo', 1)->skip($pagina)->limit(50)->get();

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
            'rut',
            'nombre',
            'apellido',
            'sexo',
            'fecha_nacimiento',
            'direccion',
            'comuna',
            'telefono_fijo',
            'telefono_movil',
            'correo'
        ];

        $elemento = Persona::select($campos)->where('id', $id)->where('activo', 1)->limit(1)->get();

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
            'rut' => 'min:11|max:13|required|unique:App\Models\Persona,rut',
            'nombre' => 'max:30|required',
            'apellido' => 'max:30|required',
            'sexo' => 'integer|digits_between:1,1',
            'fecha_nacimiento' => 'size:10',
            'direccion' => 'max:60',
            'comuna' => 'integer|digits_between:1,3',
            'telefono_fijo' => 'min:3|max:4',
            'telefono_movil' => 'size:12',
            'correo' => 'max:40'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        $sexo = null;
        if($request->has('sexo'))
        {
            $sexo = $request->sexo;
        }
        $fecha_nacimiento = null;
        if($request->has('fecha_nacimiento'))
        {
            $fecha_nacimiento = $request->fecha_nacimiento;
        }
        $direccion = null;
        if($request->has('direccion'))
        {
            $direccion = $request->direccion;
        }
        $comuna = null;
        if($request->has('comuna'))
        {
            $comuna = $request->comuna;
        }
        $telefono_fijo = null;
        if($request->has('telefono_fijo'))
        {
            $telefono_fijo = $request->telefono_fijo;
        }
        $telefono_movil = null;
        if($request->has('telefono_movil'))
        {
            $telefono_movil = $request->telefono_movil;
        }
        $correo = null;
        if($request->has('correo'))
        {
            $correo = $request->correo;
        }

        $elemento = Persona::insert([
            'rut' => $request->rut,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'sexo' => $sexo,
            'fecha_nacimiento' => $fecha_nacimiento,
            'direccion' => $direccion,
            'comuna' => $comuna,
            'telefono_fijo' => $telefono_fijo,
            'telefono_movil' => $telefono_movil,
            'correo' => $correo
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
        $elemento = Persona::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $validator = Validator::make($request->all(), [
            'rut' => 'min:11|max:13|unique:App\Models\Persona,rut',
            'nombre' => 'max:30',
            'apellido' => 'max:30',
            'sexo' => 'integer|digits_between:1,1',
            'fecha_nacimiento' => 'size:10',
            'direccion' => 'max:60',
            'comuna' => 'integer|digits_between:1,3',
            'telefono_fijo' => 'min:3|max:4',
            'telefono_movil' => 'size:12',
            'correo' => 'max:40',
            'activo' => 'integer|digits_between:1,1'
        ]);

        if($validator->fails())
        {
            return 'Ocurrió un error en los datos recibidos.';
        }

        if($request->has('rut'))
        {
            $elemento->rut = $request->rut;
        }
        if($request->has('nombre'))
        {
            $elemento->nombre = $request->nombre;
        }
        if($request->has('apellido'))
        {
            $elemento->apellido = $request->apellido;
        }
        if($request->has('sexo'))
        {
            $elemento->sexo = $request->sexo;
        }
        if($request->has('fecha_nacimiento'))
        {
            $elemento->fecha_nacimiento = $request->fecha_nacimiento;
        }
        if($request->has('direccion'))
        {
            $elemento->direccion = $request->direccion;
        }
        if($request->has('comuna'))
        {
            $elemento->comuna = $request->comuna;
        }
        if($request->has('telefono_fijo'))
        {
            $elemento->telefono_fijo = $request->telefono_fijo;
        }
        if($request->has('telefono_movil'))
        {
            $elemento->telefono_movil = $request->telefono_movil;
        }
        if($request->has('correo'))
        {
            $elemento->correo = $request->correo;
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
        $elemento = Persona::find($id);

        if(!$elemento)
        {
            return 'No se encontró el elemento registrado en el sistema.';
        }

        $elemento->delete();

        return 'Elemento eliminado con éxito del sistema.';
    }
}