import { SubjectSelector } from "@components/SubjectSelector/SubjectSelector.component.tsx";
import { SituacionAprendizaje } from "@pages/SituacionAprendizaje/SituacionAprendizaje.page.tsx";
import { Image } from "primereact/image";
import { ErrorBoundary } from "@components/ErrorBoundary.tsx";
import { SituacionAprendizajeErrorBoundaryFallback } from "@pages/SituacionAprendizaje/s-a.error-boundary-fallback.tsx";

function App() {
  return (
    <div
      className="flex flex-column surface-ground h-full w-full"
      style={{ maxWidth: "2100px", minHeight: "100vh" }}
    >
      <div className="w-full h-full">
        <header className="flex gap-2 align-items-center border-round surface-border border-1">
          <Image
            className="bounce-in"
            width="100px"
            src="/icon512_rounded.png"
          />
          <div className="flex flex-column gap-2">
            <span className="text-3xl text-primary">ProfeAlex</span>
            <small>Herramientas educativas</small>
          </div>
        </header>

        <div className="flex flex-column gap-2 px-2 py-4 md:p-4">
          <SubjectSelector />

          <ErrorBoundary
            fallback={<SituacionAprendizajeErrorBoundaryFallback />}
          >
            <SituacionAprendizaje />
          </ErrorBoundary>
        </div>
      </div>

      <footer className="flex flex-column md:flex-row bg-primary align-items-center md:justify-content-between p-4 mt-auto">
        <p></p>
        <p>
          Made with tons of
          <i className="pi pi-heart-fill text-red-500 px-1" />
          by{" "}
          <a
            className="text-0"
            href="https://github.com/gloaysa/"
            target="_blank"
          >
            Guillermo Loaysa
          </a>
        </p>

        <p>
          <a
            className="text-0"
            href="https://github.com/gloaysa/profealex/issues"
            target="_blank"
          >
            ¿Problemas? Repórtalos aquí
            <i className="pi pi-github px-2" />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
