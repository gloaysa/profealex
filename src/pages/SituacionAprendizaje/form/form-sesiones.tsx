import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { FormSection } from "@components/FormSection/FormSection.component.tsx";
import { MarkDownEditor } from "@components/MarkDownEditor/MarkDownEditor.mol.tsx";
import { InputText } from "@components/InputText/InputText.component.tsx";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { SesionAprendizaje } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.interface.ts";

export const FormSesiones = () => {
  const { sesiones, setSesiones } = useSituacionAprendizajeFormStore();

  const handleBasicInfoChange = (
    sesion: SesionAprendizaje,
    key: keyof (typeof sesiones)[0],
    value: { text: string; html?: string },
  ) => {
    setSesiones(
      sesiones.map((s) => {
        if (s.code === sesion.code) {
          return {
            ...s,
            [key]: value,
          };
        }
        return s;
      }),
    );
  };

  return (
    <FormSection title="Sesiones">
      {sesiones.map((sesion) => (
        <Card
          key={sesion.code}
          header={<strong className="uppercase">{sesion.title.text}</strong>}
        >
          <div className="flex flex-column gap-4">
            <InputText
              label="Título"
              placeholder="Título"
              value={sesion.title.text}
              onChange={(e) =>
                handleBasicInfoChange(sesion, "title", { text: e.target.value })
              }
            />

            <InputText
              label="Temporización"
              placeholder="Temporización"
              value={sesion.temporalizacion.text}
              onChange={(e) =>
                handleBasicInfoChange(sesion, "temporalizacion", {
                  text: e.target.value,
                })
              }
            />

            <MarkDownEditor
              label="Objetivos"
              placeholder="Objetivos"
              value={sesion.objetivos.text}
              onChange={(value) =>
                handleBasicInfoChange(sesion, "objetivos", value)
              }
            />
            <MarkDownEditor
              label="Recursos"
              placeholder="Recursos"
              value={sesion.recursos.text}
              onChange={(value) =>
                handleBasicInfoChange(sesion, "recursos", value)
              }
            />
            <MarkDownEditor
              label="Actividades"
              placeholder="Actividades"
              value={sesion.actividades.text}
              onChange={(value) =>
                handleBasicInfoChange(sesion, "actividades", value)
              }
            />
            <MarkDownEditor
              label="Seguimiento"
              placeholder="Seguimiento"
              value={sesion.seguimiento.text}
              onChange={(value) =>
                handleBasicInfoChange(sesion, "seguimiento", value)
              }
            />
          </div>
          <div className="flex justify-content-end gap-4 mt-4">
            <Button
              label="Eliminar Sesion"
              className="w-auto"
              severity="danger"
              onClick={() =>
                setSesiones(sesiones.filter((s) => s.code !== sesion.code))
              }
            />
          </div>
        </Card>
      ))}
      <Button
        label="Agregar Sesion"
        onClick={() =>
          setSesiones([
            ...sesiones,
            {
              code: `${sesiones.length + 1}`,
              title: { text: "" },
              temporalizacion: { text: "" },
              objetivos: { text: "" },
              recursos: { text: "" },
              actividades: { text: "" },
              seguimiento: { text: "" },
            },
          ])
        }
      />
    </FormSection>
  );
};
