import { SubjectSelector } from "@components/SubjectSelector/SubjectSelector.component.tsx";
import { SituacionAprendizaje } from "@pages/SituacionAprendizaje/SituacionAprendizaje.page.tsx";
import { Image } from "primereact/image";

function App() {
  return (
    <div
      className="flex flex-column surface-ground h-full w-full"
      style={{ maxWidth: "2100px", minHeight: "100vh" }}
    >
      <div className="w-full h-full">
        <div className="flex gap-2 align-items-center border-round surface-border border-1">
          <Image width="100px" src="/icon512_rounded.png" />
          <div className="flex flex-column gap-2 justify-content-center">
            <span className="text-3xl text-center text-primary">ProfeAlex</span>
            <small>Herramientas educativas</small>
          </div>
        </div>
        <SubjectSelector />

        <SituacionAprendizaje />
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
            ¿Problemas? Reportalos aquí
            <i className="pi pi-github px-2" />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
