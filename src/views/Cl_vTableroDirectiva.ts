import I_vTableroDirectiva from "../interfaces/I_vTableroDirectiva.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

declare var bootstrap: any;

export default class Cl_vTableroDirectiva implements I_vTableroDirectiva {
  private ui: HTMLElement;
  private tblRegistros: HTMLTableSectionElement;
  private cardGanador: HTMLDivElement;
  private btRecargar: HTMLButtonElement;
  private btVolver: HTMLButtonElement;
  private memoriaAspirantes: Cl_mAspirante[] = [];

  constructor() {
    this.ui = document.getElementById("tableroDirectiva") as HTMLElement;
    this.tblRegistros = document.getElementById("tablero_tblRegistros") as HTMLTableSectionElement;
    this.cardGanador = document.getElementById("tablero_cardGanador") as HTMLDivElement;
    this.btRecargar = document.getElementById("tablero_btRecargar") as HTMLButtonElement;
    this.btVolver = document.getElementById("tablero_btVolver") as HTMLButtonElement;
  }

  public onRecargar(callback: () => void): void {
    this.btRecargar.onclick = () => callback();
  }

  public onVolver(callback: () => void): void {
    this.btVolver.onclick = () => callback();
  }

  public mostrarResultados(aspirantes: Cl_mAspirante[]): void {
    this.tblRegistros.innerHTML = "";
    this.memoriaAspirantes = aspirantes;

    if (aspirantes.length === 0) {
      this.tblRegistros.innerHTML = `<tr>
        <td colspan="3" class="text-center text-muted py-3">No hay postulantes registrados en el sistema.</td>
      </tr>`;
      return;
    }

    aspirantes.forEach((aspirante, index) => {
      const nota100 = aspirante.notaDefinitiva(); 
      const veredicto = aspirante.obtenerVeredicto();
  
      let badgeHtml = "";
      
      if (veredicto === "Aprobado") {
        badgeHtml = `<span class="badge bg-success-subtle text-success fw-bold ms-2" style="font-size:0.7rem; padding: 4px 8px;">Aprobado</span>`;
      } else if (veredicto === "Improbado por Nota Mínima") {
        badgeHtml = `<span class="badge bg-danger-subtle text-danger fw-bold ms-2" style="font-size:0.7rem; padding: 4px 8px;">Nota Mínima</span>`;
      } else if (veredicto === "Improbado en Conocimiento") {
        badgeHtml = `<span class="badge bg-warning-subtle text-warning-emphasis fw-bold ms-2" style="font-size:0.7rem; padding: 4px 8px;">Prueba Técnica</span>`;
      }
      
      this.tblRegistros.innerHTML += `
        <tr class="fila-click" data-idx="${index}" style="cursor: pointer;">
          <td class="fw-semibold text-secondary">${aspirante.cedula}</td>
          <td class="text-start ps-3 fw-medium text-dark">${aspirante.nombre}</td>
          <td class="text-end pe-3">
            <span class="text-primary fw-bold">${nota100.toFixed(2)} pts</span>
            ${badgeHtml}
          </td>
        </tr>
      `;
    });

    document.querySelectorAll(".fila-click").forEach(fila => {
      fila.addEventListener("click", (e) => {
        const index = parseInt((e.currentTarget as HTMLTableRowElement).getAttribute("data-idx") || "0");
        this.desplegarModalAuditoria(this.memoriaAspirantes[index]);
      });
    });
  }

