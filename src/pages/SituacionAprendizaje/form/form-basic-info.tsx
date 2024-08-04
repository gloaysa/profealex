import { InputText } from "@components/InputText/InputText.component.tsx";
import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";
import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";

export const FormBasicInfo = () => {
  const { basicInfo, setBasicInfo } = useSituacionAprendizajeFormStore();

  const handleBasicInfoChange = (
    key: keyof typeof basicInfo,
    value: { text: string; html?: string },
  ) => {
    setBasicInfo({ ...basicInfo, [key]: value });
  };

  return (
    <FormSection title="Información básica">
      <InputText
        label="Nombre de la situación de aprendizaje"
        value={basicInfo.title.text}
        onChange={(e) =>
          handleBasicInfoChange("title", { text: e.target.value })
        }
      />

      <div className="flex flex-wrap sm:flex-nowrap w-full gap-4">
        <InputText
          className="w-full"
          label="Temporalización"
          placeholder="3er Trimestre"
          value={basicInfo.temporalizacion.text}
          onChange={(e) =>
            handleBasicInfoChange("temporalizacion", { text: e.target.value })
          }
        />

        <InputText
          className="w-full"
          label="Número de sesiones"
          type="number"
          placeholder="1"
          min={1}
          value={basicInfo.sesiones.text}
          onChange={(e) =>
            handleBasicInfoChange("sesiones", { text: e.target.value })
          }
        />
      </div>

      <MarkDownEditor
        label="Justificación"
        placeholder="Justificación"
        value={basicInfo.justificacion.text}
        onChange={(value) => handleBasicInfoChange("justificacion", value)}
      />
      <MarkDownEditor
        label="Descripción"
        placeholder="Descripción"
        value={basicInfo.descripcion.text}
        onChange={(value) => handleBasicInfoChange("descripcion", value)}
      />
      <MarkDownEditor
        label="Producto final"
        placeholder="Producto final"
        value={basicInfo.productoFinal.text}
        onChange={(value) => handleBasicInfoChange("productoFinal", value)}
      />
    </FormSection>
  );
};
