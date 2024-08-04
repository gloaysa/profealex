import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FormCreatePdf } from "@pages/SituacionAprendizaje/form/form-create-pdf.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";

export const FormPdfDialog = () => {
  const { basicInfo } = useSituacionAprendizajeFormStore();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        disabled={!basicInfo.title.text}
        label="Revisar PDF"
        tooltip="Revisa el PDF generado con los datos introducidos en el formulario antes de crearlo."
        tooltipOptions={{ position: "left" }}
        onClick={() => setOpen(true)}
      />
      <Dialog visible={open} onHide={() => setOpen(false)}>
        <FormCreatePdf />
      </Dialog>
    </div>
  );
};
