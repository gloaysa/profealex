import { useCurriculumStore } from "@/store/curriculum/curriculum.store.ts";
import { Dropdown } from "primereact/dropdown";
import { ICA } from "@/store/curriculum/curriculum.interface.ts";
import { COMUNIDADES_AUTONOMAS } from "@/store/curriculum/ca.data.ts";

export const SubjectSelector = () => {
  const {
    selectedCA,
    getCA,
    selectedStage,
    setSelectedStage,
    courses,
    selectedCourse,
    setSelectedCourse,
    subjects,
    selectedSubject,
    setSelectedSubject,
  } = useCurriculumStore();

  return (
    <div className="flex flex-column md:flex-row gap-4 w-full p-2">
      <Dropdown
        value={selectedCA}
        options={COMUNIDADES_AUTONOMAS}
        filter
        onChange={(e) => {
          getCA(e.value.code);
        }}
        optionDisabled={(ca: ICA) => !ca.migrated}
        placeholder="Selecciona la Comunidad Autónoma"
      />

      <Dropdown
        value={selectedStage}
        disabled={!selectedCA}
        options={selectedCA?.stages}
        filter
        onChange={(e) => {
          setSelectedStage(e.value);
        }}
        placeholder="Etapa educativa"
      />

      <Dropdown
        value={selectedCourse}
        disabled={!selectedStage}
        options={courses}
        filter
        onChange={(e) => {
          setSelectedCourse(e.value);
        }}
        placeholder="Curso"
      />

      <Dropdown
        value={selectedSubject}
        disabled={!selectedCourse}
        options={subjects}
        filter
        onChange={(e) => {
          setSelectedSubject(e.value);
        }}
        placeholder="Asignatura"
      />
    </div>
  );
};
