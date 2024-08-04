import { useSituacionAprendizajeFormStore } from "@/store/situacion-aprendizaje-form/situacion-aprendizaje-form.store.ts";
import html2pdf from "html2pdf.js";
import { Button } from "primereact/button";
import { ReactNode, useRef } from "react";
import { SafeHtml } from "@components/SafeHtml/SafeHtml.mol.tsx";
import { useCurriculumStore } from "@/store/curriculum/curriculum.store.ts";

const PDFSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  if (!title) return null;

  return (
    <>
      <style>
        {`
          .pdf-section:has(> div:empty) {
            display: none;
          }
        `}
      </style>
      <section
        className="pdf-section"
        style={{
          breakInside: "avoid",
        }}
      >
        <h2
          className="text-center text-2xl bg-primary-400 border-round"
          style={{ pageBreakAfter: "avoid", pageBreakInside: "avoid" }}
        >
          {title}
        </h2>
        <div style={{ pageBreakInside: "avoid" }}>{children}</div>
      </section>
    </>
  );
};

const PDFHtmlField = ({
  title,
  content,
}: {
  title: string;
  content: string | undefined;
}) => {
  if (!content) return null;
  return (
    <div>
      <h3
        className="text-color-secondary text-xl underline"
        style={{ pageBreakAfter: "avoid", pageBreakInside: "avoid" }}
      >
        {title}
      </h3>
      <div className="bg-primary-100 border-round p-2">
        <SafeHtml
          html={content}
          className="line-height-4 "
          style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
        />
      </div>
    </div>
  );
};

