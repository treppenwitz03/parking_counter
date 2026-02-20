import { useState, useEffect } from 'react';

export const useParkingData = () => {
  const [data, setData] = useState<Record<string, any>>({
    cet_vacant: 0, cet_total: 0, 
    sh_vacant: 0, sh_total: 0, 
    aeb_vacant: 0, aeb_total: 0,
    total_vacant: 0, update_time: "Loading..."
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8000/api/parking_data')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("API Error:", err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return data;
};