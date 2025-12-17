import React, { useState, useRef } from 'react';
import { Upload, Download, Loader2, Sparkles, X, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { generatePFP } from '../services/geminiService';
import { Modifiers } from '../types';

export const Generator: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modifiers, setModifiers] = useState<Modifiers[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleModifier = (modifier: Modifiers) => {
    setModifiers(prev => {
      if (modifier === 'Group') {
        if (prev.includes('Group')) {
          return prev.filter(m => !['Group', 'Diamond Cross', 'Cuban Chain'].includes(m));
        } else {
          const others = prev.filter(m => !['Diamond Cross', 'Cuban Chain'].includes(m));
          return [...others, 'Diamond Cross', 'Cuban Chain', 'Group'];
        }
      }

      if (prev.includes(modifier)) {
        return prev.filter(m => m !== modifier && m !== 'Group');
      } else {
        const newMods = prev.filter(m => {
          if (m === 'Group') return false;
          if (modifier === 'Diamond Cross' && m === 'Cuban Chain') return false;
          if (modifier === 'Cuban Chain' && m === 'Diamond Cross') return false;
          return true;
        });
        return [...newMods, modifier];
      }
    });
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generatePFP(selectedImage, modifiers);
      setGeneratedImage(result);
    } catch (err) {
      setError("Generation failed. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tuff-pfp-${Date.now()}.png`; // Unique name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback for base64 or if fetch fails (just try opening/downloading direct)
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'tuff-pfp.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    setModifiers([]);
    setError(null);
  };

  return (
    <section className="flex-grow flex items-center justify-center px-6 py-12 md:py-0 min-h-[80vh]">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Column: Controls & Typography */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-white/30"></span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/50">AI Powered Generator</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-normal text-white mb-6 uppercase tracking-wider">
              FORGE<br />YOUR<br /><span className="text-white/40">LEGACY</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed tracking-wide font-semibold">
              Upload your photo. Select your artifacts. Let the algorithm strictly enhance your aura with the signature TUFF aesthetic.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-white/70">Select Modifiers</label>
              <div className="flex flex-wrap gap-3">
                {(['Diamond Cross', 'Cuban Chain', 'Group'] as Modifiers[]).map((mod) => (
                  <button
                    key={mod}
                    onClick={() => toggleModifier(mod)}
                    className={`
                                relative overflow-hidden px-5 py-3 border transition-all duration-300 group rounded-xl
                                ${modifiers.includes(mod)
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 bg-transparent text-white hover:border-white/60'
                      }
                            `}
                  >
                    <span className="relative z-10 text-xs font-black uppercase tracking-wider">{mod}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile-only Upload Button if not already showing image */}
            {!selectedImage && (
              <div className="lg:hidden">
                <Button onClick={() => fileInputRef.current?.click()} fullWidth>
                  Upload Image
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Interface */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-white/10 to-transparent opacity-20 blur-lg rounded-2xl"></div>

          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl backdrop-blur-sm">
            {/* Header of the Card */}
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                {isGenerating ? 'Processing...' : generatedImage ? 'Render Complete' : 'Awaiting Input'}
              </div>
            </div>

            {/* Main Canvas Area */}
            <div
              className={`
                        aspect-square w-full rounded-lg overflow-hidden relative border border-white/5 bg-[#050505] transition-all
                        ${!selectedImage ? 'cursor-pointer hover:bg-[#0f0f0f] hover:border-white/20' : ''}
                    `}
              onClick={() => !selectedImage && fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {!selectedImage ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 group">
                  <Upload className="w-12 h-12 mb-4 text-white/10 group-hover:text-white/40 transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-widest">Drop Image Here</span>
                </div>
              ) : (
                <div className="w-full h-full relative group">
                  <img
                    src={generatedImage || selectedImage}
                    alt="Subject"
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isGenerating ? 'opacity-50 grayscale' : 'opacity-100'}`}
                  />

                  {/* Loading Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white blur-xl opacity-20 animate-pulse"></div>
                        <Loader2 className="w-12 h-12 text-white animate-spin relative z-10" />
                      </div>
                    </div>
                  )}

                  {/* Reset Button */}
                  {!isGenerating && (
                    <button
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded hover:bg-white hover:text-black transition-colors border border-white/10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Card Actions */}
            <div className="mt-4 flex gap-3">
              {generatedImage ? (
                <>
                  <Button onClick={handleDownload} fullWidth className="bg-white text-black hover:bg-gray-200">
                    <Download className="w-4 h-4 mr-2 inline" /> Save Asset
                  </Button>
                  <Button onClick={reset} variant="outline" className="px-4">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedImage || isGenerating}
                  fullWidth
                  variant={!selectedImage ? 'ghost' : 'primary'}
                  className={!selectedImage ? 'border border-dashed border-white/20 text-white/40' : ''}
                >
                  {isGenerating ? 'Forging...' : !selectedImage ? 'Upload to Activate' : 'Generate PFP'}
                </Button>
              )}
            </div>

            {error && (
              <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-xs font-bold uppercase tracking-wide text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};