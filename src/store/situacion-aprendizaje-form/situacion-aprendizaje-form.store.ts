import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  AspectosCurriculares,
  FormActividades,
  FormAtencionInclusiva,
  FormBasicInfo,
  FormEvaluacion,
  FormMetodologia,
  FormTransversalidad,
  OtrosAspectos,
  SesionAprendizaje,
} from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.interface.ts";

export interface CurriculumStore {
  clear: () => void;
  basicInfo: FormBasicInfo;
  setBasicInfo: (basicInfo: FormBasicInfo) => void;

  aspectosCurriculares: AspectosCurriculares;
  setAspectosCurriculares: (aspectosCurriculares: AspectosCurriculares) => void;

  actividades: FormActividades;
  setActividades: (actividades: FormActividades) => void;

  metodologia: FormMetodologia;
  setMetodologia: (metodologia: FormMetodologia) => void;

  transversalidad: FormTransversalidad;
  setTransversalidad: (transversalidad: FormTransversalidad) => void;

  atencionInclusiva: FormAtencionInclusiva;
  setAtencionInclusiva: (atencionInclusiva: FormAtencionInclusiva) => void;

  evaluacion: FormEvaluacion;
  setEvaluacion: (evaluacion: FormEvaluacion) => void;

  otrosAspectos: OtrosAspectos;
  setOtrosAspectos: (otrosAspectos: OtrosAspectos) => void;

  sesiones: SesionAprendizaje[];
  setSesiones: (sesiones: SesionAprendizaje[]) => void;
}

const defaultState = {
  basicInfo: {
    title: { text: "" },
    temporalizacion: { text: "" },
    sesiones: { text: "1" },
    justificacion: { text: "" },
    descripcion: { text: "" },
    productoFinal: { text: "" },
  },
  aspectosCurriculares: {
    objetivosGenerales: [],
    competenciasClave: [],
    descriptoresOperativos: [],
    perfilSalida: [],
    competenciasEspecificas: [],
    criteriosEvaluacion: [],
    saberesBasicos: [],
  },
  actividades: {
    conocimientosPrevios: { text: "" },
    desarrollo: { text: "" },
    sintesis: { text: "" },
    evaluacion: { text: "" },
  },
  metodologia: {
    agrupamiento: { text: "" },
    espacios: { text: "" },
    recursos: { text: "" },
    fundamentosMetodologicos: { text: "" },
  },
  transversalidad: {
    ods: [],
    vinculaciones: { text: "" },
  },
  atencionInclusiva: {
    principiosDUA: [],
    pautasDUA: [],
    adaptaciones: { text: "" },
  },
  evaluacion: {
    alumnos: { text: "" },
    autoevaluacion: { text: "" },
    propuestasMejora: { text: "" },
  },
  otrosAspectos: {
    herramientasTIC: { text: "" },
    fundamentosProyecto: { text: "" },
    difusion: { text: "" },
  },
  sesiones: [
    {
      code: "1",
      title: { text: "" },
      temporalizacion: { text: "" },
      objetivos: { text: "" },
      recursos: { text: "" },
      actividades: { text: "" },
      seguimiento: { text: "" },
    },
  ],
};

export const useSituacionAprendizajeFormStore = create<CurriculumStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultState,
        clear: () => set(defaultState),
        setBasicInfo: (basicInfo: FormBasicInfo) => set({ basicInfo }),
        setAspectosCurriculares: (aspectosCurriculares: AspectosCurriculares) =>
          set({ aspectosCurriculares }),
        setActividades: (actividades: FormActividades) => set({ actividades }),
        setMetodologia: (metodologia: FormMetodologia) => set({ metodologia }),
        setTransversalidad: (transversalidad: FormTransversalidad) =>
          set({ transversalidad }),
        setAtencionInclusiva: (atencionInclusiva: FormAtencionInclusiva) =>
          set({ atencionInclusiva }),
        setEvaluacion: (evaluacion: FormEvaluacion) => set({ evaluacion }),
        setOtrosAspectos: (otrosAspectos: OtrosAspectos) =>
          set({ otrosAspectos }),
        setSesiones: (sesiones: SesionAprendizaje[]) => set({ sesiones }),
      }),
      {
        name: "situacion-aprendizaje-form-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: "situacion-aprendizaje-form" },
  ),
);
