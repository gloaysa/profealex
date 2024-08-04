import { StageType, ICA, IStage } from "./curriculum.interface.ts";

export const stages: IStage[] = [
  { code: StageType.PRIMARIA, label: "Educación Primaria" },
  { code: StageType.ESO, label: "Educación Secundaria" },
  { code: StageType.BACH, label: "Bachillerato" },
];

export const COMUNIDADES_AUTONOMAS: ICA[] = [
  {
    label: "Comunidad de Madrid",
    code: "comunidad-de-madrid",
    stages,
    migrated: true,
  },
  { label: "Andalucía", code: "andalucia", stages, migrated: false },
  { label: "Aragón", code: "aragon", stages, migrated: false },
  { label: "Canarias", code: "canarias", stages, migrated: false },
  { label: "Cantabria", code: "cantabria", stages, migrated: false },
  {
    label: "Castilla-La Mancha",
    code: "castilla-la-mancha",
    stages,
    migrated: false,
  },
  {
    label: "Castilla y León",
    code: "castilla-y-leon",
    stages,
    migrated: false,
  },
  { label: "Cataluña", code: "cataluna", stages, migrated: false },

  {
    label: "Comunidad Foral de Navarra",
    code: "comunidad-foral-de-navarra",
    stages,
    migrated: false,
  },
  {
    label: "Comunitat Valenciana",
    code: "comunitat-valenciana",
    stages,
    migrated: false,
  },
  { label: "Extremadura", code: "extremadura", stages, migrated: false },
  { label: "Galicia", code: "galicia", stages, migrated: false },
  { label: "Illes Balears", code: "illes-balears", stages, migrated: false },
  { label: "La Rioja", code: "la-rioja", stages, migrated: false },
  { label: "Nacional", code: "nacional", stages, migrated: false },
  { label: "País Vasco", code: "pais-vasco", stages, migrated: false },
  {
    label: "Principado de Asturias",
    code: "principado-de-asturias",
    stages,
    migrated: false,
  },
  {
    label: "Región de Murcia",
    code: "region-de-murcia",
    stages,
    migrated: false,
  },
];
