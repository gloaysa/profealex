import {
  ICompetenciaClave,
  ICompetenciaEspecifica,
  ICriterioEvaluacion,
  ISaberesCriterios,
  ObjectivosGenerales,
  PerfilSalida,
} from "@/store/curriculum/curriculum.interface.ts";

export interface Content {
  text: string;
  html?: string;
}

export interface FormBasicInfo {
  title: Content;
  temporalizacion: Content;
  sesiones: Content;
  justificacion: Content;
  descripcion: Content;
  productoFinal: Content;
}

export interface AspectosCurriculares {
  objetivosGenerales: ObjectivosGenerales[];
  competenciasClave: ICompetenciaClave[];
  descriptoresOperativos: { code: string; label: string; parentCode: string }[];
  perfilSalida: PerfilSalida[];
  competenciasEspecificas: ICompetenciaEspecifica[];
  criteriosEvaluacion: ICriterioEvaluacion[];
  saberesBasicos: ISaberesCriterios[];
}

export interface FormActividades {
  conocimientosPrevios: Content;
  desarrollo: Content;
  sintesis: Content;
  evaluacion: Content;
}

export interface FormMetodologia {
  agrupamiento: Content;
  espacios: Content;
  recursos: Content;
  fundamentosMetodologicos: Content;
}

export interface FormTransversalidad {
  ods: { code: string; label: string }[];
  vinculaciones: Content;
}

export interface FormAtencionInclusiva {
  principiosDUA: {
    code: string;
    label: string;
    pautas: { code: string; label: string }[];
  }[];
  pautasDUA: { code: string; label: string }[];
  adaptaciones: Content;
}

export interface FormEvaluacion {
  alumnos: Content;
  autoevaluacion: Content;
  propuestasMejora: Content;
}

export interface OtrosAspectos {
  herramientasTIC: Content;
  fundamentosProyecto: Content;
  difusion: Content;
}

export interface SesionAprendizaje {
  code: string;
  title: Content;
  temporalizacion: Content;
  objetivos: Content;
  recursos: Content;
  actividades: Content;
  seguimiento: Content;
}