const PDFHtmlList = ({
  title,
  items,
}: {
  title: string;
  items: { code: string; label: string }[];
}) => {
  if (!items.length) return null;
  return (
    <div style={{ breakInside: "avoid" }}>
      <h3
        className="text-color-secondary text-xl underline"
        style={{ pageBreakAfter: "avoid", pageBreakInside: "avoid" }}
      >
        {title}
      </h3>
      <ul className="list-none">
        {items.map((item) => (
          <li
            key={item.code}
            className="line-height-4 mb-2 bg-primary-100 border-round p-2"
            style={{
              breakInside: "avoid",
            }}
          >
            <span>
              <strong>{item.code}</strong> - {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const FormCreatePdf = () => {
  const {
    basicInfo,
    aspectosCurriculares,
    actividades,
    metodologia,
    transversalidad,
    atencionInclusiva,
    evaluacion,
    otrosAspectos,
    sesiones,
  } = useSituacionAprendizajeFormStore();

  const { selectedCourse, selectedSubject } = useCurriculumStore();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPdf = () => {
    const input = componentRef.current;
    if (!input) return;

    const opt = {
      margin: 1,
      filename: `Situación de aprendizaje - ${basicInfo.title.text}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
    };

    html2pdf().set(opt).from(input).save();
  };

  if (!selectedSubject || !selectedCourse) return null;
  if (!basicInfo.title.text) return null;

  return (
    <div>
      <article
        ref={componentRef}
        className="flex flex-column gap-4 p-6 bg-white text-sm my-0 mx-auto"
        style={{
          width: "595pt", // Set maxWidth to A4 width
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <section style={{ pageBreakAfter: "always" }}>
          <h1
            className="text-primary text-center text-3xl"
            style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
          >
            Situación de aprendizaje: {basicInfo.title.text}
          </h1>
          <div className="border-1 border-round surface-border p-2">
            <p style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
              <strong>Curso:</strong> {selectedCourse.label}
            </p>
            <p style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
              <strong>Área:</strong> {selectedSubject.label}
            </p>
            <p style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
              <strong>Temporalización:</strong> {basicInfo.temporalizacion.text}
            </p>
            <p style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
              <strong>Sesiones:</strong> {basicInfo.sesiones.text}
            </p>
          </div>

          <PDFHtmlField
            title="Justificación"
            content={basicInfo.justificacion.html}
          />

          <PDFHtmlField
            title="Descripción"
            content={basicInfo.descripcion.html}
          />

          <PDFHtmlField
            title="Producto final"
            content={basicInfo.productoFinal.html}
          />
        </section>

        <PDFSection title="Aspectos curriculares">
          <PDFHtmlList
            title="Objetivos generales"
            items={aspectosCurriculares.objetivosGenerales}
          />
          <PDFHtmlList
            title="Competencias clave"
            items={aspectosCurriculares.competenciasClave}
          />
          <PDFHtmlList
            title="Descriptores operativos"
            items={aspectosCurriculares.descriptoresOperativos}
          />
          <PDFHtmlList
            title="Perfil de salida"
            items={aspectosCurriculares.perfilSalida}
          />
          <PDFHtmlList
            title="Competencias específicas"
            items={aspectosCurriculares.competenciasEspecificas}
          />
          <PDFHtmlList
            title="Criterios de evaluación"
            items={aspectosCurriculares.criteriosEvaluacion}
          />
          <PDFHtmlList
            title="Saberes básicos"
            items={aspectosCurriculares.saberesBasicos}
          />
        </PDFSection>

        <PDFSection title="Actividades">
          <PDFHtmlField
            title="Conocimientos previos"
            content={actividades.conocimientosPrevios.html}
          />
          <PDFHtmlField
            title="Desarrollo"
            content={actividades.desarrollo.html}
          />
          <PDFHtmlField title="Síntesis" content={actividades.sintesis.html} />
          <PDFHtmlField
            title="Evaluación"
            content={actividades.evaluacion.html}
          />
        </PDFSection>

        <PDFSection title="Metodología">
          <PDFHtmlField
            title="Agrupamiento"
            content={metodologia.agrupamiento.html}
          />
          <PDFHtmlField title="Espacios" content={metodologia.espacios.html} />
          <PDFHtmlField title="Recursos" content={metodologia.recursos.html} />
          <PDFHtmlField
            title="Fundamentos metodológicos"
            content={metodologia.fundamentosMetodologicos.html}
          />
        </PDFSection>

        <PDFSection title="Transversalidad">
          <PDFHtmlList title="ODS" items={transversalidad.ods} />
          <PDFHtmlField
            title="Vinculaciones"
            content={transversalidad.vinculaciones.html}
          />
        </PDFSection>

        <PDFSection title="Atención a la inclusión educativa">
          <PDFHtmlList
            title="Principios DUA"
            items={atencionInclusiva.principiosDUA}
          />
          <PDFHtmlList title="Pautas DUA" items={atencionInclusiva.pautasDUA} />
        </PDFSection>

        <PDFSection title="Evaluación">
          <PDFHtmlField title="Alumnos" content={evaluacion.alumnos.html} />
          <PDFHtmlField
            title="Autoevaluación"
            content={evaluacion.autoevaluacion.html}
          />
          <PDFHtmlField
            title="Propuestas de mejora"
            content={evaluacion.propuestasMejora.html}
          />
        </PDFSection>

        <PDFSection title="Otros aspectos">
          <PDFHtmlField
            title="Herramientas TIC"
            content={otrosAspectos.herramientasTIC.html}
          />
          <PDFHtmlField
            title="Fundamentos del proyecto"
            content={otrosAspectos.fundamentosProyecto.html}
          />
          <PDFHtmlField
            title="Difusión"
            content={otrosAspectos.difusion.html}
          />
        </PDFSection>

        <PDFSection title="Sesiones">
          {sesiones.map((sesion) => (
            <div
              key={sesion.code}
              style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
            >
              <h2 style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
                {sesion.title.text}
              </h2>
              <p style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
                Temporización: {sesion.temporalizacion.text}
              </p>
              <PDFHtmlField title="Objetivos" content={sesion.objetivos.html} />
              <PDFHtmlField title="Recursos" content={sesion.recursos.html} />
              <PDFHtmlField
                title="Actividades"
                content={sesion.actividades.html}
              />
              <PDFHtmlField
                title="Seguimiento"
                content={sesion.seguimiento.html}
              />
            </div>
          ))}
        </PDFSection>
      </article>
      <Button onClick={handleDownloadPdf}>Descargar como PDF</Button>
    </div>
  );
};
