export default class Cl_mAspirante {
    tabla = "aspirantes";
    _cedula = 0;
    _nombre = "";
    _puntajesForm5 = [0, 0, 0, 0];
    _puntajesForm51 = [0, 0, 0, 0, 0, 0, 0];
    _puntajesForm52 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    _puntajesForm53 = [0, 0, 0, 0, 0, 0, 0, 0];
    _notaExamenEscrito = 0;
    _notaExamenPractico = 0;
    _evaluacionAspectosJuradoA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _evaluacionAspectosJuradoB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _evaluacionAspectosJuradoC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    constructor({ cedula, nombre, puntajesForm5 = [0, 0, 0, 0], puntajesForm51 = [0, 0, 0, 0, 0, 0, 0], puntajesForm52 = [0, 0, 0, 0, 0, 0, 0, 0, 0], puntajesForm53 = [0, 0, 0, 0, 0, 0, 0, 0], notaExamenEscrito = 0, notaExamenPractico = 0, evaluacionAspectosJuradoA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], evaluacionAspectosJuradoB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], evaluacionAspectosJuradoC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], }) {
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
    get cedula() { return this._cedula; }
    set cedula(value) { this._cedula = +value; }
    get nombre() { return this._nombre; }
    set nombre(value) { this._nombre = value.trim(); }
    get puntajesForm5() { return this._puntajesForm5; }
    set puntajesForm5(v) { this._puntajesForm5 = v; }
    get puntajesForm51() { return this._puntajesForm51; }
    set puntajesForm51(v) { this._puntajesForm51 = v; }
    get puntajesForm52() { return this._puntajesForm52; }
    set puntajesForm52(v) { this._puntajesForm52 = v; }
    get puntajesForm53() { return this._puntajesForm53; }
    set puntajesForm53(v) { this._puntajesForm53 = v; }
    get notaExamenEscrito() { return this._notaExamenEscrito; }
    set notaExamenEscrito(v) { this._notaExamenEscrito = +v; }
    get notaExamenPractico() { return this._notaExamenPractico; }
    set notaExamenPractico(v) { this._notaExamenPractico = +v; }
    get evaluacionAspectosJuradoA() { return this._evaluacionAspectosJuradoA; }
    set evaluacionAspectosJuradoA(v) { this._evaluacionAspectosJuradoA = v; }
    get evaluacionAspectosJuradoB() { return this._evaluacionAspectosJuradoB; }
    set evaluacionAspectosJuradoB(v) { this._evaluacionAspectosJuradoB = v; }
    get evaluacionAspectosJuradoC() { return this._evaluacionAspectosJuradoC; }
    set evaluacionAspectosJuradoC(v) { this._evaluacionAspectosJuradoC = v; }
    // ========================================================
    // IMPLEMENTACIÓN DE MÉTODOS DEL DIAGRAMA UML
    // ========================================================
    puntosForm5() {
        const bold = this.puntajesForm5.reduce((acc, nota) => acc + nota, 0);
        return bold > 35 ? 35 : bold;
    }
    puntosForm51() {
        const bold = this.puntajesForm51.reduce((acc, nota) => acc + nota, 0);
        return bold > 30 ? 30 : bold;
    }
    puntosForm52() {
        const bold = this.puntajesForm52.reduce((acc, nota) => acc + nota, 0);
        return bold > 15 ? 15 : bold;
    }
    puntosForm53() {
        const bold = this.puntajesForm53.reduce((acc, nota) => acc + nota, 0);
        return bold > 20 ? 20 : bold;
    }
    totalForm6Sobre100() {
        return this.puntosForm5() + this.puntosForm51() + this.puntosForm52() + this.puntosForm53();
    }
    calificacionFinalForm6() {
        return this.totalForm6Sobre100() / 5;
    }
    /**
     * Ponderación de Credenciales (10%): Aporta un rango de 0 a 10 puntos reales directos
     */
    calificacion10PorcForm7() {
        return this.totalForm6Sobre100() * 0.10;
    }
    calificacionForm8() {
        return this.notaExamenEscrito + this.notaExamenPractico;
    }
    /**
     * Ponderación de Conocimientos (60%): Aporta un rango de 0 a 60 puntos reales directos
     */
    calificacion60PorcForm8() {
        return (this.calificacionForm8() / 40) * 60;
    }
    totalPuntosExposicion() {
        const sumA = this.evaluacionAspectosJuradoA.reduce((acc, val) => acc + val, 0);
        const sumB = this.evaluacionAspectosJuradoB.reduce((acc, val) => acc + val, 0);
        const sumC = this.evaluacionAspectosJuradoC.reduce((acc, val) => acc + val, 0);
        return sumA + sumB + sumC;
    }
    calificacionForm9() {
        return this.totalPuntosExposicion() / 9;
    }
    /**
     * Ponderación de Aptitudes (30%): Aporta un rango de 0 a 30 puntos reales directos
     */
    calificacion30PorcForm9() {
        return (this.totalPuntosExposicion() / 180) * 30;
    }
    /**
     * NOTA DEFINITIVA (100%): Suma directa de las ponderaciones limpias (Rango exacto de 0 a 100 pts)
     */
    notaDefinitiva() {
        return this.calificacion10PorcForm7() + this.calificacion60PorcForm8() + this.calificacion30PorcForm9();
    }
    /**
     * Dictamina las decisiones de corte institucionales
     */
    obtenerVeredicto() {
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
    toJSON() {
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
//# sourceMappingURL=Cl_mAspirante.js.map