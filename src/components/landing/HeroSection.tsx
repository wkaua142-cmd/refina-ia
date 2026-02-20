import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary"
            >
              <span className="w-2 h-2 rounded-full gradient-bg animate-pulse-glow" />
              Tecnologia de IA de última geração
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Melhore qualquer imagem com IA mantendo{" "}
              <span className="gradient-text">100% da naturalidade</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Restaure fotos antigas, remova objetos, aumente resolução e muito mais.
              Resultados profissionais em segundos, sem parecer artificial.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register">
                <Button size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 shadow-glow group">
                  Testar Gratuitamente
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="group">
                <Play className="w-4 h-4 mr-1" />
                Ver Demonstração
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background gradient-bg flex items-center justify-center text-xs text-primary-foreground font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">+10.000</span>{" "}
                <span className="text-muted-foreground">profissionais confiam</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Before/After Comparator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/50 glass aspect-[4/3]">
              {/* Before image (simulated) */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
                <div className="text-center space-y-3 opacity-60">
                  <div className="w-24 h-24 mx-auto rounded-xl bg-muted-foreground/20 flex items-center justify-center">
                    <span className="text-3xl">🖼️</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Imagem Original</p>
                </div>
              </div>

              {/* After image (simulated with gradient overlay) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-secondary/10 flex items-center justify-center"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="text-center space-y-3">
                  <div className="w-24 h-24 mx-auto rounded-xl bg-primary/20 flex items-center justify-center shadow-glow">
                    <span className="text-3xl">✨</span>
                  </div>
                  <p className="text-sm font-medium text-primary">Melhorada com IA</p>
                </div>
              </div>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-1 gradient-bg cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-glow">
                  <span className="text-primary-foreground text-xs font-bold">⇔</span>
                </div>
              </div>

              {/* Slider input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />

              {/* Labels */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium z-[5]">
                Antes
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-primary z-[5]">
                Depois
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
