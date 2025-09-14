import { useEffect, useState } from 'react';

const ShootingStars = () => {
  const [stars, setStars] = useState<Array<{ id: number; delay: number; left: string; top: string }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }));
      setStars(newStars);
    };

    generateStars();
    const interval = setInterval(generateStars, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;