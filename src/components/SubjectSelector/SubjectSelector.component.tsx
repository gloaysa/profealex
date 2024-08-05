import { useEffect, useRef, useState } from "react";
import { useCurriculumStore } from "@/store/curriculum/curriculum.store.ts";
import { ICA } from "@/store/curriculum/curriculum.interface.ts";
import { COMUNIDADES_AUTONOMAS } from "@/store/curriculum/ca.data.ts";
import { Button } from "primereact/button";
import { Dropdown as PrimeDropdown } from "primereact/dropdown";
import { Dropdown } from "@components/Dropdown/Dropdown.component.tsx";
import { MenuItem } from "primereact/menuitem";
import { ConfirmButton } from "@components/ConfirmButton/ConfirmButton.mol.tsx";

export const SubjectSelector = () => {
  const {
    clear,
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

  const selectSubjectDropdownRef = useRef<PrimeDropdown>(null);
  const [breadCrumb, setBreadCrumb] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (selectedSubject) {
      setBreadCrumb([
        { label: selectedCA?.label, id: selectedCA?.code },
        { icon: "pi pi-chevron-right", id: "separator" },
        { label: selectedCourse?.label, id: selectedCourse?.code },
      ]);
    }
  }, [
    selectedCA?.code,
    selectedCA?.label,
    selectedCourse?.code,
    selectedCourse?.label,
    selectedSubject,
  ]);

  return (
    <div>
      <div
        className={`flex flex-column gap-2 transition-all transition-duration-1000 transition-ease-in-out ${selectedSubject ? "h-full fadeinleft" : "max-h-0 overflow-hidden fadeoutleft"}`}
      >
        <Dropdown
          ref={selectSubjectDropdownRef}
          className="w-full md:w-auto"
          placeholder="Asignatura"
          value={selectedSubject}
          disabled={!selectedCourse}
          options={subjects}
          filter
          onChange={(e) => {
            setSelectedSubject(e.value);
          }}
          showClear
          clearIcon={
            <ConfirmButton
              className="text-color-secondary"
              icon="pi pi-times-circle"
              text
              size="small"
              content="Si continúas, se perderán los datos del formulario, ¿estás seguro de que deseas continuar?"
              accept={() => {
                selectSubjectDropdownRef.current?.clear();
              }}
            />
          }
        />
        <div className="flex gap-2 pl-2 align-items-center text-xs">
          {breadCrumb.map((item) => (
            <span key={item.id}>
              {item.icon ? (
                <i className={`${item.icon} text-xs`}></i>
              ) : (
                item.label
              )}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`flex flex-column md:flex-row gap-4 transition-all transition-duration-1000 transition-ease-in-out ${!selectedSubject ? "h-full fadeinleft" : "max-h-0 overflow-hidden fadeoutleft"}`}
      >
        <Dropdown
          value={selectedCA}
          options={COMUNIDADES_AUTONOMAS}
          filter
          onChange={(e) => {
            getCA(e.value.code);
          }}
          optionDisabled={(ca: ICA) => !ca.migrated}
          placeholder="Selecciona la Comunidad Autónoma"
          showClear
          clearIcon={
            <Button
              className="text-color-secondary"
              icon="pi pi-times-circle"
              text
              size="small"
              onClick={() => clear()}
            />
          }
        />

        {!!selectedCA && (
          <Dropdown
            className="fadeinup md:fadeinleft animation-duration-100 animation-ease-in"
            value={selectedStage}
            disabled={!selectedCA}
            options={selectedCA?.stages}
            onChange={(e) => {
              setSelectedStage(e.value);
            }}
            placeholder="Etapa educativa"
          />
        )}

        {!!selectedStage && (
          <Dropdown
            className="fadeinup md:fadeinleft animation-duration-100 animation-ease-in"
            value={selectedCourse}
            disabled={!selectedStage}
            options={courses}
            onChange={(e) => {
              setSelectedCourse(e.value);
            }}
            placeholder="Curso"
          />
        )}

        {!!selectedCourse && (
          <Dropdown
            className="fadeinup md:fadeinleft animation-duration-100 animation-ease-in"
            placeholder="Asignatura"
            value={selectedSubject}
            disabled={!selectedCourse}
            options={subjects}
            filter
            onChange={(e) => {
              setSelectedSubject(e.value);
            }}
            showClear
            clearIcon={
              <Button
                className="text-color-secondary"
                icon="pi pi-times-circle"
                text
                size="small"
                onClick={clear}
              />
            }
          />
        )}
      </div>
    </div>
  );
};
