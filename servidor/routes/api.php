<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





# COMÚN
use App\Http\Controllers\Comun\AreaController as ComunAreaController;
use App\Http\Controllers\Comun\ComunaController as ComunComunaController;
use App\Http\Controllers\Comun\PersonaController as ComunPersonaController;
use App\Http\Controllers\Comun\ProvinciaController as ComunProvinciaController;
use App\Http\Controllers\Comun\RegionController as ComunRegionController;
use App\Http\Controllers\Comun\RolController as ComunRolController;
use App\Http\Controllers\Comun\SexoController as ComunSexoController;
use App\Http\Controllers\Comun\UsuarioController as ComunUsuarioController;





# SOPORTE TÉCNICO
use App\Http\Controllers\SoporteTecnico\AsignacionTicketController as SoporteTecnicoAsignacionTicketController;
use App\Http\Controllers\SoporteTecnico\AsignacionTipoSolicitudController as SoporteTecnicoAsignacionTipoSolicitudController;
use App\Http\Controllers\SoporteTecnico\EstadoTicketController as SoporteTecnicoEstadoTicketController;
use App\Http\Controllers\SoporteTecnico\EstadoTraspasoController as SoporteTecnicoEstadoTraspasoController;
use App\Http\Controllers\SoporteTecnico\MensajeController as SoporteTecnicoMensajeController;
use App\Http\Controllers\SoporteTecnico\ResolucionController as SoporteTecnicoResolucionController;
use App\Http\Controllers\SoporteTecnico\RolController as SoporteTecnicoRolController;
use App\Http\Controllers\SoporteTecnico\SolicitudController as SoporteTecnicoSolicitudController;
use App\Http\Controllers\SoporteTecnico\TicketController as SoporteTecnicoTicketController;
use App\Http\Controllers\SoporteTecnico\TipoSolicitudController as SoporteTecnicoTipoSolicitudController;
use App\Http\Controllers\SoporteTecnico\TipoTicketController as SoporteTecnicoTipoTicketController;
use App\Http\Controllers\SoporteTecnico\TraspasoController as SoporteTecnicoTraspasoController;
use App\Http\Controllers\SoporteTecnico\UsuarioController as SoporteTecnicoUsuarioController;

# Firmas
use App\Http\Controllers\Firmas\FirmaDocumetoController;
use App\Http\Controllers\Firmas\TokenController;
use App\Http\Controllers\Firmas\DocumentoController;
use App\Http\Controllers\Firmas\FirmasController;

#FIRMAS
//Firmar
Route::post('/firmar-documento', [FirmaDocumetoController::class, 'firmar']);
//Generar Token
Route::post('/generar-token', [TokenController::class, 'generarToken']);
//Subir Documeto
Route::post('/documetos', [DocumentoController::class, 'subirDocumento']);
//Ver Firmas
Route::get('/documetos/{documento_id}', [FirmasController::class , 'verFirmas']);




# COMÚN
# ÁREAS
Route::get('/comun/areas/pagina/{pagina}', [ComunAreaController::class, 'index']);
Route::get('/comun/areas/id/{id}', [ComunAreaController::class, 'show']);
Route::post('/comun/areas', [ComunAreaController::class, 'store']);
Route::patch('/comun/areas/{id}', [ComunAreaController::class, 'update']);
Route::delete('/comun/areas/{id}', [ComunAreaController::class, 'destroy']);

# COMUNAS
Route::get('/comun/comunas/pagina/{pagina}', [ComunComunaController::class, 'index']);
Route::get('/comun/comunas/id/{id}', [ComunComunaController::class, 'show']);
Route::post('/comun/comunas', [ComunComunaController::class, 'store']);
Route::patch('/comun/comunas/{id}', [ComunComunaController::class, 'update']);
Route::delete('/comun/comunas/{id}', [ComunComunaController::class, 'destroy']);

