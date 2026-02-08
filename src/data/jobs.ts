import { Job } from '../types';

export const sources = [
  'LinkedIn Jobs',
  'Vagas.com.br',
  'InfoJobs',
  'Empregos.com.br',
  'DevVagas',
  'Indeed',
  'DevJobsScanner',
  'SlashJobs',
  'Jooble',
  'Adzuna',
  'Whatjobs',
  'Trabalhe Conosco (Direto)'
];

export const countries = [
  { code: 'all', name: 'Todos os Países', flag: '🌍' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'UK', name: 'Reino Unido', flag: '🇬🇧' },
  { code: 'DE', name: 'Alemanha', flag: '🇩🇪' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
  { code: 'NL', name: 'Holanda', flag: '🇳🇱' },
  { code: 'ES', name: 'Espanha', flag: '🇪🇸' },
  { code: 'AU', name: 'Austrália', flag: '🇦🇺' },
  { code: 'FR', name: 'França', flag: '🇫🇷' },
  { code: 'IT', name: 'Itália', flag: '🇮🇹' },
  { code: 'JP', name: 'Japão', flag: '🇯🇵' },
  { code: 'IN', name: 'Índia', flag: '🇮🇳' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CO', name: 'Colômbia', flag: '🇨🇴' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'ZA', name: 'África do Sul', flag: '🇿🇦' },
  { code: 'AE', name: 'Emirados Árabes', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapura', flag: '🇸🇬' },
  { code: 'IE', name: 'Irlanda', flag: '🇮🇪' },
  { code: 'NZ', name: 'Nova Zelândia', flag: '🇳🇿' },
  { code: 'CH', name: 'Suíça', flag: '🇨🇭' },
  { code: 'SE', name: 'Suécia', flag: '🇸🇪' }
];

const companies = [
  { name: 'Nubank', logo: 'https://logo.clearbit.com/nubank.com.br' },
  { name: 'Mercado Livre', logo: 'https://logo.clearbit.com/mercadolibre.com' },
  { name: 'iFood', logo: 'https://logo.clearbit.com/ifood.com.br' },
  { name: 'Stone', logo: 'https://logo.clearbit.com/stone.co' },
  { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
  { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com' },
  { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
  { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
  { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com' },
  { name: 'PicPay', logo: 'https://logo.clearbit.com/picpay.com' },
  { name: 'Banco Inter', logo: 'https://logo.clearbit.com/bancointer.com.br' },
  { name: 'Shopify', logo: 'https://logo.clearbit.com/shopify.com' },
  { name: 'Vercel', logo: 'https://logo.clearbit.com/vercel.com' },
  { name: 'Globo', logo: 'https://logo.clearbit.com/globo.com' },
  { name: 'Atlassian', logo: 'https://logo.clearbit.com/atlassian.com' },
  { name: 'Booking.com', logo: 'https://logo.clearbit.com/booking.com' },
  { name: 'Adyen', logo: 'https://logo.clearbit.com/adyen.com' },
  { name: 'XP Inc', logo: 'https://logo.clearbit.com/xpi.com.br' },
  { name: 'Itau', logo: 'https://logo.clearbit.com/itau.com.br' },
  { name: 'Bradesco', logo: 'https://logo.clearbit.com/bradesco.com.br' },
  { name: 'Totvs', logo: 'https://logo.clearbit.com/totvs.com' },
  { name: 'Buser', logo: 'https://logo.clearbit.com/buser.com.br' },
  { name: 'Hotmart', logo: 'https://logo.clearbit.com/hotmart.com' }
];

const roles = [
  'Senior Full Stack Developer', 'Backend Engineer', 'Tech Lead Frontend', 'DevOps Engineer', 
  'Software Engineer Python', 'QA Automation', 'Mobile Developer Flutter', 'iOS Developer',
  'Data Engineer', 'Machine Learning Engineer', 'Cloud Architect', 'Security Engineer',
  'Site Reliability Engineer', 'Product Designer', 'Solutions Architect', 'Golang Developer',
  'React Developer', 'Node.js Backend Developer', 'Java Software Engineer', 'Data Scientist'
];

const techs = [
  ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
  ['Java', 'Spring Boot', 'Kafka', 'MySQL', 'Redis'],
  ['Python', 'Django', 'FastAPI', 'Docker', 'Kubernetes'],
  ['Go', 'gRPC', 'PostgreSQL', 'Kubernetes', 'AWS'],
  ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines'],
  ['Swift', 'SwiftUI', 'Combine', 'Core Data'],
  ['Ruby on Rails', 'MySQL', 'Redis', 'GraphQL'],
  ['Scala', 'Spark', 'Airflow', 'BigQuery'],
  ['C++', 'RTOS', 'Python', 'MATLAB'],
  ['Flutter', 'Dart', 'Firebase', 'GraphQL']
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 300 highly realistic job postings
export const jobs: Job[] = Array.from({ length: 300 }).map((_, i) => {
  const company = getRandom(companies);
  const countryObj = getRandom(countries.filter(c => c.code !== 'all'));
  const type = getRandom(['CLT', 'PJ', 'Estágio', 'Freelancer', 'CLT', 'CLT']) as any;
  const modality = getRandom(['Presencial', 'Remoto', 'Híbrido', 'Remoto', 'Remoto']) as any;
  
  // Calculate postedAt dynamically (0 to 30 days ago)
  const daysAgo = getRandomInt(0, 30);
  const postedAt = new Date();
  postedAt.setDate(postedAt.getDate() - daysAgo);

  const isBr = countryObj.code === 'BR';
  const brSources = ['LinkedIn Jobs', 'Vagas.com.br', 'InfoJobs', 'Empregos.com.br', 'DevVagas', 'Trabalhe Conosco (Direto)', 'Gupy'];
  const intSources = ['LinkedIn Jobs', 'Indeed', 'DevJobsScanner', 'SlashJobs', 'Jooble', 'Adzuna', 'Whatjobs', 'Trabalhe Conosco (Direto)'];
  
  return {
    id: `vaga-${i + 1}-${Date.now()}`,
    title: getRandom(roles),
    company: company.name,
    logo: company.logo,
    location: isBr ? getRandom(['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Florianópolis, SC', 'Remoto']) : `${countryObj.name}, (Remote)`,
    country: countryObj.code,
    type,
    modality,
    salary: isBr ? `R$ ${getRandomInt(5, 25)}.000` : `$ ${getRandomInt(60, 200)}.000/yr`,
    description: `Vaga imperdível para ${company.name}. Buscamos desenvolvedores que amam desafios, resolver problemas complexos em grande escala e trabalhar com tecnologias modernas. Candidate-se via ${isBr ? 'nossa plataforma brasileira parceira' : 'our global hiring portal'}.`,
    requirements: [
      `${getRandomInt(2, 7)}+ anos de experiência comprovada`,
      'Conhecimento sólido em Arquitetura de Software',
      'Experiência com metodologias ágeis',
      'Boa comunicação e trabalho em equipe',
      'Inglês ' + (isBr ? 'intermediário/avançado' : 'fluente')
    ],
    benefits: [
      'Plano de Saúde e Odontológico premium',
      'Vale Alimentação / Refeição flexível',
      'Auxílio Home Office',
      'Gympass / TotalPass',
      'Orçamento anual para educação e cursos'
    ],
    technologies: getRandom(techs),
    source: isBr ? getRandom(brSources) : getRandom(intSources),
    sourceUrl: `https://www.${company.name.toLowerCase().replace(' ', '')}.com/careers/job/${i}`,
    postedAt: postedAt.toISOString(),
    urgent: Math.random() > 0.85,
    views: getRandomInt(10, 5000)
  };
});
