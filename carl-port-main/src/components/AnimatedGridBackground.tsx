import { useState, useEffect } from "react";

export const AnimatedGridBackground = () => {
    const [filledCells, setFilledCells] = useState(new Set());
    const [totalCells, setTotalCells] = useState(0);

    // Calculate total cells based on screen size
    useEffect(() => {
        const calculateCells = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Determine cell size based on screen width
            let cellSize = 50;
            if (width < 400) cellSize = 25;
            else if (width < 640) cellSize = 30;
            else if (width < 768) cellSize = 35;
            else if (width < 1024) cellSize = 40;
            else if (width < 1280) cellSize = 45;
            
            const cols = Math.ceil(width / cellSize);
            const rows = Math.ceil(height / cellSize);
            const total = cols * rows;
            
            setTotalCells(total);
        };

        calculateCells();
        window.addEventListener('resize', calculateCells);
        
        return () => window.removeEventListener('resize', calculateCells);
    }, []);

    // Animation effect for random fills
    useEffect(() => {
        if (totalCells === 0) return;

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * totalCells);
            setFilledCells(prev => {
                const newSet = new Set(prev);
                if (newSet.has(randomIndex)) {
                    newSet.delete(randomIndex);
                } else {
                    newSet.add(randomIndex);
                }
                // Keep only 20-30 cells filled at a time
                if (newSet.size > 30) {
                    const firstItem = newSet.values().next().value;
                    newSet.delete(firstItem);
                }
                return newSet;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [totalCells]);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden bg-[#212529]">
            <div 
                className="w-full h-full grid gap-0"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
                    gridAutoRows: '50px',
                }}
            >
                {Array.from({ length: totalCells }).map((_, i) => (
                    <div
                        key={i}
                        className={`border border-gray-600 transition-all duration-500 ease-in-out ${
                            filledCells.has(i) ? 'bg-[#F8F8FF]' : 'bg-transparent'
                        }`}
                    />
                ))}
            </div>

            <style>{`
                @media (max-width: 400px) {
                    .grid {
                        grid-template-columns: repeat(auto-fill, minmax(25px, 1fr)) !important;
                        grid-auto-rows: 25px !important;
                    }
                }
                @media (min-width: 401px) and (max-width: 640px) {
                    .grid {
                        grid-template-columns: repeat(auto-fill, minmax(30px, 1fr)) !important;
                        grid-auto-rows: 30px !important;
                    }
                }
                @media (min-width: 641px) and (max-width: 768px) {
                    .grid {
                        grid-template-columns: repeat(auto-fill, minmax(35px, 1fr)) !important;
                        grid-auto-rows: 35px !important;
                    }
                }
                @media (min-width: 769px) and (max-width: 1024px) {
                    .grid {
                        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)) !important;
                        grid-auto-rows: 40px !important;
                    }
                }
                @media (min-width: 1025px) and (max-width: 1280px) {
                    .grid {
                        grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)) !important;
                        grid-auto-rows: 45px !important;
                    }
                }
            `}</style>
        </div>
    );
};