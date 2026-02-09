import { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries (keep button fully visible)
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;

    // Generate random position within safe boundaries
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  // Initialize No button position on mount
  useEffect(() => {
    if (containerRef.current && noButtonRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      const initialX = (container.width - button.width) / 2 + 150;
      const initialY = (container.height - button.height) / 2;
      setNoButtonPosition({ x: initialX, y: initialY });
    }
  }, []);

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4 overflow-hidden relative">
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-primary/20 animate-float"
              size={Math.random() * 30 + 20}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 3}s`
              }}
              fill="currentColor"
            />
          ))}
        </div>

        <div className="max-w-2xl w-full space-y-8 animate-fadeInUp relative z-10">
          {/* Success message */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Heart className="text-primary animate-heartbeat" size={80} fill="currentColor" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-primary">
              Good choice ❤️
            </h1>
          </div>

          {/* Meme image */}
          <div className="flex justify-center animate-scaleIn" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden shadow-soft-lg border-4 border-primary/20 max-w-md w-full">
              <img
                src="/assets/generated/valentine-meme-good-choice.dim_1024x1024.png"
                alt="Good choice meme"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Promise message */}
          <div className="text-center space-y-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-border">
              <p className="text-2xl md:text-3xl font-display text-foreground leading-relaxed">
                Promise I will always support u and protect u pondatiii ummmmaa
              </p>
            </div>
          </div>

          {/* Sparkles decoration */}
          <div className="flex justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Sparkles className="text-accent" size={32} />
            <Sparkles className="text-primary" size={40} />
            <Sparkles className="text-accent" size={32} />
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
          © 2026. Built with <Heart className="inline w-4 h-4 text-primary" fill="currentColor" /> using{' '}
          <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            caffeine.ai
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4 overflow-hidden relative"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 animate-float"
            size={Math.random() * 40 + 30}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 3}s`
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="max-w-2xl w-full space-y-12 animate-fadeInUp relative z-10">
        {/* Main question */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Heart className="text-primary animate-heartbeat" size={100} fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-tight">
            Be my Valentine
          </h1>
          <p className="text-4xl md:text-5xl font-display text-foreground">
            Richaa 💙💎🌎
          </p>
        </div>

        {/* Buttons container */}
        <div className="relative h-32 flex items-center justify-center">
          {/* Yes button - static position */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-32">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="text-2xl px-12 py-8 rounded-3xl shadow-soft-lg hover:shadow-soft transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Yes 💕
            </Button>
          </div>

          {/* No button - moves on hover/touch */}
          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            onPointerEnter={moveNoButton}
            className="absolute text-2xl px-12 py-8 rounded-3xl shadow-soft bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold transition-all duration-200 border-2 border-border"
            style={{
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'left 0.3s ease-out, top 0.3s ease-out'
            }}
          >
            No
          </button>
        </div>

        {/* Hint text */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground font-medium">
            Choose wisely... 💖
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        © 2026. Built with <Heart className="inline w-4 h-4 text-primary" fill="currentColor" /> using{' '}
        <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
