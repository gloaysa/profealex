import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  ICA,
  ICourse,
  IMateria,
  IStage,
  ISubject,
} from "./curriculum.interface.ts";
import { getMaterias } from "./curriculum.api.ts";
import { COMUNIDADES_AUTONOMAS } from "@/store/curriculum/ca.data.ts";

export interface CurriculumStore {
  selectedCA: ICA | undefined;
  getCA: (ca: string) => void;
  selectedStage: IStage | undefined;
  setSelectedStage: (stage: IStage | undefined) => void;
  courses: ICourse[];
  selectedCourse: ICourse | undefined;
  setSelectedCourse: (course: ICourse | undefined) => void;
  allMaterias: IMateria[];
  subjects: ISubject[];
  selectedSubject: ISubject | undefined;
  setSelectedSubject: (subject: ISubject | undefined) => void;
  clear: () => void;
}

const initialState = {
  selectedCA: undefined,
  selectedStage: undefined,
  courses: [],
  selectedCourse: undefined,
  allMaterias: [],
  subjects: [],
  selectedSubject: undefined,
};

export const useCurriculumStore = create<CurriculumStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        getCA: async (caCode: string) => {
          const selectedCA = COMUNIDADES_AUTONOMAS.find(
            (caItem) => caItem.code === caCode,
          );
          set({ selectedCA });
          get().setSelectedStage(undefined);

          const materias = await getMaterias(caCode);
          set({ allMaterias: materias });
        },
        setSelectedStage: (stage) => {
          set({ selectedStage: stage });
          set({ courses: [] });
          get().setSelectedCourse(undefined);
          if (!stage) return;

          const courses = get()
            .allMaterias.filter((mat) => mat.stage === stage.code)
            .flatMap((mat) => mat.courses);
          set({ courses });
        },
        setSelectedCourse: (course) => {
          set({ selectedCourse: course });
          set({ subjects: [] });
          get().setSelectedSubject(undefined);
          if (!course) return;

          const subjects = course.subjects;
          set({ subjects });
        },
        setSelectedSubject: async (subject) => {
          set({ selectedSubject: subject });
        },
        clear: () => {
          set({ ...initialState });
        },
      }),
      {
        name: "curriculum-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: "curriculum" },
  ),
);
