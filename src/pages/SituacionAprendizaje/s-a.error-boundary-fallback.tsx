import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import { Button } from "primereact/button";

export const SituacionAprendizajeErrorBoundaryFallback = () => {
  const { clear } = useSituacionAprendizajeFormStore();

  return (
    <div className="" style={{ maxWidth: "768px" }}>
      <h2>Ha habido una actualización</h2>
      <p className="text-lg">
        Hey! Estamos siempre viendo cómo mejorar la aplicación y generalmente lo
        hacemos de forma que no interfiera con nuestros usuarios. Sin embargo,
        en esta ocasión hemos tenido que hacer un cambio que ha afectado al
        formulario de <strong>Situación de Aprendizaje</strong> y te pedimos que
        por favor cliques en el botón de abajo, que eliminará el formulario que
        tuvieras guardado y te permitirá empezar de nuevo y usar las mejoras.
      </p>
      <Button
        onClick={() => {
          clear();
          window.location.reload();
        }}
        label="Borrar formulario"
        className="w-full md:w-auto"
      />
    </div>
  );
};
