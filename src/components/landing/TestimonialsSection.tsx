import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina",
    role: "Fotógrafa Profissional",
    avatar: "AC",
    text: "Economizo horas de trabalho no Photoshop. A qualidade da restauração é impressionante e os clientes adoram.",
    stars: 5,
  },
  {
    name: "Rafael Mendes",
    role: "Designer Gráfico",
    avatar: "RM",
    text: "O melhor upscaler que já usei. Imagens para impressão em grande formato ficam perfeitas sem artefatos.",
    stars: 5,
  },
  {
    name: "Juliana Santos",
    role: "Social Media Manager",
    avatar: "JS",
    text: "Remover objetos do fundo das fotos ficou ridiculamente fácil. Meus conteúdos ficaram muito mais profissionais.",
    stars: 5,
  },
  {
    name: "Pedro Oliveira",
    role: "E-commerce Owner",
    avatar: "PO",
    text: "As fotos dos produtos ficam incríveis. O chat com IA para ajustes rápidos é genial, economiza muito tempo.",
    stars: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Amado por{" "}
            <span className="gradient-text">profissionais</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos usuários estão dizendo sobre o ImageAI Pro
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 glass hover:shadow-elevated transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
