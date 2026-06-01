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
            // NOTA DEFINITIVA (100%): Suma directa y limpia de los tres pesos parciales (Tope máximo de 100 pts exactos)
            const notaDefinitiva100 = pesoCredenciales10 + pesoConocimientos60 + pesoAptitudes30;
            // VEREDICTO FINAL: Convertimos linealmente esos 100 puntos máximos a la escala de 20 puntos
            const notaEscala20 = (notaDefinitiva100 / 100) * 20;
            // ========================================================
            // 3. CONFIGURACIÓN VISUAL DEL VEREDICTO CON SU NOTA ASOCIADA
            // ========================================================
            let veredictoFinalHTML = "";
            let claseColor = "";
            if (veredictoBase === "Aprobado") {
                claseColor = "text-success fw-bold";
                veredictoFinalHTML = `Aprobado (${notaEscala20.toFixed(2)} / 20 pts)`;
            }
            else if (veredictoBase === "Improbado por Nota Mínima") {
                claseColor = "text-danger fw-bold";
                veredictoFinalHTML = `Improbado por Nota Mínima (${notaEscala20.toFixed(2)} / 20 pts)`;
            }
            else {
                // Captura el caso de "Improbado en Conocimiento" (Filtro de la nota menor a 15 en examen)
                claseColor = "text-danger text-opacity-75 small fw-bold";
                veredictoFinalHTML = veredictoBase;
            }
            // Inyectamos la fila con los formatos de límites dinámicos aplicados
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
     * Renderiza los datos de la persona ganadora de forma limpia y minimalista
     */
    mostrarGanador(ganador) {
        if (ganador === null) {
            this.cardGanador.innerHTML = `
        <div style="padding: 15px; background-color: #fff3cd; color: #664d03; border: 1px solid #ffecb5; border-radius: 4px; text-align: center; margin-bottom: 20px;">
          <strong style="font-size: 1.1em; display: block; margin-bottom: 4px;">⚠️ Concurso Declarado Desierto</strong>
          <span style="font-size: 0.9em;">Ningún participante logró superar las notas mínimas de corte institucionales.</span>
        </div>
      `;
            return;
        }
        // Caja minimalista plana adaptada al CSS nativo sin Bootstrap pesado
        this.cardGanador.innerHTML = `
      <div style="padding: 15px; background-color: #f8f9fa; border-left: 5px solid #198754; border-top: 1px solid #dee2e6; border-right: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6; border-radius: 4px; margin-bottom: 25px; text-align: left;">
        <span style="color: #198754; font-size: 0.85em; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">
          🏆 Postulante Seleccionado (Ganador único)
        </span>
        <h3 style="margin: 0 0 5px 0; color: #212529; font-size: 1.4em; font-weight: bold;">
          ${ganador.nombre}
        </h3>
        <p style="margin: 0; color: #6c757d; font-size: 0.9em;">
          Cédula de Identidad: <strong style="color: #212529;">${ganador.cedula}</strong>
        </p>
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