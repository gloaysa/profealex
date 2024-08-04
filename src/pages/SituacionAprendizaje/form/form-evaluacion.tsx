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
        label="Evaluación de los alumnos"
        placeholder="Evalución de los alumnos"
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
        label="Propuestas de mejora"
        placeholder="Propuestas de mejora"
        value={evaluacion.propuestasMejora.text}
        onChange={(value) => handleBasicInfoChange("propuestasMejora", value)}
      />
    </FormSection>
  );
};
