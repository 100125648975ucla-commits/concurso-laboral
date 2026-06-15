import Cl_mAspirante from "../models/Cl_mAspirante.js";
import mockapi from "./Cl_sMockApi.js";
export default class Cl_sAspirante {
    static async existe(cedula) {
        return await mockapi.existeId({ id: cedula });
    }
    static async agregar(nuevoAspirante) {
        const datosJSON = nuevoAspirante.toJSON();
        return await mockapi.post(datosJSON);
    }
    static async getAspirantes() {
        let resultado = await mockapi.getTabla();
        return { ok: resultado.ok, tabla: resultado.tabla };
    }
    static async buscarPorCedula(cedula) {
        let resultado = await mockapi.buscarPorCedula({ id: cedula });
        if (resultado.ok && resultado.data !== null) {
            let aspiranteInstanciado = new Cl_mAspirante({
                cedula: resultado.data.cedula,
                nombre: resultado.data.nombre,
                puntajesForm5: resultado.data.puntajesForm5,
                puntajesForm51: resultado.data.puntajesForm51,
                puntajesForm52: resultado.data.puntajesForm52,
                puntajesForm53: resultado.data.puntajesForm53,
                notaExamenEscrito: resultado.data.notaExamenEscrito,
                notaExamenPractico: resultado.data.notaExamenPractico,
                evaluacionAspectosJuradoA: resultado.data.evaluacionAspectosJuradoA,
                evaluacionAspectosJuradoB: resultado.data.evaluacionAspectosJuradoB,
                evaluacionAspectosJuradoC: resultado.data.evaluacionAspectosJuradoC,
            });
            aspiranteInstanciado.idMockApi = resultado.data.id;
            return { ok: true, aspirante: aspiranteInstanciado };
        }
        return { ok: resultado.ok, aspirante: null };
    }
    static async actualizar(aspirante) {
        const idMockApi = aspirante.idMockApi;
        if (!idMockApi) {
            return { ok: false, mensaje: "Error: No se pudo localizar el identificador del registro remoto." };
        }
        return await mockapi.put(idMockApi, aspirante.toJSON());
    }
}
//# sourceMappingURL=Cl_sAspirante.js.map