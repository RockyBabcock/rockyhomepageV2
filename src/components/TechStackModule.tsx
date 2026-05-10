import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhysicsStack } from './PhysicsStack';
import { OrbitalStack } from './OrbitalStack';
import { GridStack } from './GridStack';
import { TemperatureSlider } from './TemperatureSlider';
import { techStackData, TechItem } from '../data/techStack';
import { X, ExternalLink, Code2 } from 'lucide-react';

type DisplayMode = 'physics' | 'orbital' | 'grid';

export const TechStackModule: React.FC = () => {
  const [mode, setMode] = useState<DisplayMode>('grid'); // Default to grid for mobile, will update in useEffect
  const [temperature, setTemperature] = useState(50);
  const [selectedItem, setSelectedItem] = useState<TechItem | null>(null);
  const [clickedFrontend, setClickedFrontend] = useState<Set<string>>(new Set());
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [techData, setTechData] = useState<TechItem[]>(techStackData);

  const handleIconClick = (item: TechItem) => {
    setSelectedItem(item);
    
    if (item.category === 'frontend') {
      setClickedFrontend(prev => {
        const newSet = new Set(prev);
        newSet.add(item.id);
        
        const totalFrontend = techData.filter(t => t.category === 'frontend').length;
        if (newSet.size === totalFrontend && !showEasterEgg) {
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 5000); // Hide after 5s
          
          // Unlock HTMX
          if (techData.length === techStackData.length) {
            const secretTech: TechItem = {
              id: 'htmx',
              name: 'HTMX',
              category: 'frontend',
              level: 'advanced',
              description: 'Fun Fact: HTMX allows you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext.',
              projects: [{ name: 'Secret Project', url: '#', desc: '', repo: '', image: '' }],
              proficiency: 5
            };
            setTechData(current => [...current, secretTech]);
          }
        }
        return newSet;
      });
    } else {
      setClickedFrontend(new Set()); // Reset if non-frontend clicked
    }
  };

  // Initialize from local storage and handle responsive default
  useEffect(() => {
    const savedMode = localStorage.getItem('techStackMode') as DisplayMode;
    const savedTemp = localStorage.getItem('techStackTemp');
    
    if (savedTemp) setTemperature(parseInt(savedTemp));
    
    if (window.innerWidth < 768) {
      setMode('grid'); // Force grid on mobile
    } else if (savedMode) {
      setMode(savedMode);
    } else {
      setMode('physics'); // Default for desktop
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && mode !== 'grid') {
        setMode('grid');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mode]);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('techStackMode', mode);
    localStorage.setItem('techStackTemp', temperature.toString());
  }, [mode, temperature]);

  const handleModeToggle = () => {
    const modes: DisplayMode[] = ['physics', 'orbital', 'grid'];
    const currentIndex = modes.indexOf(mode);
    setMode(modes[(currentIndex + 1) % modes.length]);
  };

  // Background Hue Shift based on temperature (Blue -> Red)
  // 0 -> hue-rotate(-60deg) (Blueish)
  // 50 -> hue-rotate(0deg) (Normal)
  // 100 -> hue-rotate(60deg) (Reddish)
  const hueShift = (temperature - 50) * 1.2;

  return (
    <div 
      className="w-full h-[600px] relative rounded-3xl overflow-hidden flex flex-col transition-all duration-500" 
      style={{ 
        background: 'linear-gradient(135deg, #E8D5C4 0%, #D4C4B0 100%)',
        filter: `hue-rotate(${hueShift}deg)`
      }}
    >
      {/* Heatwave Blur Overlay */}
      {temperature > 50 && (
        <div 
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            backdropFilter: `blur(${(temperature - 50) / 10}px)`,
            opacity: (temperature - 50) / 50
          }}
        />
      )}

      {/* Glassmorphism Card Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 shadow-2xl pointer-events-none z-0"></div>
        
      {/* Header & Toggle */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-40 pointer-events-none">
          <h2 className="font-mono text-xl font-bold text-gray-800 tracking-tight">Tech Stack</h2>
          
          <button 
            onClick={handleModeToggle}
            className="pointer-events-auto flex gap-1.5 p-2 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full transition-all shadow-sm"
            title="Toggle Display Mode"
          >
            <div className={`w-2 h-2 rounded-full transition-colors ${mode === 'physics' ? 'bg-gray-800' : 'bg-gray-400'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${mode === 'orbital' ? 'bg-gray-800' : 'bg-gray-400'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${mode === 'grid' ? 'bg-gray-800' : 'bg-gray-400'}`} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow relative mt-12 mb-20">
          <AnimatePresence mode="wait">
            {mode === 'physics' && (
              <motion.div
                key="physics"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <PhysicsStack temperature={temperature} onIconClick={handleIconClick} techData={techData} />
              </motion.div>
            )}
            {mode === 'orbital' && (
              <motion.div
                key="orbital"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <OrbitalStack temperature={temperature} onIconClick={handleIconClick} techData={techData} />
              </motion.div>
            )}
            {mode === 'grid' && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <GridStack temperature={temperature} onIconClick={handleIconClick} techData={techData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer & Slider */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white/40 to-transparent z-40 pointer-events-none">
          <div className="pointer-events-auto">
            <TemperatureSlider temperature={temperature} setTemperature={setTemperature} />
          </div>
        </div>

        {/* Easter Egg Overlay */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
              className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none"
            >
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-1 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.5)]">
                <div className="bg-ink text-white px-8 py-6 rounded-[22px] flex flex-col items-center text-center">
                  <span className="text-4xl mb-2">🎉</span>
                  <h3 className="font-headline font-black text-2xl mb-1 bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
                    Frontend Master!
                  </h3>
                  <p className="text-sm text-white/80 font-mono">
                    You found all the frontend technologies.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Overlay */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  className="h-24 w-full relative bg-ink"
                >
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="absolute -bottom-8 left-6 w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center font-bold text-xl font-mono text-ink">
                    {selectedItem.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                
                <div className="pt-10 px-6 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-gray-900 font-mono">{selectedItem.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-ink">
                      {selectedItem.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {selectedItem.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Related Projects</h4>
                    <div className="space-y-2">
                      {selectedItem.projects.map((project, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                          {project.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full py-3 rounded-3xl font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 bg-ink">
                    View Projects <ExternalLink size={16} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};
