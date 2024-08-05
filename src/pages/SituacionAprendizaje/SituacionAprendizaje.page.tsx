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
import { SubjectSelector } from "@components/SubjectSelector/SubjectSelector.component.tsx";

export const SituacionAprendizaje = () => {
  const { selectedSubject } = useCurriculumStore();
  const { clear } = useSituacionAprendizajeFormStore();

  useEffect(() => {
    if (!selectedSubject) {
      clear();
    }
  }, [clear, selectedSubject]);

  return (
    <div className="flex flex-column gap-4">
      <div className="flex flex-column gap-2 md:gap-4 bg-primary-300 border-round p-2 md:p-4">
        <h1 className="p-2 m-0 text-center">Situación de aprendizaje</h1>
        <SubjectSelector />
      </div>

      {!selectedSubject && (
        <div className="fadeinleft animation-duration-500">
          <p>Selecciona una materia para comenzar.</p>
          <p>
            Una vez empieces a rellenar el formulario, este se irá guardando
            solo.
          </p>
          <p>Puedes cerrar la pestaña y cuando vuelvas seguirá esperándote.</p>
        </div>
      )}

      {!!selectedSubject && (
        <div className="flex flex-column gap-4 fadeindown animation-duration-500">
          <div className="flex flex-column md:flex-row w-full justify-content-between gap-2 md:gap-4">
            <ConfirmButton
              className="w-full md:w-auto"
              severity="warning"
              accept={() => clear()}
              label="Volver a empezar"
              tooltip="Borra todos los datos introducidos en el formulario."
              tooltipOptions={{ position: "right" }}
            />
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
      )}
    </div>
  );
};
