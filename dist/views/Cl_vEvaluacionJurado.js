export default class Cl_vEvaluacionJurado {
    ui;
    inCedula;
    btBuscar;
    divFormularioNotas;
    inNombre;
    inExamenEscrito;
    inExamenPractico;
    btGuardar;
    btVolver;
    constructor() {
        this.ui = document.getElementById("evaluacionJurado");
        this.inCedula = document.getElementById("evaluacion_inCedula");
        this.btBuscar = document.getElementById("evaluacion_btBuscar");
        this.divFormularioNotas = document.getElementById("evaluacion_divFormularioNotas");
        this.inNombre = document.getElementById("registro_inNombre");
        this.inExamenEscrito = document.getElementById("evaluacion_inExamenEscrito");
        this.inExamenPractico = document.getElementById("evaluacion_inExamenPractico");
        this.btGuardar = document.getElementById("evaluacion_btGuardar");
        this.btVolver = document.getElementById("evaluacion_btVolver");
    }
    get cedula() {
        return parseInt(this.inCedula.value.trim()) || 0;
    }
    get nombre() {
        return this.inNombre.value.trim();
    }
    get puntajesForm5() {
        return [
            parseFloat(document.getElementById("f5_in1")?.value) || 0,
            parseFloat(document.getElementById("f5_in2")?.value) || 0,
            parseFloat(document.getElementById("f5_in3")?.value) || 0,
            parseFloat(document.getElementById("f5_in4")?.value) || 0
        ];
    }
    get puntajesForm51() {
        return [
            parseFloat(document.getElementById("f51_in1")?.value) || 0,
            parseFloat(document.getElementById("f51_in2")?.value) || 0,
            parseFloat(document.getElementById("f51_in3")?.value) || 0,
            parseFloat(document.getElementById("f51_in4")?.value) || 0,
            parseFloat(document.getElementById("f51_in5")?.value) || 0,
            parseFloat(document.getElementById("f51_in6")?.value) || 0,
            parseFloat(document.getElementById("f51_in7")?.value) || 0
        ];
    }
    get puntajesForm52() {
        return [
            parseFloat(document.getElementById("f52_in1")?.value) || 0,
            parseFloat(document.getElementById("f52_in2")?.value) || 0,
            parseFloat(document.getElementById("f52_in3")?.value) || 0,
            parseFloat(document.getElementById("f52_in4")?.value) || 0,
            parseFloat(document.getElementById("f52_in5")?.value) || 0,
            parseFloat(document.getElementById("f52_in6")?.value) || 0,
            parseFloat(document.getElementById("f52_in7")?.value) || 0,
            parseFloat(document.getElementById("f52_in8")?.value) || 0,
            parseFloat(document.getElementById("f52_in9")?.value) || 0
        ];
    }
    get puntajesForm53() {
        return [
            parseFloat(document.getElementById("f53_in1")?.value) || 0,
            parseFloat(document.getElementById("f53_in2")?.value) || 0,
            parseFloat(document.getElementById("f53_in3")?.value) || 0,
            parseFloat(document.getElementById("f53_in4")?.value) || 0,
            parseFloat(document.getElementById("f53_in5")?.value) || 0,
            parseFloat(document.getElementById("f53_in6")?.value) || 0,
            parseFloat(document.getElementById("f53_in7")?.value) || 0,
            parseFloat(document.getElementById("f53_in8")?.value) || 0
        ];
    }
    get notaExamenEscrito() {
        return parseFloat(this.inExamenEscrito.value) || 0;
    }
    get notaExamenPractico() {
        return parseFloat(this.inExamenPractico.value) || 0;
    }
    get evaluacionAspectosJuradoA() {
        const arreglo = [];
        for (let i = 1; i <= 12; i++) {
            const input = document.getElementById(`ja_in${i}`);
            arreglo.push(parseFloat(input.value) || 0);
        }
        return arreglo;
    }
    get evaluacionAspectosJuradoB() {
        const arreglo = [];
        for (let i = 1; i <= 12; i++) {
            const input = document.getElementById(`jb_in${i}`);
            arreglo.push(parseFloat(input.value) || 0);
        }
        return arreglo;
    }
    get evaluacionAspectosJuradoC() {
        const arreglo = [];
        for (let i = 1; i <= 12; i++) {
            const input = document.getElementById(`jc_in${i}`);
            arreglo.push(parseFloat(input.value) || 0);
        }
        return arreglo;
    }
    onBuscar(callback) {
        this.btBuscar.onclick = () => callback();
    }
    onGuardarEvaluacion(callback) {
        this.btGuardar.onclick = () => callback();
    }
    onVolver(callback) {
        this.btVolver.onclick = () => callback();
    }
    mostrar() {
        this.ui.removeAttribute("hidden");
        this.divFormularioNotas.setAttribute("hidden", "true");
    }
    ocultar() {
        this.ui.setAttribute("hidden", "true");
    }
    activarFormularioEvaluacion(bloquearNombre) {
        this.divFormularioNotas.removeAttribute("hidden");
        if (bloquearNombre) {
            this.inNombre.setAttribute("readonly", "true");
        }
        else {
            this.inNombre.removeAttribute("readonly");
        }
    }
    poblarCampos(datos) {
        this.inNombre.value = datos.nombre || "";
        this.inExamenEscrito.value = datos.notaExamenEscrito !== 0 ? datos.notaExamenEscrito.toString() : "";
        this.inExamenPractico.value = datos.notaExamenPractico !== 0 ? datos.notaExamenPractico.toString() : "";
        for (let i = 1; i <= 4; i++) {
            const el = document.getElementById(`f5_in${i}`);
            if (el)
                el.value = datos.puntajesForm5?.[i - 1] !== 0 ? datos.puntajesForm5?.[i - 1].toString() : "";
        }
        for (let i = 1; i <= 7; i++) {
            const el = document.getElementById(`f51_in${i}`);
            if (el)
                el.value = datos.puntajesForm51?.[i - 1] !== 0 ? datos.puntajesForm51?.[i - 1].toString() : "";
        }
        for (let i = 1; i <= 9; i++) {
            const el = document.getElementById(`f52_in${i}`);
            if (el)
                el.value = datos.puntajesForm52?.[i - 1] !== 0 ? datos.puntajesForm52?.[i - 1].toString() : "";
        }
        for (let i = 1; i <= 8; i++) {
            const el = document.getElementById(`f53_in${i}`);
            if (el)
                el.value = datos.puntajesForm53?.[i - 1] !== 0 ? datos.puntajesForm53?.[i - 1].toString() : "";
        }
        for (let i = 1; i <= 12; i++) {
            const elA = document.getElementById(`ja_in${i}`);
            const elB = document.getElementById(`jb_in${i}`);
            const elC = document.getElementById(`jc_in${i}`);
            if (elA)
                elA.value = datos.evaluacionAspectosJuradoA?.[i - 1] !== 0 ? datos.evaluacionAspectosJuradoA?.[i - 1].toString() : "";
            if (elB)
                elB.value = datos.evaluacionAspectosJuradoB?.[i - 1] !== 0 ? datos.evaluacionAspectosJuradoB?.[i - 1].toString() : "";
            if (elC)
                elC.value = datos.evaluacionAspectosJuradoC?.[i - 1] !== 0 ? datos.evaluacionAspectosJuradoC?.[i - 1].toString() : "";
        }
    }
    limpiarInputs() {
        this.inCedula.value = "";
        this.inNombre.value = "";
        this.inExamenEscrito.value = "";
        this.inExamenPractico.value = "";
        const todosLosInputsDeNotas = this.divFormularioNotas.querySelectorAll("input[type='number']");
        todosLosInputsDeNotas.forEach((input) => {
            input.value = "";
        });
        this.divFormularioNotas.setAttribute("hidden", "true");
    }
}
//# sourceMappingURL=Cl_vEvaluacionJurado.js.map