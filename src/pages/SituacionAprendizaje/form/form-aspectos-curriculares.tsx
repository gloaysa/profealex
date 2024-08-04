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

  const descriptors = aspectosCurriculares.competenciasClave.flatMap(
    (cc) => cc.descriptors,
  );

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
    value: string[],
  ) => {
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
        filter
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
        onChange={(e) => handleBasicInfoChange("competenciasClave", e.value)}
        filter
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
        filter
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
        filter
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
        onChange={(e) =>
          handleBasicInfoChange("competenciasEspecificas", e.value)
        }
        filter
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
        filter
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
        filter
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