export default class Cl_mAspirante {
  // Identificador interno para el recurso en MockAPI
  private tabla: string = "aspirantes"; 
  private _cedula: number = 0;
  private _nombre: string = "";
  
  // Arreglos privados de Credenciales (Datos del Currículum)
  private _puntajesForm5: number[] = [0, 0, 0, 0];       // Postgrado (4 aspectos)
  private _puntajesForm51: number[] = [0, 0, 0, 0, 0, 0, 0]; // Pregrado (7 aspectos)
  private _puntajesForm52: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Prod. Científica (9 aspectos)
  private _puntajesForm53: number[] = [0, 0, 0, 0, 0, 0, 0, 0]; // Experiencia (8 aspectos)

  // Bloque de Conocimientos (Exámenes)
  private _notaExamenEscrito: number = 0;
  private _notaExamenPractico: number = 0;

  // Arreglos de Aptitudes (Evaluación de los 3 Jurados)
  private _evaluacionAspectosJuradoA: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 aspectos
  private _evaluacionAspectosJuradoB: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 aspectos
  private _evaluacionAspectosJuradoC: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 aspectos

  constructor({
    cedula,
    nombre,
    puntajesForm5 = [0, 0, 0, 0],
    puntajesForm51 = [0, 0, 0, 0, 0, 0, 0],
    puntajesForm52 = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    puntajesForm53 = [0, 0, 0, 0, 0, 0, 0, 0],
    notaExamenEscrito = 0,
    notaExamenPractico = 0,
    evaluacionAspectosJuradoA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    evaluacionAspectosJuradoB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    evaluacionAspectosJuradoC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }: {
    cedula: number;
    nombre: string;
    puntajesForm5?: number[];
    puntajesForm51?: number[];
    puntajesForm52?: number[];
    puntajesForm53?: number[];
    notaExamenEscrito?: number;
    notaExamenPractico?: number;
    evaluacionAspectosJuradoA?: number[];
    evaluacionAspectosJuradoB?: number[];
    evaluacionAspectosJuradoC?: number[];
  }) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.puntajesForm5 = puntajesForm5;
    this.puntajesForm51 = puntajesForm51;
    this.puntajesForm52 = puntajesForm52;
    this.puntajesForm53 = puntajesForm53;
    this.notaExamenEscrito = notaExamenEscrito;
    this.notaExamenPractico = notaExamenPractico;
    this.evaluacionAspectosJuradoA = evaluacionAspectosJuradoA;
    this.evaluacionAspectosJuradoB = evaluacionAspectosJuradoB;
    this.evaluacionAspectosJuradoC = evaluacionAspectosJuradoC;
  }

  
  public get cedula(): number { return this._cedula; }
  public set cedula(value: number) { this._cedula = +value; }

  public get nombre(): string { return this._nombre; }
  public set nombre(value: string) { this._nombre = value.trim(); }

  public get puntajesForm5(): number[] { return this._puntajesForm5; }
  public set puntajesForm5(v: number[]) { this._puntajesForm5 = v; }

  public get puntajesForm51(): number[] { return this._puntajesForm51; }
  public set puntajesForm51(v: number[]) { this._puntajesForm51 = v; }

  public get puntajesForm52(): number[] { return this._puntajesForm52; }
  public set puntajesForm52(v: number[]) { this._puntajesForm52 = v; }

  public get puntajesForm53(): number[] { return this._puntajesForm53; }
  public set puntajesForm53(v: number[]) { this._puntajesForm53 = v; }

  public get notaExamenEscrito(): number { return this._notaExamenEscrito; }
  public set notaExamenEscrito(v: number) { this._notaExamenEscrito = +v; }

  public get notaExamenPractico(): number { return this._notaExamenPractico; }
  public set notaExamenPractico(v: number) { this._notaExamenPractico = +v; }

  public get evaluacionAspectosJuradoA(): number[] { return this._evaluacionAspectosJuradoA; }
  public set evaluacionAspectosJuradoA(v: number[]) { this._evaluacionAspectosJuradoA = v; }

  public get evaluacionAspectosJuradoB(): number[] { return this._evaluacionAspectosJuradoB; }
  public set evaluacionAspectosJuradoB(v: number[]) { this._evaluacionAspectosJuradoB = v; }

  public get evaluacionAspectosJuradoC(): number[] { return this._evaluacionAspectosJuradoC; }
  public set evaluacionAspectosJuradoC(v: number[]) { this._evaluacionAspectosJuradoC = v; }

  
  public puntosForm5(): number {
    const suma = this.puntajesForm5.reduce((acc, nota) => acc + nota, 0);
    return suma > 35 ? 35 : suma; // Aplica el tope de la tabla
  }

  public puntosForm51(): number {
    const suma = this.puntajesForm51.reduce((acc, nota) => acc + nota, 0);
    return suma > 30 ? 30 : suma;
  }

  public puntosForm52(): number {
    const suma = this.puntajesForm52.reduce((acc, nota) => acc + nota, 0);
    return suma > 15 ? 15 : suma;
  }

  public puntosForm53(): number {
    const suma = this.puntajesForm53.reduce((acc, nota) => acc + nota, 0);
    return suma > 20 ? 20 : suma;
  }

  public totalForm6Sobre100(): number {
    return this.puntosForm5() + this.puntosForm51() + this.puntosForm52() + this.puntosForm53();
  }

  public calificacionFinalForm6(): number {
    return this.totalForm6Sobre100() / 5; 
  }

  public calificacion10PorcForm7(): number {
    return this.calificacionFinalForm6() * 0.10; 
  }

  // Métodos de cálculo: Conocimientos (Form 8)
  public calificacionForm8(): number {
    return this.notaExamenEscrito + this.notaExamenPractico;
  }

  public calificacion60PorcForm8(): number {
    return this.calificacionForm8() * 0.60; 
  }

  // Métodos de cálculo: Aptitudes / Exposición (Form 9 y 10)
  public totalPuntosExposicion(): number {
    const sumA = this.evaluacionAspectosJuradoA.reduce((acc, val) => acc + val, 0);
    const sumB = this.evaluacionAspectosJuradoB.reduce((acc, val) => acc + val, 0);
    const sumC = this.evaluacionAspectosJuradoC.reduce((acc, val) => acc + val, 0);
    return sumA + sumB + sumC;
  }

  public calificacionForm9(): number {
    return this.totalPuntosExposicion() / 9; 
  }

  public calificacion30PorcForm9(): number {
    return this.calificacionForm9() * 0.30; 
  }

  // Nota Definitiva y Veredicto (Filtros de corte de 15 y 16 puntos)
  public notaDefinitiva(): number {
    return this.calificacion10PorcForm7() + this.calificacion60PorcForm8() + this.calificacion30PorcForm9();
  }

  public obtenerVeredicto(): string {
    if (this.calificacionForm8() < 15) {
      return "Improbado al no alcanzar la nota minima exigida de 15 puntos en la Prueba de Conocimiento";
    }
    if (this.notaDefinitiva() < 16) {
      return "Improbado por no alcanzar la nota minima aprobatoria de 16 puntos en las pruebas";
    }
    return "Aprobado";
  }

  // Conversión a objeto plano para procesar en los servicios de red
  public toJSON() {
    return {
      tabla: this.tabla,
      cedula: this.cedula,
      nombre: this.nombre,
      puntajesForm5: this.puntajesForm5,
      puntajesForm51: this.puntajesForm51,
      puntajesForm52: this.puntajesForm52,
      puntajesForm53: this.puntajesForm53,
      notaExamenEscrito: this.notaExamenEscrito,
      notaExamenPractico: this.notaExamenPractico,
      evaluacionAspectosJuradoA: this.evaluacionAspectosJuradoA,
      evaluacionAspectosJuradoB: this.evaluacionAspectosJuradoB,
      evaluacionAspectosJuradoC: this.evaluacionAspectosJuradoC
    };
  }
}