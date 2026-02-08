import { motion } from 'framer-motion';
import { ExternalLink, MapPin, DollarSign, Building2, TrendingUp } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const today = new Date();
  const postedDate = new Date(job.postedAt);
  const daysAgo = Math.floor((today.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const typeColors = {
    'CLT': 'bg-green-100 text-green-800 border-green-200',
    'PJ': 'bg-blue-100 text-blue-800 border-blue-200',
    'Estágio': 'bg-purple-100 text-purple-800 border-purple-200',
    'Freelancer': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const countryFlags: Record<string, string> = {
    'BR': '🇧🇷',
    'PT': '🇵🇹',
    'US': '🇺🇸',
    'UK': '🇬🇧',
    'DE': '🇩🇪',
    'CA': '🇨🇦',
    'NL': '🇳🇱',
    'ES': '🇪🇸',
    'AU': '🇦🇺',
    'IE': '🇮🇪',
    'NZ': '🇳🇿'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)' }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer group hover:border-indigo-300 transition-all"
    >
      {/* Header with Urgent Badge */}
      <div className="relative">
        <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
        {job.urgent && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
              URGENTE
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Company & Logo */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-0.5 flex-shrink-0 group-hover:from-indigo-50 group-hover:to-purple-50 transition-all">
            <img
              src={job.logo}
              alt={job.company}
              className="w-full h-full rounded-lg object-contain bg-white"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=' + job.company[0];
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{job.company}</span>
              <span className="text-lg">{countryFlags[job.country] || '🌍'}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[job.type] || 'bg-gray-100 text-gray-800'}`}>
            {job.type}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            {job.modality}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            {job.source}
          </span>
        </div>

        {/* Location & Salary */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-green-700">{job.salary}</span>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {job.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
              +{job.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            <span>{job.views?.toLocaleString()} visualizações</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {daysAgo === 0 ? 'Hoje' : daysAgo === 1 ? 'Ontem' : `${daysAgo} dias atrás`}
            </span>
            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Ver Vaga
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