# PERSONAS
Route::get('/comun/personas/pagina/{pagina}', [ComunPersonaController::class, 'index']);
Route::get('/comun/personas/id/{id}', [ComunPersonaController::class, 'show']);
Route::post('/comun/personas', [ComunPersonaController::class, 'store']);
Route::patch('/comun/personas/{id}', [ComunPersonaController::class, 'update']);
Route::delete('/comun/personas/{id}', [ComunPersonaController::class, 'destroy']);

# PROVINCIAS
Route::get('/comun/provincias/pagina/{pagina}', [ComunProvinciaController::class, 'index']);
Route::get('/comun/provincias/id/{id}', [ComunProvinciaController::class, 'show']);
Route::post('/comun/provincias', [ComunProvinciaController::class, 'store']);
Route::patch('/comun/provincias/{id}', [ComunProvinciaController::class, 'update']);
Route::delete('/comun/provincias/{id}', [ComunProvinciaController::class, 'destroy']);

# REGIONES
Route::get('/comun/regiones/pagina/{pagina}', [ComunRegionController::class, 'index']);
Route::get('/comun/regiones/id/{id}', [ComunRegionController::class, 'show']);
Route::post('/comun/regiones', [ComunRegionController::class, 'store']);
Route::patch('/comun/regiones/{id}', [ComunRegionController::class, 'update']);
Route::delete('/comun/regiones/{id}', [ComunRegionController::class, 'destroy']);

# ROLES
Route::get('/comun/roles/pagina/{pagina}', [ComunRolController::class, 'index']);
Route::get('/comun/roles/id/{id}', [ComunRolController::class, 'show']);
Route::post('/comun/roles', [ComunRolController::class, 'store']);
Route::patch('/comun/roles/{id}', [ComunRolController::class, 'update']);
Route::delete('/comun/roles/{id}', [ComunRolController::class, 'destroy']);

# SEXOS
Route::get('/comun/sexos/pagina/{pagina}', [ComunSexoController::class, 'index']);
Route::get('/comun/sexos/id/{id}', [ComunSexoController::class, 'show']);
Route::post('/comun/sexos', [ComunSexoController::class, 'store']);
Route::patch('/comun/sexos/{id}', [ComunSexoController::class, 'update']);
Route::delete('/comun/sexos/{id}', [ComunSexoController::class, 'destroy']);

# USUARIOS
Route::get('/comun/usuarios/pagina/{pagina}', [ComunUsuarioController::class, 'index']);
Route::get('/comun/usuarios/id/{id}', [ComunUsuarioController::class, 'show']);
Route::post('/comun/usuarios', [ComunUsuarioController::class, 'store']);
Route::patch('/comun/usuarios/{id}', [ComunUsuarioController::class, 'update']);
Route::delete('/comun/usuarios/{id}', [ComunUsuarioController::class, 'destroy']);
Route::get('/comun/usuarios/login', [ComunUsuarioController::class, 'login']);





# SOPORTE TÉCNICO
# ASIGNACIONES TICKETS
Route::get('/soportetecnico/asignacionestickets/pagina/{pagina}', [SoporteTecnicoAsignacionTicketController::class, 'index']);
Route::get('/soportetecnico/asignacionestickets/id/{id}', [SoporteTecnicoAsignacionTicketController::class, 'show']);
Route::post('/soportetecnico/asignacionestickets', [SoporteTecnicoAsignacionTicketController::class, 'store']);
Route::patch('/soportetecnico/asignacionestickets/{id}', [SoporteTecnicoAsignacionTicketController::class, 'update']);
Route::delete('/soportetecnico/asignacionestickets/{id}', [SoporteTecnicoAsignacionTicketController::class, 'destroy']);

