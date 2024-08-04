import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";

export const FormMetodologia = () => {
  const { metodologia, setMetodologia } = useSituacionAprendizajeFormStore();

  const handleBasicInfoChange = (
    key: keyof typeof metodologia,
    value: { text: string; html: string },
  ) => {
    setMetodologia({ ...metodologia, [key]: value });
  };

  return (
    <FormSection title="metodologia">
      <MarkDownEditor
        label="Agrupamiento"
        placeholder="Agrupamiento"
        value={metodologia.agrupamiento.text}
        onChange={(value) => handleBasicInfoChange("agrupamiento", value)}
      />
      <MarkDownEditor
        label="Espacios"
        placeholder="Espacios"
        value={metodologia.espacios.text}
        onChange={(value) => handleBasicInfoChange("espacios", value)}
      />
      <MarkDownEditor
        label="Recursos"
        placeholder="Recursos"
        value={metodologia.recursos.text}
        onChange={(value) => handleBasicInfoChange("recursos", value)}
      />
      <MarkDownEditor
        label="Fundamentos metodológicos"
        placeholder="Fundamentos metodológicos"
        value={metodologia.fundamentosMetodologicos.text}
        onChange={(value) =>
          handleBasicInfoChange("fundamentosMetodologicos", value)
        }
      />
    </FormSection>
  );
};
