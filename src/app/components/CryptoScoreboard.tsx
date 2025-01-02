'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export default function CryptoScoreboard() {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,ripple,cardano,dogecoin,polkadot,chainlink,polygon,avalanche-2&order=market_cap_desc&sparkline=false'
        );
        if (!response.ok) {
          throw new Error('Kripto fiyatları yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setCryptoPrices(data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000); // Her 30 saniyede bir güncelle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/10 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-blue-400">CANLI KRİPTO FİYATLARI</h2>
      </div>

      <div className="space-y-2 h-[calc(100%-2rem)] overflow-y-auto scrollbar-thin scrollbar-track-[#1a1a1a] scrollbar-thumb-[#333] hover:scrollbar-thumb-[#444] pr-2">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-white/5 rounded-lg" />
            ))}
          </div>
        ) : (
          cryptoPrices.map((crypto) => (
            <div
              key={crypto.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {crypto.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {crypto.symbol.toUpperCase()}/USD
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  ${crypto.current_price.toLocaleString()}
                </div>
                <div
                  className={`text-xs ${
                    crypto.price_change_percentage_24h >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {crypto.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx global>{`
        /* Webkit (Chrome, Safari, Edge) için scrollbar özelleştirmesi */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 2px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 2px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        /* Firefox için scrollbar özelleştirmesi */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #333 #1a1a1a;
        }
      `}</style>
    </div>
  );
} 