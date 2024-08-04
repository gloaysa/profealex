import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";

export const FormOtrosAspectos = () => {
  const { otrosAspectos, setOtrosAspectos } =
    useSituacionAprendizajeFormStore();

  const handleBasicInfoChange = (
    key: keyof typeof otrosAspectos,
    value: { text: string; html: string },
  ) => {
    setOtrosAspectos({ ...otrosAspectos, [key]: value });
  };

  return (
    <FormSection title="Otros aspectos">
      <MarkDownEditor
        label="Herramientas TIC"
        placeholder="Herramientas TIC"
        value={otrosAspectos.herramientasTIC.text}
        onChange={(value) => handleBasicInfoChange("herramientasTIC", value)}
      />
      <MarkDownEditor
        label="Fundamentos del proyecto"
        placeholder="Fundamentos del proyecto"
        value={otrosAspectos.fundamentosProyecto.text}
        onChange={(value) =>
          handleBasicInfoChange("fundamentosProyecto", value)
        }
      />
      <MarkDownEditor
        label="Difusión"
        placeholder="Difusión"
        value={otrosAspectos.difusion.text}
        onChange={(value) => handleBasicInfoChange("difusion", value)}
      />
    </FormSection>
  );
};
