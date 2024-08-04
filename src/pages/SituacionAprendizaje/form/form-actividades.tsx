import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";
import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";

export const FormActividades = () => {
  const { actividades, setActividades } = useSituacionAprendizajeFormStore();

  const handleBasicInfoChange = (
    key: keyof typeof actividades,
    value: { text: string; html: string },
  ) => {
    setActividades({ ...actividades, [key]: value });
  };

  return (
    <FormSection title="Actividades">
      <MarkDownEditor
        label="Actividades de conocimientos previos e introducción"
        placeholder="Actividades de conocimientos previos e introducción"
        value={actividades.conocimientosPrevios.text}
        onChange={(value) =>
          handleBasicInfoChange("conocimientosPrevios", value)
        }
      />
      <MarkDownEditor
        label="Actividades de desarrollo"
        placeholder="Actividades de desarrollo"
        value={actividades.desarrollo.text}
        onChange={(value) => handleBasicInfoChange("desarrollo", value)}
      />
      <MarkDownEditor
        label="Actividades de síntesis"
        placeholder="Actividades de síntesis"
        value={actividades.sintesis.text}
        onChange={(value) => handleBasicInfoChange("sintesis", value)}
      />
      <MarkDownEditor
        label="Actividades de evaluación"
        placeholder="Actividades de evaluación"
        value={actividades.evaluacion.text}
        onChange={(value) => handleBasicInfoChange("evaluacion", value)}
      />
    </FormSection>
  );
};
