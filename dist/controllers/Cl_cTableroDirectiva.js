import Cl_sAspirante from "../services/Cl_sAspirante.js";
export default class Cl_cTableroDirectiva {
    modelo;
    vista;
    volverCallback;
    constructor({ modelo, vista, volverCallback, }) {
        this.modelo = modelo;
        this.vista = vista;
        this.volverCallback = volverCallback;
        // Suscribimos los eventos estilo profesor
        this.vista.onRecargar(() => this.cargarResultadosDelTablero());
        this.vista.onVolver(() => this.onVolverClick());
        this.vista.mostrar();
        // Ejecuta la carga automatizada de datos en cuanto se abre la pantalla
        this.cargarResultadosDelTablero();
    }
    /**
     * Descarga la información de la base de datos y manda a renderizar la tabla de posiciones
     */
    async cargarResultadosDelTablero() {
        // Llamamos al servicio web para traer a todos los candidatos
        let resultado = await Cl_sAspirante.getAspirantes();
        if (resultado.ok === false) {
            alert("Error: No se pudo establecer conexión con MockAPI.");
            return;
        }
        // Cargamos los datos limpios en la clase contenedora del modelo
        this.modelo.setAspirantes(resultado.tabla);
        // Mandamos a la vista plana a renderizar la tabla con todos los registros
        this.vista.mostrarResultados(this.modelo.getAspirantes());
        // Calculamos el ganador usando los algoritmos del modelo y lo mandamos a la tarjeta visual
        const ganadorDefinitivo = this.modelo.obtenerGanador();
        this.vista.mostrarGanador(ganadorDefinitivo);
    }
    onVolverClick() {
        this.vista.ocultar();
        this.volverCallback();
    }
}
//# sourceMappingURL=Cl_cTableroDirectiva.js.map