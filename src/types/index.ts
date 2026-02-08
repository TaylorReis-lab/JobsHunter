export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  country: string;
  type: 'CLT' | 'PJ' | 'Estágio' | 'Freelancer' | 'CLT';
  modality: 'Presencial' | 'Remoto' | 'Híbrido';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  technologies: string[];
  source: string;
  sourceUrl: string;
  postedAt: string;
  urgent?: boolean;
  views?: number;
}

export interface Filters {
  search: string;
  country: string;
  type: string;
  modality: string;
  technology: string;
  source: string;
  daysAgo: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}
