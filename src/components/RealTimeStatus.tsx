import { motion } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react';

interface RealTimeStatusProps {
  isConnected: boolean;
  isUpdating: boolean;
  lastUpdated: Date;
  sourceCount: number;
}

export function RealTimeStatus({ isConnected, isUpdating, lastUpdated, sourceCount }: RealTimeStatusProps) {
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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm"
    >
      <div className="flex items-center gap-2">
        {isUpdating ? (
          <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
        ) : isConnected ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        )}
        
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span className="text-xs font-medium text-gray-700">
            {sourceCount} fontes ativas
          </span>
        </div>
      </div>
      
      <div className="w-px h-3 bg-gray-300" />
      
      <span className="text-xs text-gray-600">
        Atualizado: {formatLastUpdated()}
      </span>
    </motion.div>
  );
}