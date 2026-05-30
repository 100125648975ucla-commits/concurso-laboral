export default class Cl_vTableroDirectiva {
    ui;
    tblRegistros;
    cardGanador;
    btRecargar;
    btVolver;
    constructor() {
        this.ui = document.getElementById("tableroDirectiva");
        // Cuerpo de la tabla donde se pintarán los candidatos
        this.tblRegistros = document.getElementById("tablero_tblRegistros");
        // Contenedor visual (Card) para el ganador
        this.cardGanador = document.getElementById("tablero_cardGanador");
        // Botones de control
        this.btRecargar = document.getElementById("tablero_btRecargar");
        this.btVolver = document.getElementById("tablero_btVolver");
    }
    onRecargar(callback) {
        this.btRecargar.onclick = () => callback();
    }
    onVolver(callback) {
        this.btVolver.onclick = () => callback();
    }
    mostrarResultados(aspirantes) {
        this.tblRegistros.innerHTML = "";
        if (aspirantes.length === 0) {
            this.tblRegistros.innerHTML = `<tr>
        <td colspan="5" class="text-center text-muted py-3">No hay postulantes registrados en el sistema.</td>
      </tr>`;
            return;
        }
        aspirantes.forEach((aspirante) => {
            const veredicto = aspirante.obtenerVeredicto();
            // Si está aprobado usamos texto verde, si no, texto rojo de alerta
            const claseColor = veredicto === "Aprobado" ? "text-success fw-bold" : "text-danger text-opacity-75";
            this.tblRegistros.innerHTML += `
        <tr>
          <td class="fw-semibold">${aspirante.cedula}</td>
          <td>${aspirante.nombre}</td>
          <td>${aspirante.calificacionForm8().toFixed(2)} pts</td>
          <td class="text-primary fw-bold">${aspirante.notaDefinitiva().toFixed(2)} pts</td>
          <td class="${claseColor}">${veredicto}</td>
        </tr>
      `;
        });
    }
    /**
     * Renderiza los datos del ganador o muestra una alerta si el concurso quedó desierto
     */
    mostrarGanador(ganador) {
        if (ganador === null) {
            this.cardGanador.innerHTML = `
        <div class="alert alert-warning border-warning shadow-sm text-center mb-0" role="alert">
          <h4 class="alert-heading fw-bold">⚠️ Concurso Declarado Desierto</h4>
          <p class="mb-0 small text-dark">Ningún participante logró superar las notas mínimas de corte institucionales (Conocimiento $\\ge$ 15 pts y Nota Definitiva $\\ge$ 16 pts).</p>
        </div>
      `;
            return;
        }
        // Si hay un ganador, pintamos una tarjeta dorada de éxito
        this.cardGanador.innerHTML = `
      <div class="card border-success border-2 shadow-sm text-center bg-white">
        <div class="card-header bg-success text-white fw-bold py-2">
          🏆 GANADOR SELECCIONADO
        </div>
        <div class="card-body py-3">
          <h3 class="card-title text-success fw-bold h4 mb-1">${ganador.nombre}</h3>
          <p class="card-text text-muted small mb-2">Cédula Identidad: <span class="fw-semibold text-dark">${ganador.cedula}</span></p>
          <div class="d-inline-block bg-light px-3 py-1 rounded border border-success border-opacity-25 mb-0">
            <span class="small text-muted">Calificación Máxima Definitiva:</span>
            <strong class="text-success h5 d-block mb-0">${ganador.notaDefinitiva().toFixed(2)} / 20 pts</strong>
          </div>
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