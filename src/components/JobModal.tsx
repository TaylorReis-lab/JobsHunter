import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, Building2, Calendar, ExternalLink, CheckCircle, Sparkles, Globe } from 'lucide-react';
import { Job } from '../types';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobModal({ job, isOpen, onClose }: JobModalProps) {
  if (!job) return null;

  const today = new Date();
  const postedDate = new Date(job.postedAt);
  const daysAgo = Math.floor((today.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

  const countryNames: Record<string, string> = {
    'BR': 'Brasil',
    'PT': 'Portugal',
    'US': 'Estados Unidos',
    'UK': 'Reino Unido',
    'DE': 'Alemanha',
    'CA': 'Canadá',
    'NL': 'Holanda',
    'ES': 'Espanha',
    'AU': 'Austrália',
    'IE': 'Irlanda',
    'NZ': 'Nova Zelândia'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-start justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-1">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full h-full rounded-lg object-contain bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=' + job.company[0];
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Building2 className="w-5 h-5" />
                    <span className="font-medium text-lg">{job.company}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                  {job.type}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                  {job.modality}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {job.salary}
                </span>
                {job.urgent && (
                  <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Urgente
                  </span>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Localização</p>
                    <p className="font-semibold text-gray-900">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">País</p>
                    <p className="font-semibold text-gray-900">{countryNames[job.country] || job.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Publicado</p>
                    <p className="font-semibold text-gray-900">
                      {daysAgo === 0 ? 'Hoje' : daysAgo === 1 ? 'Ontem' : `${daysAgo} dias atrás`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <DollarSign className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Fonte</p>
                    <p className="font-semibold text-gray-900">{job.source}</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Descrição da Vaga</h3>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Requisitos</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Benefícios</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Views */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <p className="text-center text-indigo-900 font-medium">
                  {job.views?.toLocaleString()} pessoas visualizaram esta vaga
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02]"
              >
                Candidatar-se na {job.source}
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
