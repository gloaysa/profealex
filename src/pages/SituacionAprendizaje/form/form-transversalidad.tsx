import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";
import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { InputMultiSelect } from "@components/InputMultiSelect/InputMultiSelect.component.tsx";
import { useQuery } from "@tanstack/react-query";
import { getODS } from "@/store/curriculum/curriculum.api.ts";

export const FormTransversalidad = () => {
  const { transversalidad, setTransversalidad } =
    useSituacionAprendizajeFormStore();

  const ods = useQuery({
    queryKey: ["ods"],
    queryFn: () => getODS(),
  });

  const handleBasicInfoChange = (
    key: keyof typeof transversalidad,
    value: { text: string; html: string },
  ) => {
    setTransversalidad({ ...transversalidad, [key]: value });
  };

  return (
    <FormSection title="transversalidad">
      <InputMultiSelect
        label="Objetivos de Desarrollo Sostenible"
        options={ods.data}
        loading={ods.isLoading}
        value={transversalidad.ods}
        onChange={(e) => handleBasicInfoChange("ods", e.value)}
        filter
        optionLabel="code"
        itemTemplate={(cc) => cc.label}
        display="chip"
      />
      <MarkDownEditor
        label="Vinculación con otras áreas y materias"
        placeholder="Vinculación con otras áreas y materias"
        value={transversalidad.vinculaciones.text}
        onChange={(value) => handleBasicInfoChange("vinculaciones", value)}
      />
    </FormSection>
  );
};
