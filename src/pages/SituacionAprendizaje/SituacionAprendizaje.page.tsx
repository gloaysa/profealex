import { FormBasicInfo } from "@pages/SituacionAprendizaje/form/form-basic-info.tsx";
import { FormActividades } from "@pages/SituacionAprendizaje/form/form-actividades.tsx";
import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { ConfirmButton } from "@components/ConfirmButton/ConfirmButton.mol.tsx";
import { FormMetodologia } from "@pages/SituacionAprendizaje/form/form-metodologia.tsx";
import { FormEvaluacion } from "@pages/SituacionAprendizaje/form/form-evaluacion.tsx";
import { FormOtrosAspectos } from "@pages/SituacionAprendizaje/form/form-otros-aspectos.tsx";
import { FormAspectosCurriculares } from "@pages/SituacionAprendizaje/form/form-aspectos-curriculares.tsx";
import { FormTransversalidad } from "@pages/SituacionAprendizaje/form/form-transversalidad.tsx";
import { FormAtencionInclusiva } from "@pages/SituacionAprendizaje/form/form-atencion-inclusiva.tsx";
import { FormSesiones } from "@pages/SituacionAprendizaje/form/form-sesiones.tsx";
import { FormPdfDialog } from "@pages/SituacionAprendizaje/form/form-pdf-dialog.tsx";
import { useCurriculumStore } from "@/store/curriculum/curriculum.store.ts";
import { useEffect } from "react";

export const SituacionAprendizaje = () => {
  const { selectedSubject } = useCurriculumStore();
  const { clear } = useSituacionAprendizajeFormStore();

  useEffect(() => {
    if (!selectedSubject) {
      clear();
    }
  }, [clear, selectedSubject]);

  if (!selectedSubject) {
    return (
      <div className="h-full p-4">
        <h1 className="bg-primary border-round p-2 text-center">
          Situación de aprendizaje
        </h1>
        <div className="border-round surface-border border-1 p-4">
          <p>Selecciona una materia para comenzar.</p>
          <p>
            Una vez empieces a rellenar el formulario, este se irá guardando
            solo. Puedes cerrar la pestaña que cuando vuelvas seguirá
            esperándote.
          </p>
          <p>
            Ten mucho cuidado de no cambiar la materia en la barra de arriba. Si
            lo haces, <strong>¡todos tus cambios se perderán!</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-column gap-4 p-4">
      <div className="flex justify-content-between align-items-center">
        <h1>Situación de Aprendizaje</h1>
      </div>
      <div className="flex flex-column md:flex-row w-full justify-content-between gap-4">
        <div>
          <ConfirmButton
            className="w-full"
            severity="warning"
            accept={() => clear()}
            label="Borrar datos"
            tooltip="Borra todos los datos introducidos en el formulario."
            tooltipOptions={{ position: "right" }}
          />
        </div>
        <FormPdfDialog />
      </div>
      <FormBasicInfo />
      <FormAspectosCurriculares />
      <FormActividades />
      <FormMetodologia />
      <FormTransversalidad />
      <FormAtencionInclusiva />
      <FormEvaluacion />
      <FormOtrosAspectos />
      <FormSesiones />

      <div className="flex justify-content-end">
        <FormPdfDialog />
      </div>
    </div>
  );
};
