export default class Cl_mAspirante {
  private tabla: string = "aspirantes"; 
  private _cedula: number = 0;
  private _nombre: string = "";
  
  private _puntajesForm5: number[] = [0, 0, 0, 0];       
  private _puntajesForm51: number[] = [0, 0, 0, 0, 0, 0, 0]; 
  private _puntajesForm52: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  private _puntajesForm53: number[] = [0, 0, 0, 0, 0, 0, 0, 0]; 

  private _notaExamenEscrito: number = 0;
  private _notaExamenPractico: number = 0;

  private _evaluacionAspectosJuradoA: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  private _evaluacionAspectosJuradoB: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  private _evaluacionAspectosJuradoC: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 

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

  // ========================================================
  // IMPLEMENTACIÓN DE MÉTODOS DEL DIAGRAMA UML
  // ========================================================

  public puntosForm5(): number {
    const bold = this.puntajesForm5.reduce((acc, nota) => acc + nota, 0);
    return bold > 35 ? 35 : bold;
  }

  public puntosForm51(): number {
    const bold = this.puntajesForm51.reduce((acc, nota) => acc + nota, 0);
    return bold > 30 ? 30 : bold;
  }

  public puntosForm52(): number {
    const bold = this.puntajesForm52.reduce((acc, nota) => acc + nota, 0);
    return bold > 15 ? 15 : bold;
  }

  public puntosForm53(): number {
    const bold = this.puntajesForm53.reduce((acc, nota) => acc + nota, 0);
    return bold > 20 ? 20 : bold;
  }

  public totalForm6Sobre100(): number {
    return this.puntosForm5() + this.puntosForm51() + this.puntosForm52() + this.puntosForm53();
  }

  public calificacionFinalForm6(): number {
    return this.totalForm6Sobre100() / 5; 
  }

  /**
   * Ponderación de Credenciales (10%): Aporta un rango de 0 a 10 puntos reales directos
   */
  public calificacion10PorcForm7(): number {
    return this.totalForm6Sobre100() * 0.10; 
  }

  public calificacionForm8(): number {
    return this.notaExamenEscrito + this.notaExamenPractico;
  }

  /**
   * Ponderación de Conocimientos (60%): Aporta un rango de 0 a 60 puntos reales directos
   */
  public calificacion60PorcForm8(): number {
    return (this.calificacionForm8() / 40) * 60; 
  }

  public totalPuntosExposicion(): number {
    const sumA = this.evaluacionAspectosJuradoA.reduce((acc, val) => acc + val, 0);
    const sumB = this.evaluacionAspectosJuradoB.reduce((acc, val) => acc + val, 0);
    const sumC = this.evaluacionAspectosJuradoC.reduce((acc, val) => acc + val, 0);
    return sumA + sumB + sumC;
  }

  public calificacionForm9(): number {
    return this.totalPuntosExposicion() / 9; 
  }

  /**
   * Ponderación de Aptitudes (30%): Aporta un rango de 0 a 30 puntos reales directos
   */
  public calificacion30PorcForm9(): number {
    return (this.totalPuntosExposicion() / 180) * 30; 
  }

  /**
   * NOTA DEFINITIVA (100%): Suma directa de las ponderaciones limpias (Rango exacto de 0 a 100 pts)
   */
  public notaDefinitiva(): number {
    return this.calificacion10PorcForm7() + this.calificacion60PorcForm8() + this.calificacion30PorcForm9();
  }

  /**
   * Dictamina las decisiones de corte institucionales
   */
  public obtenerVeredicto(): string {
    // Filtro Técnico: Exclusivo de Conocimientos (Menos de 15 pts brutos en exámenes de 40)
    if (this.calificacionForm8() < 15) {
      return "Improbado en Conocimiento";
    }
    // Filtro Global: La nota definitiva sobre 100 reducida a la escala de 20 debe ser menor a 16
    const notaEscala20 = (this.notaDefinitiva() / 100) * 20;
    if (notaEscala20 < 16) {
      return "Improbado por Nota Mínima";
    }
    return "Aprobado";
  }

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