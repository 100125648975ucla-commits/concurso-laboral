export default class Cl_mAspirante {
    // Identificador interno para el recurso en MockAPI
    tabla = "aspirantes";
    _cedula = 0;
    _nombre = "";
    // Arreglos privados de Credenciales (Datos del Currículum)
    _puntajesForm5 = [0, 0, 0, 0]; // Postgrado (4 aspectos)
    _puntajesForm51 = [0, 0, 0, 0, 0, 0, 0]; // Pregrado (7 aspectos)
    _puntajesForm52 = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Prod. Científica (9 aspectos)
    _puntajesForm53 = [0, 0, 0, 0, 0, 0, 0, 0]; // Experiencia (8 aspectos)
    // Bloque de Conocimientos (Exámenes)
    _notaExamenEscrito = 0;
    _notaExamenPractico = 0;
    // Arreglos de Aptitudes (Evaluación de los 3 Jurados)
    _evaluacionAspectosJuradoA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 aspectos
    _evaluacionAspectosJuradoB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 aspectos
    _evaluacionAspectosJuradoC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 aspectos
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
    puntosForm5() {
        const suma = this.puntajesForm5.reduce((acc, nota) => acc + nota, 0);
        return suma > 35 ? 35 : suma;
    }
    puntosForm51() {
        const suma = this.puntajesForm51.reduce((acc, nota) => acc + nota, 0);
        return suma > 30 ? 30 : suma;
    }
    puntosForm52() {
        const suma = this.puntajesForm52.reduce((acc, nota) => acc + nota, 0);
        return suma > 15 ? 15 : suma;
    }
    puntosForm53() {
        const suma = this.puntajesForm53.reduce((acc, nota) => acc + nota, 0);
        return suma > 20 ? 20 : suma;
    }
    totalForm6Sobre100() {
        return this.puntosForm5() + this.puntosForm51() + this.puntosForm52() + this.puntosForm53();
    }
    calificacionFinalForm6() {
        return this.totalForm6Sobre100() / 5;
    }
    calificacion10PorcForm7() {
        return this.calificacionFinalForm6() * 0.10;
    }
    // Métodos de cálculo: Conocimientos (Form 8)
    calificacionForm8() {
        return this.notaExamenEscrito + this.notaExamenPractico;
    }
    calificacion60PorcForm8() {
        return this.calificacionForm8() * 0.60;
    }
    // Métodos de cálculo: Aptitudes / Exposición (Form 9 y 10)
    totalPuntosExposicion() {
        const sumA = this.evaluacionAspectosJuradoA.reduce((acc, val) => acc + val, 0);
        const sumB = this.evaluacionAspectosJuradoB.reduce((acc, val) => acc + val, 0);
        const sumC = this.evaluacionAspectosJuradoC.reduce((acc, val) => acc + val, 0);
        return sumA + sumB + sumC;
    }
    calificacionForm9() {
        return this.totalPuntosExposicion() / 9;
    }
    calificacion30PorcForm9() {
        return this.calificacionForm9() * 0.30;
    }
    // Nota Definitiva y Veredicto (Filtros de corte de 15 y 16 puntos)
    notaDefinitiva() {
        return this.calificacion10PorcForm7() + this.calificacion60PorcForm8() + this.calificacion30PorcForm9();
    }
    obtenerVeredicto() {
        if (this.calificacionForm8() < 15) {
            return "Improbado en Conocimiento";
        }
        if (this.notaDefinitiva() < 16) {
            return "Improbado por nota minima ";
        }
        return "Aprobado";
    }
    // Conversión a objeto plano para procesar en los servicios de red
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