  private desplegarModalAuditoria(asp: Cl_mAspirante): void {
    const cuerpo = document.getElementById("modalAuditoria_contenido");
    if (!cuerpo) return;

    const nota20 = (asp.notaDefinitiva() / 100) * 20;

    cuerpo.innerHTML = `
      <div class="p-1">
        <p class="mb-1"><strong>Candidato:</strong> ${asp.nombre}</p>
        <p class="mb-2"><strong>Cédula de Identidad:</strong> ${asp.cedula}</p>
        <p class="mb-3"><strong>Veredicto Institucional:</strong> <span class="fw-bold text-uppercase text-primary">${asp.obtenerVeredicto()}</span></p>
        <hr class="my-2">
        
        <p class="fw-bold text-uppercase mb-1 text-dark" style="font-size:0.75rem;">Formato N° CO-6: Valoración de Credenciales</p>
        <ul class="mb-2 text-muted" style="padding-left: 20px;">
          <li>Formato CO-5 (Postgrados): ${asp.puntosForm5()} pts</li>
          <li>Formato CO-5.1 (Pregrados): ${asp.puntosForm51()} pts</li>
          <li>Formato CO-5.2 (Producción Científica): ${asp.puntosForm52()} pts</li>
          <li>Formato CO-5.3 (Méritos y Experiencia): ${asp.puntosForm53()} pts</li>
        </ul>
        <p class="mb-3 fw-semibold">Ponderación Calculada (10%): ${asp.calificacion10PorcForm7().toFixed(2)} pts</p>

        <p class="fw-bold text-uppercase mb-1 text-dark" style="font-size:0.75rem;">Formato N° CO-8: Prueba de Conocimientos</p>
        <ul class="mb-2 text-muted" style="padding-left: 20px;">
          <li>Nota Examen Escrito (0-20): ${asp.notaExamenEscrito} pts</li>
          <li>Nota Examen Oral / Práctico (0-20): ${asp.notaExamenPractico} pts</li>
        </ul>
        <p class="mb-3 fw-semibold">Ponderación Calculada (60%): ${asp.calificacion60PorcForm8().toFixed(2)} pts</p>

        <p class="fw-bold text-uppercase mb-1 text-dark" style="font-size:0.75rem;">Formato N° CO-10: Matriz de Aptitudes</p>
        <p class="mb-1 text-muted" style="padding-left: 5px;">Puntaje Acumulado Total de Jurados: ${asp.totalPuntosExposicion()} / 180 pts</p>
        <p class="mb-3 fw-semibold">Ponderación Calculada (30%): ${asp.calificacion30PorcForm9().toFixed(2)} pts</p>
        
        <hr class="my-2">
        <h6 class="fw-bold text-center text-uppercase bg-dark text-white p-2 mb-0" style="font-size:0.9rem; border-radius:4px;">Nota Final (100%): ${asp.notaDefinitiva().toFixed(2)} pts (${nota20.toFixed(2)} / 20 pts)</h6>
      </div>
    `;

    const modalInstancia = new bootstrap.Modal(document.getElementById("modalAuditoria"));
    modalInstancia.show();
  }

  public mostrarGanador(ganador: Cl_mAspirante | null): void {
    if (ganador === null) {
      this.cardGanador.innerHTML = `
        <div style="padding: 15px; background-color: #fff3cd; color: #664d03; border: 1px solid #ffecb5; border-radius: 12px; text-align: center; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
          <strong style="font-size: 1.05em; display: block; margin-bottom: 4px;"><i class="bi bi-exclamation-triangle-fill me-2"></i>Concurso Declarado Desierto</strong>
          <span style="font-size: 0.88em;">Ningún participante logró superar las notas mínimas de corte institucionales.</span>
        </div>
      `;
      return;
    }

    this.cardGanador.innerHTML = `
      <div style="padding: 16px; background-color: #ffffff; border-left: 5px solid #198754; box-shadow: 0 6px 20px rgba(11, 37, 69, 0.05); border-radius: 12px; margin-bottom: 20px; text-align: left;">
        <span style="color: #198754; font-size: 0.8em; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
          <i class="bi bi-check-circle-fill me-1"></i>Postulante Seleccionado (Ganador Único)
        </span>
        <h3 style="margin: 0 0 4px 0; color: #0b2545; font-size: 1.35em; font-weight: bold;">
          ${ganador.nombre}
        </h3>
        <p style="margin: 0; color: #6c757d; font-size: 0.88em;">
          Cédula de Identidad: <strong style="color: #212529;">${ganador.cedula}</strong> | Nota Global: <strong style="color: #198754;">${ganador.notaDefinitiva().toFixed(2)} pts</strong>
        </p>
      </div>
    `;
  }

  public mostrar(): void {
    this.ui.removeAttribute("hidden");
  }

  public ocultar(): void {
    this.ui.setAttribute("hidden", "true");
  }
}