# ASIGNACIONES TIPOS SOLICITUDES
Route::get('/soportetecnico/asignacionestipossolicitudes/pagina/{pagina}', [SoporteTecnicoAsignacionTipoSolicitudController::class, 'index']);
Route::get('/soportetecnico/asignacionestipossolicitudes/id/{id}', [SoporteTecnicoAsignacionTipoSolicitudController::class, 'show']);
Route::post('/soportetecnico/asignacionestipossolicitudes', [SoporteTecnicoAsignacionTipoSolicitudController::class, 'store']);
Route::patch('/soportetecnico/asignacionestipossolicitudes/{id}', [SoporteTecnicoAsignacionTipoSolicitudController::class, 'update']);
Route::delete('/soportetecnico/asignacionestipossolicitudes/{id}', [SoporteTecnicoAsignacionTipoSolicitudController::class, 'destroy']);

# ESTADOS TICKETS
Route::get('/soportetecnico/estadostickets/pagina/{pagina}', [SoporteTecnicoEstadoTicketController::class, 'index']);
Route::get('/soportetecnico/estadostickets/id/{id}', [SoporteTecnicoEstadoTicketController::class, 'show']);
Route::post('/soportetecnico/estadostickets', [SoporteTecnicoEstadoTicketController::class, 'store']);
Route::patch('/soportetecnico/estadostickets/{id}', [SoporteTecnicoEstadoTicketController::class, 'update']);
Route::delete('/soportetecnico/estadostickets/{id}', [SoporteTecnicoEstadoTicketController::class, 'destroy']);

# ESTADOS TRASPASOS
Route::get('/soportetecnico/estadostraspasos/pagina/{pagina}', [SoporteTecnicoEstadoTraspasoController::class, 'index']);
Route::get('/soportetecnico/estadostraspasos/id/{id}', [SoporteTecnicoEstadoTraspasoController::class, 'show']);
Route::post('/soportetecnico/estadostraspasos', [SoporteTecnicoEstadoTraspasoController::class, 'store']);
Route::patch('/soportetecnico/estadostraspasos/{id}', [SoporteTecnicoEstadoTraspasoController::class, 'update']);
Route::delete('/soportetecnico/estadostraspasos/{id}', [SoporteTecnicoEstadoTraspasoController::class, 'destroy']);

# MENSAJES
Route::get('/soportetecnico/mensajes/pagina/{pagina}', [SoporteTecnicoMensajeController::class, 'index']);
Route::get('/soportetecnico/mensajes/id/{id}', [SoporteTecnicoMensajeController::class, 'show']);
Route::post('/soportetecnico/mensajes', [SoporteTecnicoMensajeController::class, 'store']);
Route::patch('/soportetecnico/mensajes/{id}', [SoporteTecnicoMensajeController::class, 'update']);
Route::delete('/soportetecnico/mensajes/{id}', [SoporteTecnicoMensajeController::class, 'destroy']);

# RESOLUCIONES
Route::get('/soportetecnico/resoluciones/pagina/{pagina}', [SoporteTecnicoResolucionController::class, 'index']);
Route::get('/soportetecnico/resoluciones/id/{id}', [SoporteTecnicoResolucionController::class, 'show']);
Route::post('/soportetecnico/resoluciones', [SoporteTecnicoResolucionController::class, 'store']);
Route::patch('/soportetecnico/resoluciones/{id}', [SoporteTecnicoResolucionController::class, 'update']);
Route::delete('/soportetecnico/resoluciones/{id}', [SoporteTecnicoResolucionController::class, 'destroy']);

# ROLES
Route::get('/soportetecnico/roles/pagina/{pagina}', [SoporteTecnicoRolController::class, 'index']);
Route::get('/soportetecnico/roles/id/{id}', [SoporteTecnicoRolController::class, 'show']);
Route::post('/soportetecnico/roles', [SoporteTecnicoRolController::class, 'store']);
Route::patch('/soportetecnico/roles/{id}', [SoporteTecnicoRolController::class, 'update']);
Route::delete('/soportetecnico/roles/{id}', [SoporteTecnicoRolController::class, 'destroy']);

