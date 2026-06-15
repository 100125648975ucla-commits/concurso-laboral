import I_vEvaluacionJurado from "../interfaces/I_vEvaluacionJurado.js";

export default class Cl_vEvaluacionJurado implements I_vEvaluacionJurado {
  private ui: HTMLElement;
  private inCedula: HTMLInputElement;
  private btBuscar: HTMLButtonElement;
  private divFormularioNotas: HTMLDivElement;
  private inNombre: HTMLInputElement;
  private inExamenEscrito: HTMLInputElement;
  private inExamenPractico: HTMLInputElement;
  private btGuardar: HTMLButtonElement;
  private btVolver: HTMLButtonElement;

  constructor() {
    this.ui = document.getElementById("evaluacionJurado") as HTMLElement;
    this.inCedula = document.getElementById("evaluacion_inCedula") as HTMLInputElement;
    this.btBuscar = document.getElementById("evaluacion_btBuscar") as HTMLButtonElement;
    this.divFormularioNotas = document.getElementById("evaluacion_divFormularioNotas") as HTMLDivElement;
    this.inNombre = document.getElementById("registro_inNombre") as HTMLInputElement;
    this.inExamenEscrito = document.getElementById("evaluacion_inExamenEscrito") as HTMLInputElement;
    this.inExamenPractico = document.getElementById("evaluacion_inExamenPractico") as HTMLInputElement;
    this.btGuardar = document.getElementById("evaluacion_btGuardar") as HTMLButtonElement;
    this.btVolver = document.getElementById("evaluacion_btVolver") as HTMLButtonElement;
  }

  public get cedula(): number {
    return parseInt(this.inCedula.value.trim()) || 0;
  }

  public get nombre(): string {
    return this.inNombre.value.trim();
  }

  public get puntajesForm5(): number[] {
    return [
      parseFloat((document.getElementById("f5_in1") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f5_in2") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f5_in3") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f5_in4") as HTMLInputElement)?.value) || 0
    ];
  }

  public get puntajesForm51(): number[] {
    return [
      parseFloat((document.getElementById("f51_in1") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f51_in2") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f51_in3") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f51_in4") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f51_in5") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f51_in6") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f51_in7") as HTMLInputElement)?.value) || 0
    ];
  }

  public get puntajesForm52(): number[] {
    return [
      parseFloat((document.getElementById("f52_in1") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in2") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in3") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in4") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in5") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in6") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in7") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in8") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f52_in9") as HTMLInputElement)?.value) || 0
    ];
  }

  public get puntajesForm53(): number[] {
    return [
      parseFloat((document.getElementById("f53_in1") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f53_in2") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f53_in3") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f53_in4") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f53_in5") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f53_in6") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f53_in7") as HTMLInputElement)?.value) || 0,
      parseFloat((document.getElementById("f53_in8") as HTMLInputElement)?.value) || 0
    ];
  }

  public get notaExamenEscrito(): number {
    return parseFloat(this.inExamenEscrito.value) || 0;
  }

  public get notaExamenPractico(): number {
    return parseFloat(this.inExamenPractico.value) || 0;
  }

  public get evaluacionAspectosJuradoA(): number[] {
    const arreglo: number[] = [];
    for (let i = 1; i <= 12; i++) {
      const input = document.getElementById(`ja_in${i}`) as HTMLInputElement;
      arreglo.push(parseFloat(input.value) || 0);
    }
    return arreglo;
  }

  public get evaluacionAspectosJuradoB(): number[] {
    const arreglo: number[] = [];
    for (let i = 1; i <= 12; i++) {
      const input = document.getElementById(`jb_in${i}`) as HTMLInputElement;
      arreglo.push(parseFloat(input.value) || 0);
    }
    return arreglo;
  }

  public get evaluacionAspectosJuradoC(): number[] {
    const arreglo: number[] = [];
    for (let i = 1; i <= 12; i++) {
      const input = document.getElementById(`jc_in${i}`) as HTMLInputElement;
      arreglo.push(parseFloat(input.value) || 0);
    }
    return arreglo;
  }

  public onBuscar(callback: () => void): void {
    this.btBuscar.onclick = () => callback();
  }

  public onGuardarEvaluacion(callback: () => void): void {
    this.btGuardar.onclick = () => callback();
  }

  public onVolver(callback: () => void): void {
    this.btVolver.onclick = () => callback();
  }

  public mostrar(): void {
    this.ui.removeAttribute("hidden");
    this.divFormularioNotas.setAttribute("hidden", "true"); 
  }

  public ocultar(): void {
    this.ui.setAttribute("hidden", "true");
  }

  public activarFormularioEvaluacion(bloquearNombre: boolean): void {
    this.divFormularioNotas.removeAttribute("hidden");
    if (bloquearNombre) {
      this.inNombre.setAttribute("readonly", "true");
    } else {
      this.inNombre.removeAttribute("readonly");
    }
  }

  public poblarCampos(datos: any): void {
    this.inNombre.value = datos.nombre || "";
    this.inExamenEscrito.value = datos.notaExamenEscrito !== 0 ? datos.notaExamenEscrito.toString() : "";
    this.inExamenPractico.value = datos.notaExamenPractico !== 0 ? datos.notaExamenPractico.toString() : "";
    
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`f5_in${i}`) as HTMLInputElement;
      if (el) el.value = datos.puntajesForm5?.[i - 1] !== 0 ? datos.puntajesForm5?.[i - 1].toString() : "";
    }
    for (let i = 1; i <= 7; i++) {
      const el = document.getElementById(`f51_in${i}`) as HTMLInputElement;
      if (el) el.value = datos.puntajesForm51?.[i - 1] !== 0 ? datos.puntajesForm51?.[i - 1].toString() : "";
    }
    for (let i = 1; i <= 9; i++) {
      const el = document.getElementById(`f52_in${i}`) as HTMLInputElement;
      if (el) el.value = datos.puntajesForm52?.[i - 1] !== 0 ? datos.puntajesForm52?.[i - 1].toString() : "";
    }
    for (let i = 1; i <= 8; i++) {
      const el = document.getElementById(`f53_in${i}`) as HTMLInputElement;
      if (el) el.value = datos.puntajesForm53?.[i - 1] !== 0 ? datos.puntajesForm53?.[i - 1].toString() : "";
    }
    for (let i = 1; i <= 12; i++) {
      const elA = document.getElementById(`ja_in${i}`) as HTMLInputElement;
      const elB = document.getElementById(`jb_in${i}`) as HTMLInputElement;
      const elC = document.getElementById(`jc_in${i}`) as HTMLInputElement;
      if (elA) elA.value = datos.evaluacionAspectosJuradoA?.[i - 1] !== 0 ? datos.evaluacionAspectosJuradoA?.[i - 1].toString() : "";
      if (elB) elB.value = datos.evaluacionAspectosJuradoB?.[i - 1] !== 0 ? datos.evaluacionAspectosJuradoB?.[i - 1].toString() : "";
      if (elC) elC.value = datos.evaluacionAspectosJuradoC?.[i - 1] !== 0 ? datos.evaluacionAspectosJuradoC?.[i - 1].toString() : "";
    }
  }

  public limpiarInputs(): void {
    this.inCedula.value = "";
    this.inNombre.value = "";
    this.inExamenEscrito.value = "";
    this.inExamenPractico.value = "";

    const todosLosInputsDeNotas = this.divFormularioNotas.querySelectorAll("input[type='number']");
    todosLosInputsDeNotas.forEach((input) => {
      (input as HTMLInputElement).value = "";
    });

    this.divFormularioNotas.setAttribute("hidden", "true");
  }
}