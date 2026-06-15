export default interface I_vEvaluacionJurado {
  get cedula(): number;
  get nombre(): string;

  get puntajesForm5(): number[];
  get puntajesForm51(): number[];
  get puntajesForm52(): number[];
  get puntajesForm53(): number[];

  get notaExamenEscrito(): number;
  get notaExamenPractico(): number;

  get evaluacionAspectosJuradoA(): number[];
  get evaluacionAspectosJuradoB(): number[];
  get evaluacionAspectosJuradoC(): number[];

  onBuscar(callback: () => void): void;
  onGuardarEvaluacion(callback: () => void): void;
  onVolver(callback: () => void): void;

  mostrar(): void;
  ocultar(): void;
  limpiarInputs(): void;
  activarFormularioEvaluacion(bloquearNombre: boolean): void;
  poblarCampos(datos: any): void;
}