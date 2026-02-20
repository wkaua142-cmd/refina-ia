import { motion } from "framer-motion";
import {
  Wand2,
  Image,
  Eraser,
  ZoomIn,
  Palette,
  Sparkles,
  MessageSquare,
  Paintbrush,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Melhorar Qualidade",
    description: "Aumente a qualidade de qualquer imagem mantendo detalhes naturais e texturas reais.",
  },
  {
    icon: Image,
    title: "Restaurar Fotos Antigas",
    description: "Recupere fotos danificadas, desbotadas ou com ruído. A IA reconstrói detalhes perdidos.",
  },
  {
    icon: Eraser,
    title: "Remover Objetos",
    description: "Apague pessoas, objetos ou marcas d'água. O fundo é preenchido automaticamente.",
  },
  {
    icon: ZoomIn,
    title: "Aumentar Resolução",
    description: "Amplie imagens em até 4x sem perder qualidade. Ideal para impressão profissional.",
  },
  {
    icon: Palette,
    title: "Ajustar Cores",
    description: "Correção inteligente de cores, brilho e contraste com resultados naturais.",
  },
  {
    icon: Sparkles,
    title: "Nitidez Inteligente",
    description: "Elimine borrão e desfoque preservando a aparência natural da foto.",
  },
  {
    icon: MessageSquare,
    title: "Chat com IA",
    description: "Descreva suas edições em linguagem natural. A IA entende e aplica automaticamente.",
  },
  {
    icon: Paintbrush,
    title: "Pincel Inteligente",
    description: "Selecione áreas manualmente e aplique remoções ou edições com precisão cirúrgica.",
  },
];

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            Funcionalidades
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Tudo que você precisa em{" "}
            <span className="gradient-text">um só lugar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ferramentas profissionais de edição com IA que entregam resultados impressionantes
            em segundos, não em horas.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl p-6 glass hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
