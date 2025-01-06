'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CryptoScoreboard() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,ripple,cardano,dogecoin,polkadot,chainlink,polygon,avalanche-2&order=market_cap_desc&per_page=10&page=1&sparkline=false',
        {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const data = await response.json();
      setPrices(data);
      setError(null);
    } catch (err) {
      console.error('Kripto fiyatları yüklenirken hata:', err);
      setError('Fiyatlar yüklenemedi. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="bg-[#111111] rounded-lg p-4 h-full">
        <h2 className="text-xl font-bold mb-4">Canlı Kripto Fiyatları</h2>
        <div className="text-red-400 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] rounded-lg p-4 h-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Canlı Kripto Fiyatları</h2>
      <div className="space-y-4 overflow-y-auto h-[calc(100%-4rem)] custom-scrollbar">
        {isLoading ? (
          // Loading durumu
          Array(10).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-800 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-gray-800 rounded"></div>
            </div>
          ))
        ) : (
          prices.map((price) => (
            <div key={price.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={price.image}
                  alt={price.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-medium">{price.symbol.toUpperCase()}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">
                  ${price.current_price.toLocaleString()}
                </span>
                <span
                  className={`text-sm ${
                    price.price_change_percentage_24h >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {price.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
} 