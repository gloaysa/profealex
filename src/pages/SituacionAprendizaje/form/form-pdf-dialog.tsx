import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FormCreatePdf } from "@pages/SituacionAprendizaje/form/form-create-pdf.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";

export const FormPdfDialog = () => {
  const { basicInfo } = useSituacionAprendizajeFormStore();

  const [open, setOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /android|iPhone|iPad|iPod/i.test(userAgent);
  };

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  const label = `Revisar PDF ${isMobileDevice ? "(no podrás crear PDF en móvil)" : ""}`;

  return (
    <div>
      <Button
        className="w-full"
        disabled={!basicInfo.title.text}
        label={label}
        tooltip="Revisa el PDF generado con los datos introducidos en el formulario antes de crearlo."
        tooltipOptions={{ position: "left" }}
        onClick={() => setOpen(true)}
      />
      <Dialog header={label} visible={open} onHide={() => setOpen(false)}>
        <FormCreatePdf />
      </Dialog>
    </div>
  );
};
