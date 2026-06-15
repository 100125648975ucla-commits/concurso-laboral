import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default interface I_vTableroDirectiva {
  mostrarResultados(aspirantes: Cl_mAspirante[]): void;
  mostrarGanador(ganador: Cl_mAspirante | null): void;

  onRecargar(callback: () => void): void;
  onVolver(callback: () => void): void;

  mostrar(): void;
  ocultar(): void;
}