import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { InputMultiSelect } from "@components/InputMultiSelect/InputMultiSelect.component.tsx";
import { useQuery } from "@tanstack/react-query";
import { getPautasDUA } from "@/store/curriculum/curriculum.api.ts";
import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";

export const FormAtencionInclusiva = () => {
  const { atencionInclusiva, setAtencionInclusiva } =
    useSituacionAprendizajeFormStore();

  const dua = useQuery({
    queryKey: ["getPautasDUA"],
    queryFn: () => getPautasDUA(),
  });

  const handleBasicInfoChange = (
    key: keyof typeof atencionInclusiva,
    value: { text: string; html: string },
  ) => {
    setAtencionInclusiva({ ...atencionInclusiva, [key]: value });
  };

  return (
    <FormSection title="Atención a la inclusión educativa">
      <InputMultiSelect
        label="Principios DUA"
        options={dua.data}
        loading={dua.isLoading}
        value={atencionInclusiva.principiosDUA}
        onChange={(e) => handleBasicInfoChange("principiosDUA", e.value)}
        optionLabel="code"
        itemTemplate={(cc) => cc.label}
        display="chip"
      />
      <InputMultiSelect
        label="Pautas DUA"
        options={atencionInclusiva.principiosDUA.flatMap((p) =>
          p.pautas?.map((pauta) => ({ ...pauta, principio: p.code })),
        )}
        loading={dua.isLoading}
        value={atencionInclusiva.pautasDUA}
        onChange={(e) => handleBasicInfoChange("pautasDUA", e.value)}
        disabled={!atencionInclusiva.principiosDUA.length}
        optionLabel="code"
        itemTemplate={(cc) => (
          <span>
            ({cc.principio}) {cc.code}: {cc.label}
          </span>
        )}
        display="chip"
      />

      <MarkDownEditor
        label="Adaptaciones"
        placeholder="Adaptaciones"
        value={atencionInclusiva.adaptaciones.text}
        onChange={(value) => handleBasicInfoChange("adaptaciones", value)}
      />
    </FormSection>
  );
};
