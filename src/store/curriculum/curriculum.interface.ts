export interface ObjectivosGenerales {
  code: string;
  label: string;
}

export interface PerfilSalida {
  code: string;
  label: string;
}

export interface ICompetenciaClave {
  code: string;
  label: string;
  descriptors: {
    parentCode: string;
    code: string;
    label: string;
  }[];
}

export interface ICompetenciaEspecifica {
  code: string;
  label: string;
}

export interface ICriterioEvaluacion {
  parent: string;
  code: string;
  label: string;
}

export interface ISaber {
  code: string;
  label: string;
  items: { label: string; code: string }[];
}

export interface IPrincipioDUA {
  code: string;
  label: string;
  pautas: { code: string; label: string }[];
}

export interface ISubject {
  code: string;
  label: string;
  course: number;
  stage: StageType;
}

export interface ICourse {
  code: string;
  course: number;
  label: string;
  subjects: ISubject[];
}

export enum StageType {
  PRIMARIA = "primaria",
  ESO = "eso",
  BACH = "bach",
}

export interface IMateria {
  stage: StageType;
  courses: ICourse[];
}

export interface IStage {
  code: StageType;
  label: string;
}

export interface ICA {
  code: string;
  label: string;
  stages: IStage[];
  migrated: boolean;
}
