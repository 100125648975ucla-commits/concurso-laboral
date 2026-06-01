export default class Cl_vTableroDirectiva {
    ui;
    tblRegistros;
    cardGanador;
    btRecargar;
    btVolver;
    constructor() {
        this.ui = document.getElementById("tableroDirectiva");
        this.tblRegistros = document.getElementById("tablero_tblRegistros");
        this.cardGanador = document.getElementById("tablero_cardGanador");
        this.btRecargar = document.getElementById("tablero_btRecargar");
        this.btVolver = document.getElementById("tablero_btVolver");
    }
    onRecargar(callback) {
        this.btRecargar.onclick = () => callback();
    }
    onVolver(callback) {
        this.btVolver.onclick = () => callback();
    }
    /**
     * Renderiza el reporte tratando cada columna en su escala base y calculando la ponderación global
     */
    mostrarResultados(aspirantes) {
        this.tblRegistros.innerHTML = "";
        if (aspirantes.length === 0) {
            this.tblRegistros.innerHTML = `<tr>
        <td colspan="7" class="text-center text-muted py-3">No hay postulantes registrados en el sistema.</td>
      </tr>`;
            return;
        }
        aspirantes.forEach((aspirante) => {
            const veredictoBase = aspirante.obtenerVeredicto();
            // ========================================================
            // 1. ESCALAS VISIBLES EN LAS COLUMNAS PARCIALES (BRUTAS)
            // ========================================================
            // Columna Credenciales: Los 100 puntos del baremo de RRHH
            const notaCredencialesSobre100 = aspirante.totalForm6Sobre100();
            // Columna Conocimientos: Suma directa de Examen Escrito + Práctico (Máximo 40 pts)
            const notaConocimientosSobre40 = aspirante.calificacionForm8();
            // Columna Aptitudes: Puntos base de exposición de los 3 jurados (Máximo 180 pts)
            const notaAptitudesSobre180 = aspirante.totalPuntosExposicion();
            // ========================================================
            // 2. CÁLCULO DE PESOS PORCENTUALES REALES (PARA EL 100%)
            // ========================================================
            // El currículum se reduce a una escala sobre 10 para aportar al 10% (Máx 10 pts)
            const pesoCredenciales10 = notaCredencialesSobre100 / 10;
            // Calculamos el peso de los exámenes sobre los 40 puntos para llevarlos al 60% (Máx 60 pts)
            const pesoConocimientos60 = (notaConocimientosSobre40 / 40) * 60;
            // Calculamos el peso de la exposición sobre los 180 puntos para llevarlos al 30% (Máx 30 pts)
            const pesoAptitudes30 = (notaAptitudesSobre180 / 180) * 30;
            // NOTA DEFINITIVA (100%): Suma directa y exacta de los tres pesos parciales (Máximo 100 pts)
            const notaDefinitiva100 = pesoCredenciales10 + pesoConocimientos60 + pesoAptitudes30;
            // VEREDICTO FINAL: Convertimos linealmente esos 100 puntos máximos a la escala de 20 puntos
            const notaEscala20 = (notaDefinitiva100 / 100) * 20;
            // ========================================================
            // 3. CONFIGURACIÓN VISUAL DEL VEREDICTO
            // ========================================================
            let veredictoFinalHTML = "";
            let claseColor = "";
            if (veredictoBase === "Aprobado") {
                claseColor = "text-success fw-bold";
                veredictoFinalHTML = `Aprobado (${notaEscala20.toFixed(2)} / 20 pts)`;
            }
            else {
                claseColor = "text-danger text-opacity-75 small";
                veredictoFinalHTML = veredictoBase;
            }
            // Inyectamos las filas respetando la homogeneidad de los formatos
            this.tblRegistros.innerHTML += `
        <tr>
          <td class="fw-semibold">${aspirante.cedula}</td>
          <td class="text-start">${aspirante.nombre}</td>
          <td>${notaCredencialesSobre100.toFixed(2)} / 100 pts</td>
          <td>${notaConocimientosSobre40.toFixed(2)} / 40 pts</td>
          <td>${notaAptitudesSobre180.toFixed(2)} / 180 pts</td>
          <td class="text-primary fw-bold">${notaDefinitiva100.toFixed(2)} pts</td>
          <td class="${claseColor}">${veredictoFinalHTML}</td>
        </tr>
      `;
        });
    }
    /**
     * Renderiza los datos de la persona ganadora (Únicamente Nombre y Cédula)
     */
    mostrarGanador(ganador) {
        if (ganador === null) {
            this.cardGanador.innerHTML = `
        <div class="alert alert-warning border-warning shadow-sm text-center mb-0" role="alert">
          <h4 class="alert-heading fw-bold">⚠️ Concurso Declarado Desierto</h4>
          <p class="mb-0 small text-dark">Ningún participante logró superar las notas mínimas de corte institucionales.</p>
        </div>
      `;
            return;
        }
        this.cardGanador.innerHTML = `
      <div class="card border-success border-2 shadow-sm text-center bg-white" style="margin-bottom: 20px; border: 2px solid #198754; border-radius: .375rem; background-color: #fff;">
        <div class="card-header bg-success text-white fw-bold py-2" style="background-color: #198754; color: #fff; padding: 8px; font-weight: bold;">
          🏆 GANADOR SELECCIONADO
        </div>
        <div class="card-body py-3" style="padding: 16px;">
          <h3 class="card-title text-success fw-bold h4 mb-1" style="color: #198754; font-weight: bold; margin-bottom: 4px;">${ganador.nombre}</h3>
          <p class="card-text text-muted small mb-0" style="color: #6c757d; font-size: .875em; margin-bottom: 0;">Cédula Identidad: <span class="fw-semibold text-dark" style="color: #212529; font-weight: 600;">${ganador.cedula}</span></p>
        </div>
      </div>
    `;
    }
    mostrar() {
        this.ui.removeAttribute("hidden");
    }
    ocultar() {
        this.ui.setAttribute("hidden", "true");
    }
}
//# sourceMappingURL=Cl_vTableroDirectiva.js.map