import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Globe, 
  ChevronLeft, ChevronRight, Sparkles, RefreshCw, 
  ExternalLink, Github, Database, Clock, TrendingUp
} from 'lucide-react';
import { countries, sources } from './data/countries';
import { Job, Filters } from './types';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { BuyMeACoffee } from './components/BuyMeACoffee';
import { RealTimeStatus } from './components/RealTimeStatus';
import { fetchAllJobs } from './services/jobService';

const JOBS_PER_PAGE = 12;

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    country: 'all',
    type: 'all',
    modality: 'all',
    technology: 'all',
    source: 'all',
    daysAgo: 'all'
  });
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  // Carregar vagas reais ao montar o componente
  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const realJobs = await fetchAllJobs();
        setJobs(realJobs);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadJobs();
  }, []);

  // Simulate real-time data fetching
  const simulateFetch = () => {
    setIsLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 800);
  };

  // Auto update every 24 hours simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setLastUpdated(new Date());
        setIsUpdating(false);
      }, 2000);
    }, 86400000); // 24 hours

    return () => clearInterval(interval);
  }, []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const searchMatch = 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.technologies.some(tech => tech.toLowerCase().includes(filters.search.toLowerCase()));
      
      const countryMatch = filters.country === 'all' || job.country === filters.country;
      const typeMatch = filters.type === 'all' || job.type === filters.type;
      const modalityMatch = filters.modality === 'all' || job.modality === filters.modality;
      const techMatch = filters.technology === 'all' || job.technologies.includes(filters.technology);
      const sourceMatch = filters.source === 'all' || job.source === filters.source;
      
      let dateMatch = true;
      if (filters.daysAgo !== 'all') {
        const today = new Date();
        const postedDate = new Date(job.postedAt);
        const daysDiff = Math.floor((today.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
        dateMatch = daysDiff <= parseInt(filters.daysAgo);
      }
      
      return searchMatch && countryMatch && typeMatch && modalityMatch && techMatch && sourceMatch && dateMatch;
    });
  }, [filters, jobs]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    jobs.forEach(job => job.technologies.forEach(tech => techs.add(tech)));
    return Array.from(techs).sort();
  }, [jobs]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: filteredJobs.length,
      countries: new Set(filteredJobs.map((j: Job) => j.country)).size,
      sources: new Set(filteredJobs.map((j: Job) => j.source)).size,
      avgViews: Math.round(filteredJobs.reduce((acc: number, j: Job) => acc + (j.views || 0), 0) / filteredJobs.length) || 0
    };
  }, [filteredJobs]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    simulateFetch();
  }, [filters]);

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes} min atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    return '1 dia atrás';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  JOBS HUNTER
                </h1>
                <p className="text-xs text-gray-500 font-medium">Rastreador de Vagas Tech</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Last Updated */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Atualizado: {formatLastUpdated()}
                </span>
                {isUpdating && (
                  <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
                )}
              </div>
              
              <a
                href="https://github.com/TaylorReis-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">TaylorReis-lab</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Encontre sua vaga dos sonhos
            </h2>
            <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
              Rastreamento em tempo real de vagas para desenvolvedores em todas as plataformas do mundo
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Database className="w-6 h-6 mx-auto mb-2 text-indigo-300" />
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-indigo-200">Vagas ativas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Globe className="w-6 h-6 mx-auto mb-2 text-indigo-300" />
                <p className="text-2xl font-bold">{stats.countries}</p>
                <p className="text-sm text-indigo-200">Países</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <ExternalLink className="w-6 h-6 mx-auto mb-2 text-indigo-300" />
                <p className="text-2xl font-bold">{stats.sources}</p>
                <p className="text-sm text-indigo-200">Fontes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-indigo-300" />
                <p className="text-2xl font-bold">{stats.avgViews}</p>
                <p className="text-sm text-indigo-200">Views/vaga</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cargo, empresa ou tecnologia..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            
            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <select
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">🌍 Todos Países</option>
                {countries.filter((c: any) => c.code !== 'all').map((country: any) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
              
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">💼 Todos Tipos</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estágio">Estágio</option>
                <option value="Freelancer">Freelancer</option>
              </select>
              
              <select
                value={filters.modality}
                onChange={(e) => setFilters({ ...filters, modality: e.target.value })}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">🏢 Todas Modalidades</option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Híbrido">Híbrido</option>
              </select>
              
              <select
                value={filters.technology}
                onChange={(e) => setFilters({ ...filters, technology: e.target.value })}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">⚡ Todas Techs</option>
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
              
              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">🔗 Todas Fontes</option>
                {sources.map((source: string) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>

              <select
                value={filters.daysAgo}
                onChange={(e) => setFilters({ ...filters, daysAgo: e.target.value })}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">📅 Qualquer Data</option>
                <option value="1">Últimas 24 horas</option>
                <option value="3">Últimos 3 dias</option>
                <option value="7">Última semana</option>
                <option value="15">Últimos 15 dias</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-bold text-gray-900">{paginatedJobs.length}</span> de{' '}
            <span className="font-bold text-gray-900">{filteredJobs.length}</span> vagas
            {filters.country !== 'all' && (
              <span> em {countries.find((c: any) => c.code === filters.country)?.flag} {countries.find((c: any) => c.code === filters.country)?.name}</span>
            )}
          </p>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-sm font-medium">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-6" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-20" />
                    <div className="h-6 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jobs Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <AnimatePresence mode="popLayout">
                {paginatedJobs.map((job: Job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <JobCard 
                      job={job} 
                      onClick={() => setSelectedJob(job)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {paginatedJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
                <p className="text-gray-600">Tente ajustar seus filtros para ver mais resultados</p>
              </motion.div>
            )}

            {/* Pagination Bottom */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  Primeira
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum = currentPage - 2 + i;
                    if (pageNum < 1) pageNum = i + 1;
                    if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                    if (pageNum < 1 || pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white'
                            : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  Última
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">JOBS HUNTER</h3>
                  <p className="text-xs text-gray-400">by Taylor Reis</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Rastreador de vagas tech em tempo real. 
                Encontre oportunidades em todo o mundo.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Fontes de Vagas</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>LinkedIn Jobs</li>
                <li>Indeed</li>
                <li>Gupy</li>
                <li>Glassdoor</li>
                <li>Amazon Jobs</li>
                <li>Google Careers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Desenvolvedor</h4>
              <p className="text-sm text-gray-400 mb-4">
                Criado com ❤️ por{' '}
                <a 
                  href="https://github.com/TaylorReis-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Taylor Reis
                </a>
              </p>
              <p className="text-xs text-gray-500">
                © 2025 Jobs Hunter. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      {/* Buy Me a Coffee */}
      <BuyMeACoffee />
    </div>
  );
}
