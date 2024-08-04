import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";

export const FormEvaluacion = () => {
  const { evaluacion, setEvaluacion } = useSituacionAprendizajeFormStore();

  const handleBasicInfoChange = (
    key: keyof typeof evaluacion,
    value: { text: string; html: string },
  ) => {
    setEvaluacion({ ...evaluacion, [key]: value });
  };

  return (
    <FormSection title="evaluacion">
      <MarkDownEditor
        label="Instrumentos de evaluación"
        placeholder="Instrumentos de evaluación"
        value={evaluacion.alumnos.text}
        onChange={(value) => handleBasicInfoChange("alumnos", value)}
      />
      <MarkDownEditor
        label="Autoevaluación"
        placeholder="Autoevaluación"
        value={evaluacion.autoevaluacion.text}
        onChange={(value) => handleBasicInfoChange("autoevaluacion", value)}
      />
      <MarkDownEditor
        label="Detección de posibles problemas y necesidades"
        placeholder="Detección de posibles problemas y necesidades"
        value={evaluacion.propuestasMejora.text}
        onChange={(value) => handleBasicInfoChange("propuestasMejora", value)}
      />
    </FormSection>
  );
};
