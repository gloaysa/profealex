import { SituacionAprendizaje } from "@pages/SituacionAprendizaje/SituacionAprendizaje.page.tsx";
import { Image } from "primereact/image";
import { ErrorBoundary } from "@components/ErrorBoundary.tsx";
import { SituacionAprendizajeErrorBoundaryFallback } from "@pages/SituacionAprendizaje/s-a.error-boundary-fallback.tsx";

function App() {
  return (
    <div
      className="flex flex-column h-screen gap-2 md:gap-4"
      style={{ maxWidth: "2100px" }}
    >
      <header className="flex gap-2 align-items-center border-round surface-border border-1">
        <Image className="bounce-in" width="100px" src="/icon512_rounded.png" />
        <div className="flex flex-column gap-2">
          <span className="text-3xl text-primary">ProfeAlex</span>
          <small>Herramientas educativas</small>
        </div>
      </header>

      <div className="flex-1 flex flex-column gap-2 mx-2 md:mx-4 p-2 md:p-4 border-round surface-border border-1 ">
        <ErrorBoundary fallback={<SituacionAprendizajeErrorBoundaryFallback />}>
          <SituacionAprendizaje />
        </ErrorBoundary>
      </div>

      <footer className="flex flex-column gap-4 md:flex-row bg-primary align-items-center md:justify-content-between p-4 h-8rem">
        <span className="hidden md:block"></span>
        <span>
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
        </span>

        <span className="mb-2 md:mb-0">
          <a
            className="text-0"
            href="https://github.com/gloaysa/profealex/issues"
            target="_blank"
          >
            ¿Problemas? Repórtalos aquí
            <i className="pi pi-github px-2" />
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