# SOLICITUDES
Route::get('/soportetecnico/solicitudes/pagina/{pagina}', [SoporteTecnicoSolicitudController::class, 'index']);
Route::get('/soportetecnico/solicitudes/id/{id}', [SoporteTecnicoSolicitudController::class, 'show']);
Route::post('/soportetecnico/solicitudes', [SoporteTecnicoSolicitudController::class, 'store']);
Route::patch('/soportetecnico/solicitudes/{id}', [SoporteTecnicoSolicitudController::class, 'update']);
Route::delete('/soportetecnico/solicitudes/{id}', [SoporteTecnicoSolicitudController::class, 'destroy']);

# TICKETS
Route::get('/soportetecnico/tickets/pagina/{pagina}', [SoporteTecnicoTicketController::class, 'index']);
Route::get('/soportetecnico/tickets/id/{id}', [SoporteTecnicoTicketController::class, 'show']);
Route::post('/soportetecnico/tickets', [SoporteTecnicoTicketController::class, 'store']);
Route::patch('/soportetecnico/tickets/{id}', [SoporteTecnicoTicketController::class, 'update']);
Route::delete('/soportetecnico/tickets/{id}', [SoporteTecnicoTicketController::class, 'destroy']);

# TIPOS SOLICITUDES
Route::get('/soportetecnico/tipossolicitudes/pagina/{pagina}', [SoporteTecnicoTipoSolicitudController::class, 'index']);
Route::get('/soportetecnico/tipossolicitudes/id/{id}', [SoporteTecnicoTipoSolicitudController::class, 'show']);
Route::post('/soportetecnico/tipossolicitudes', [SoporteTecnicoTipoSolicitudController::class, 'store']);
Route::patch('/soportetecnico/tipossolicitudes/{id}', [SoporteTecnicoTipoSolicitudController::class, 'update']);
Route::delete('/soportetecnico/tipossolicitudes/{id}', [SoporteTecnicoTipoSolicitudController::class, 'destroy']);

# TIPOS TICKETS
Route::get('/soportetecnico/tipostickets/pagina/{pagina}', [SoporteTecnicoTipoTicketController::class, 'index']);
Route::get('/soportetecnico/tipostickets/id/{id}', [SoporteTecnicoTipoTicketController::class, 'show']);
Route::post('/soportetecnico/tipostickets', [SoporteTecnicoTipoTicketController::class, 'store']);
Route::patch('/soportetecnico/tipostickets/{id}', [SoporteTecnicoTipoTicketController::class, 'update']);
Route::delete('/soportetecnico/tipostickets/{id}', [SoporteTecnicoTipoTicketController::class, 'destroy']);

# TRASPASOS
Route::get('/soportetecnico/traspasos/pagina/{pagina}', [SoporteTecnicoTraspasoController::class, 'index']);
Route::get('/soportetecnico/traspasos/id/{id}', [SoporteTecnicoTraspasoController::class, 'show']);
Route::post('/soportetecnico/traspasos', [SoporteTecnicoTraspasoController::class, 'store']);
Route::patch('/soportetecnico/traspasos/{id}', [SoporteTecnicoTraspasoController::class, 'update']);
Route::delete('/soportetecnico/traspasos/{id}', [SoporteTecnicoTraspasoController::class, 'destroy']);

# USUARIOS
Route::get('/soportetecnico/usuarios/pagina/{pagina}', [SoporteTecnicoUsuarioController::class, 'index']);
Route::get('/soportetecnico/usuarios/id/{id}', [SoporteTecnicoUsuarioController::class, 'show']);
Route::post('/soportetecnico/usuarios', [SoporteTecnicoUsuarioController::class, 'store']);
Route::patch('/soportetecnico/usuarios/{id}', [SoporteTecnicoUsuarioController::class, 'update']);
Route::delete('/soportetecnico/usuarios/{id}', [SoporteTecnicoUsuarioController::class, 'destroy']);