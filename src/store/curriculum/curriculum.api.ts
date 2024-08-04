import {
  ICompetenciaClave,
  ICriterioEvaluacion,
  IMateria,
  ISaberesCriterios,
  ISubject,
  ObjectivosGenerales,
  PerfilSalida,
  StageType,
} from "./curriculum.interface.ts";

const baseUrl = `${import.meta.env.VITE_APP_GH_PAGES_BASE_URL}`;

export const getMaterias = async (ca: string): Promise<IMateria[]> => {
  try {
    const response = await fetch(`${baseUrl}/${ca}/materias.json`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching materias");
  }
};

export const getCompetenciasClave = async (
  ca: string,
  stageType: StageType,
): Promise<ICompetenciaClave[]> => {
  try {
    const response = await fetch(
      `${baseUrl}/${ca}/${stageType}/competencias-clave.json`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching competencias");
  }
};

export const getObjectivosGenerales = async (
  ca: string,
  stageType: StageType,
): Promise<ObjectivosGenerales[]> => {
  try {
    const response = await fetch(
      `${baseUrl}/${ca}/${stageType}/objetivos-generales.json`,
    );
    const res = await response.json();
    const objGenerales = res.objetivosGenerales;
    // an example of this output would be:
    // ["a) Understand blablabla", "b) Apply blablabla", "c) Analyze blablabla"]
    // we want to return an object like {code: a, label: "Understand blablabla"}
    return objGenerales.map((obj: string) => {
      const [code, label] = obj.split(") ");
      return { code: code.toUpperCase(), label };
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching objetivos generales");
  }
};

export const getObjetivosUnidad = async (
  ca: string,
  stageType: StageType,
): Promise<{ text: string; value: string }> => {
  try {
    const response = await fetch(
      `${baseUrl}/${ca}/${stageType}/objetivos-unidad.json`,
    );
    const res = await response.json();
    return res.objetivos;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching objetivos unidad");
  }
};

export const getPerfilSalida = async (
  ca: string,
  stageType: StageType,
): Promise<PerfilSalida[]> => {
  try {
    const response = await fetch(
      `${baseUrl}/${ca}/${stageType}/perfilsalida.json`,
    );
    const res = await response.json();
    return res.perfilSalida.map((ps: string, i: number) => ({
      code: i + 1,
      label: ps.slice(2),
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching perfil salida");
  }
};

export const getSituacionesAprendizaje = async (
  ca: string,
  stageType: StageType,
): Promise<string[]> => {
  try {
    const response = await fetch(
      `${baseUrl}/${ca}/${stageType}/situaciones-de-aprendizaje.json`,
    );
    const res = await response.json();
    return res.situacionesAprendizaje;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching situaciones aprendizaje");
  }
};

export const getCompetenciasEspecificas = async (
  ca: string,
  subject: ISubject,
): Promise<{ code: number; label: string }[]> => {
  try {
    const response = await fetch(
      `${baseUrl}/${ca}/${subject.stage}/${subject.code}/competencias-especificas.json`,
    );
    const res = await response.json();
    const compEsp = res.competenciasEspecificas;

    // an example of this output would be:
    // ["1. Understand blablabla", "2. Apply blablabla", "3. Analyze blablabla"]
    // we want to return an object like {code: 1, label: "Understand blablabla"}
    return compEsp.map((comp: string) => {
      const [code, label] = comp.split(". ");
      return { code: Number(code), label };
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching competencias especificas");
  }
};

export const getSaberesCriterios = async (
  ca: string,
  subject: ISubject,
): Promise<{
  saberes: ISaberesCriterios[];
  criteriosEvaluacion: ICriterioEvaluacion[];
}> => {
  try {
    const response = await fetch(
      `${baseUrl}/${ca}/${subject.stage}/${subject.code}/${subject.course}/saberes-criterios.json`,
    );
    const res = await response.json();

    // an example of this output would be:
    // {saberes: ["A. Something", "- Something else related to A", "* Another thing related to A"], criteriosEvaluacion: ["1.1 Criteria 1", "1.2. Criteria 2", "2.1. Criteria 3"]}
    // we want to return an object like {saberes: [{code: 'A', label: 'Something", items: ["Something else related to A", "Another thing related to A"]}], criteriosEvaluacion: [{parent: 1, code: 1, label: "Criteria 1"}, {parent: 1, code: 2, label: "Criteria 2"}, {parent: 2, code: 1, label: "Criteria 3"}]}
    const saberes = res.saberes.reduce(
      (acc: ISaberesCriterios[], sab: string) => {
        const isHeader = new RegExp("^[A-Z]$").test(sab[0]);
        if (isHeader) {
          const [code, label] = sab.split(". ");
          acc.push({ code, label, items: [] });
        } else {
          // remove the first character and the space
          sab = sab.slice(2);
          const current = acc[acc.length - 1];
          const index = current.items.length + 1;
          current.items.push({ code: current.code + index, label: sab });
        }
        return acc;
      },
      [],
    );

    const criteriosEvaluacion = res.criteriosEvaluacion.map(
      (criterio: string) => {
        const [code, label] = criterio.split(". ");
        const [parent] = code.split(".");
        return { parent: Number(parent), code: Number(code), label };
      },
    );

    return { saberes, criteriosEvaluacion };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching saberes criterios");
  }
};

export const getPautasDUA = async (): Promise<
  { code: string; label: string }[]
> => {
  try {
    const response = await fetch(`${baseUrl}/nacional/pautas-dua.json`);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching pautas DUA");
  }
};

export const getODS = async (): Promise<{ code: string; label: string }[]> => {
  try {
    const response = await fetch(
      `${baseUrl}/nacional/objetivos-desarrollo-sostenible.json`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching pautas DUA");
  }
};
