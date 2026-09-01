import { CV as RAW } from "./cv-raw.js";
import type { Locale } from "./i18n";

export interface CvExperience {
  period: string;
  role: string;
  company: string;
  client: string;
  location: string;
  context: string;
  bullets: string[];
  stack: string[];
}

export interface CvCaseStudy {
  tag: string;
  title: string;
  lead: string;
  blocks: { h: string; p: string }[];
}

export interface CvData {
  role: string;
  tagline: string;
  summary: string[];
  facts: { l: string; v: string }[];
  metrics: { v: string; l: string }[];
  experiences: CvExperience[];
  priorNote: string;
  caseStudies: CvCaseStudy[];
  education: { degree: string; school: string; place: string; year: string };
  certifications: { name: string; issuer: string; status: string }[];
  languages: { name: string; level: string }[];
  skills: { label: string; items: string[] }[];
}

export function cv(lang: Locale): CvData {
  return (RAW as Record<Locale, CvData>)[lang];
}
