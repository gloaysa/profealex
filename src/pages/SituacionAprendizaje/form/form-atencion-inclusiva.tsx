import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { InputMultiSelect } from "@components/InputMultiSelect/InputMultiSelect.component.tsx";
import { useQuery } from "@tanstack/react-query";
import { getPautasDUA } from "@/store/curriculum/curriculum.api.ts";
import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";
import { IPrincipioDUA } from "@/store/curriculum/curriculum.interface.ts";

export const FormAtencionInclusiva = () => {
  const { atencionInclusiva, setAtencionInclusiva } =
    useSituacionAprendizajeFormStore();

  const dua = useQuery({
    queryKey: ["getPautasDUA"],
    queryFn: () => getPautasDUA(),
  });

  const handleBasicInfoChange = (
    key: keyof typeof atencionInclusiva,
    value: (typeof atencionInclusiva)[keyof typeof atencionInclusiva],
  ) => {
    if (Array.isArray(value)) {
      // sort by code
      value.sort((a, b) => a.code.localeCompare(b.code));
    }
    setAtencionInclusiva({ ...atencionInclusiva, [key]: value });
  };

  return (
    <FormSection title="Atención a la inclusión educativa">
      <InputMultiSelect
        label="Principios DUA"
        options={dua.data}
        loading={dua.isLoading}
        value={atencionInclusiva.principiosDUA}
        onChange={(e) => {
          const principios: IPrincipioDUA[] = e.value;
          const newPautas = principios.flatMap((p) => p.pautas);
          const currentPautas = atencionInclusiva.pautasDUA;
          const pautas = currentPautas.filter((p) =>
            newPautas.find((np) => np.code === p.code),
          );
          setAtencionInclusiva({
            ...atencionInclusiva,
            principiosDUA: principios.sort((a, b) =>
              a.code.localeCompare(b.code),
            ),
            pautasDUA: pautas.sort((a, b) => a.code.localeCompare(b.code)),
          });
        }}
        optionLabel="code"
        itemTemplate={(cc) => cc.label}
        display="chip"
      />
      <InputMultiSelect
        label="Pautas DUA"
        options={atencionInclusiva.principiosDUA.flatMap((p) =>
          p.pautas
            ?.map((pauta) => ({ ...pauta, principio: p.code }))
            .sort((a, b) => a.code.localeCompare(b.code)),
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
