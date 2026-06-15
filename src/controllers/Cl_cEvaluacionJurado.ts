import I_vEvaluacionJurado from "../interfaces/I_vEvaluacionJurado.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";
import Cl_sAspirante from "../services/Cl_sAspirante.js";

export default class Cl_cEvaluacionJurado {
  private vista: I_vEvaluacionJurado;
  private volverCallback: () => void;
  private aspiranteActual: Cl_mAspirante | null = null; 
  private esRegistroExistente: boolean = false;

  constructor({
    vista,
    volverCallback,
  }: {
    vista: I_vEvaluacionJurado;
    volverCallback: () => void;
  }) {
    this.vista = vista;
    this.volverCallback = volverCallback;

    this.vista.onBuscar(() => this.onBuscarClick());
    this.vista.onGuardarEvaluacion(() => this.onGuardarEvaluacionClick());
    this.vista.onVolver(() => this.onVolverClick());

    this.vista.mostrar();
  }

  private async onBuscarClick() {
    const cedulaBusqueda = this.vista.cedula;
    if (cedulaBusqueda <= 0) {
      alert("Por favor, ingrese una cédula válida para buscar.");
      return;
    }

    let resultado = await Cl_sAspirante.buscarPorCedula(cedulaBusqueda);
    
    if (resultado.ok === false) {
      alert("Error: No se pudo conectar con el servidor.");
      return;
    }

    if (resultado.aspirante === null) {
      this.esRegistroExistente = false;
      this.aspiranteActual = new Cl_mAspirante({
        cedula: cedulaBusqueda,
        nombre: ""
      });
      alert("El aspirante no se encuentra registrado. Se ha habilitado el formulario completo para proceder con la carga inicial de credenciales de mérito.");
      this.vista.poblarCampos(this.aspiranteActual.toJSON());
      this.vista.activarFormularioEvaluacion(false);
    } else {
      this.esRegistroExistente = true;
      this.aspiranteActual = resultado.aspirante;
      alert(`Aspirante localizado: ${this.aspiranteActual.nombre}. Proceda a actualizar las calificaciones.`);
      this.vista.poblarCampos(this.aspiranteActual.toJSON());
      this.vista.activarFormularioEvaluacion(true);
    }
  }

  private async onGuardarEvaluacionClick() {
    if (this.aspiranteActual === null) {
      alert("Error crítico: No hay ningún aspirante seleccionado para evaluar.");
      return;
    }

    this.aspiranteActual.nombre = this.vista.nombre;
    this.aspiranteActual.puntajesForm5 = this.vista.puntajesForm5;
    this.aspiranteActual.puntajesForm51 = this.vista.puntajesForm51;
    this.aspiranteActual.puntajesForm52 = this.vista.puntajesForm52;
    this.aspiranteActual.puntajesForm53 = this.vista.puntajesForm53;
    this.aspiranteActual.notaExamenEscrito = this.vista.notaExamenEscrito;
    this.aspiranteActual.notaExamenPractico = this.vista.notaExamenPractico;
    this.aspiranteActual.evaluacionAspectosJuradoA = this.vista.evaluacionAspectosJuradoA;
    this.aspiranteActual.evaluacionAspectosJuradoB = this.vista.evaluacionAspectosJuradoB;
    this.aspiranteActual.evaluacionAspectosJuradoC = this.vista.evaluacionAspectosJuradoC;

    const errorMensaje = this.aspiranteActual.datosOk;
    if (errorMensaje !== "") {
      alert(errorMensaje);
      return;
    }

    if (this.esRegistroExistente) {
      let resultadoUpdate = await Cl_sAspirante.actualizar(this.aspiranteActual);
      alert(resultadoUpdate.mensaje);
      if (resultadoUpdate.ok) {
        this.vista.limpiarInputs();
        this.aspiranteActual = null;
      }
    } else {
      let resultadoInsert = await Cl_sAspirante.agregar(this.aspiranteActual);
      alert(resultadoInsert.mensaje);
      if (resultadoInsert.ok) {
        this.vista.limpiarInputs();
        this.aspiranteActual = null;
      }
    }
  }

  private onVolverClick(): void {
    this.vista.ocultar();
    this.volverCallback();
  }
}