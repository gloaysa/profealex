import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { useCurriculumStore } from "@/store/curriculum/curriculum.store.ts";
import { useQuery } from "@tanstack/react-query";
import {
  getCompetenciasClave,
  getCompetenciasEspecificas,
  getObjectivosGenerales,
  getPerfilSalida,
  getSaberesCriterios,
} from "@/store/curriculum/curriculum.api.ts";
import { InputMultiSelect } from "@components/InputMultiSelect/InputMultiSelect.component.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import {
  ICompetenciaClave,
  ICompetenciaEspecifica,
} from "@/store/curriculum/curriculum.interface.ts";

export const FormAspectosCurriculares = () => {
  const { selectedCA, selectedStage, selectedSubject } = useCurriculumStore();

  const { aspectosCurriculares, setAspectosCurriculares } =
    useSituacionAprendizajeFormStore();

  const objectivosGenerales = useQuery({
    queryKey: ["objectivosGenerales", selectedCA, selectedStage],
    queryFn: () =>
      getObjectivosGenerales(selectedCA!.code, selectedStage!.code),
    enabled: !!selectedCA && !!selectedStage,
  });

  const competenciasClave = useQuery({
    queryKey: ["competenciasClave", selectedCA, selectedStage],
    queryFn: () => getCompetenciasClave(selectedCA!.code, selectedStage!.code),
    enabled: !!selectedCA && !!selectedStage,
  });

  const descriptors = aspectosCurriculares.competenciasClave
    .filter((cc) => cc.descriptors.some((d) => d.parentCode === cc.code))
    .flatMap((cc) => cc.descriptors);

  const perfilSalida = useQuery({
    queryKey: ["perfilSalida", selectedCA, selectedStage],
    queryFn: () => getPerfilSalida(selectedCA!.code, selectedStage!.code),
    enabled: !!selectedCA && !!selectedStage,
  });

  const competenciasEspecificas = useQuery({
    queryKey: ["competenciasEspecificas", selectedCA, selectedSubject],
    queryFn: () =>
      getCompetenciasEspecificas(selectedCA!.code, selectedSubject!),
    enabled: !!selectedCA && !!selectedSubject,
  });

  const saberesCriterios = useQuery({
    queryKey: ["saberesCriterios", selectedCA, selectedSubject],
    queryFn: () => getSaberesCriterios(selectedCA!.code, selectedSubject!),
    enabled: !!selectedCA && !!selectedSubject,
  });

  const handleBasicInfoChange = (
    key: keyof typeof aspectosCurriculares,
    value: (typeof aspectosCurriculares)[keyof typeof aspectosCurriculares],
  ) => {
    if (Array.isArray(value)) {
      // sort by code
      value.sort((a, b) => a.code.localeCompare(b.code));
    }
    setAspectosCurriculares({ ...aspectosCurriculares, [key]: value });
  };

  return (
    <FormSection title="Aspectos curriculares">
      <InputMultiSelect
        label="Objetivos generales o de etapa"
        options={objectivosGenerales.data}
        loading={objectivosGenerales.isLoading}
        value={aspectosCurriculares.objetivosGenerales}
        onChange={(e) => handleBasicInfoChange("objetivosGenerales", e.value)}
        optionLabel="code"
        itemTemplate={(og) => (
          <span>
            {og.code}: {og.label}
          </span>
        )}
        display="chip"
      />

      <InputMultiSelect
        label="Competencias clave"
        options={competenciasClave.data}
        loading={competenciasClave.isLoading}
        value={aspectosCurriculares.competenciasClave}
        onChange={(e) => {
          const cc: ICompetenciaClave[] = e.value;
          const updatedDO = aspectosCurriculares.descriptoresOperativos.filter(
            (d) => cc.some((desc) => desc.code === d.parentCode),
          );
          setAspectosCurriculares({
            ...aspectosCurriculares,
            competenciasClave: cc.sort((a, b) => a.code.localeCompare(b.code)),
            descriptoresOperativos: updatedDO.sort((a, b) =>
              a.code.localeCompare(b.code),
            ),
          });
        }}
        optionLabel="code"
        itemTemplate={(cc) => cc.label}
        display="chip"
      />

      <InputMultiSelect
        label="Descriptores operativos"
        options={descriptors}
        loading={competenciasClave.isLoading}
        value={aspectosCurriculares.descriptoresOperativos}
        onChange={(e) =>
          handleBasicInfoChange("descriptoresOperativos", e.value)
        }
        disabled={!aspectosCurriculares.competenciasClave.length}
        optionLabel="code"
        itemTemplate={(cc) => (
          <span>
            {cc.code}: {cc.label}
          </span>
        )}
        display="chip"
      />

      <InputMultiSelect
        label="Perfil de salida"
        options={perfilSalida.data}
        loading={perfilSalida.isLoading}
        value={aspectosCurriculares.perfilSalida}
        onChange={(e) => handleBasicInfoChange("perfilSalida", e.value)}
        disabled={!aspectosCurriculares.competenciasClave.length}
        optionLabel="code"
        itemTemplate={(cc) => (
          <span>
            {cc.code}: {cc.label}
          </span>
        )}
        display="chip"
      />

      <InputMultiSelect
        label="Competencias específicas"
        options={competenciasEspecificas.data}
        loading={competenciasEspecificas.isLoading}
        value={aspectosCurriculares.competenciasEspecificas}
        onChange={(e) => {
          const ce: ICompetenciaEspecifica[] = e.value;
          const criteriosEvaluacion =
            aspectosCurriculares.criteriosEvaluacion.filter((criterio) =>
              ce.some((ceId) => ceId.code === criterio.parent),
            ) ?? [];
          setAspectosCurriculares({
            ...aspectosCurriculares,
            competenciasEspecificas: ce.sort((a, b) =>
              a.code.localeCompare(b.code),
            ),
            criteriosEvaluacion: criteriosEvaluacion.sort((a, b) =>
              a.code.localeCompare(b.code),
            ),
          });
        }}
        optionLabel="code"
        itemTemplate={(cc) => (
          <span>
            {cc.code}: {cc.label}
          </span>
        )}
        display="chip"
      />

      <InputMultiSelect
        label="Criterios de evaluación (relativos a competencias específicas)"
        options={saberesCriterios.data?.criteriosEvaluacion.filter((ce) =>
          aspectosCurriculares.competenciasEspecificas.some(
            (ceId) => ceId.code === ce.parent,
          ),
        )}
        loading={saberesCriterios.isLoading}
        value={aspectosCurriculares.criteriosEvaluacion}
        onChange={(e) => handleBasicInfoChange("criteriosEvaluacion", e.value)}
        disabled={!aspectosCurriculares.competenciasEspecificas.length}
        optionLabel="code"
        itemTemplate={(cc) => (
          <span>
            {cc.code}: {cc.label}
          </span>
        )}
        display="chip"
      />

      <InputMultiSelect
        label="Saberes básicos"
        options={saberesCriterios.data?.saberes}
        loading={saberesCriterios.isLoading}
        value={aspectosCurriculares.saberesBasicos}
        onChange={(e) => handleBasicInfoChange("saberesBasicos", e.value)}
        optionLabel="code"
        optionGroupChildren="items"
        optionGroupLabel="code"
        optionGroupTemplate={(group) => (
          <span>
            {group.code}: {group.label}
          </span>
        )}
        itemTemplate={(cc) => (
          <span>
            {cc.code}: {cc.label}
          </span>
        )}
        display="chip"
      />
    </FormSection>
  );
};
