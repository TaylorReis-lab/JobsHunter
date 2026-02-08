import { Coffee } from 'lucide-react';

export function BuyMeACoffee() {
  return (
    <a
      href="https://www.buymeacoffee.com/taylorreis"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="flex items-center gap-2 bg-[#FFDD00] text-black px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <Coffee className="w-5 h-5" />
        <span className="font-semibold text-sm">Buy me a coffee</span>
      </div>
    </a>
  );
}
