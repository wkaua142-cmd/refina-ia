import { motion } from "framer-motion";

const examples = [
  {
    title: "Restauração de Foto Antiga",
    before: "🖼️",
    after: "✨",
    description: "Foto de família dos anos 80 completamente restaurada",
  },
  {
    title: "Remoção de Objeto",
    before: "🚶",
    after: "🏞️",
    description: "Pessoa removida do fundo de paisagem automaticamente",
  },
  {
    title: "Aumento de Resolução",
    before: "📷",
    after: "🔍",
    description: "Imagem ampliada 4x sem perder nitidez nem detalhes",
  },
];

export function ExamplesSection() {
  return (
    <section id="exemplos" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            Exemplos Reais
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Veja o poder da{" "}
            <span className="gradient-text">IA em ação</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resultados profissionais que mantêm 100% da naturalidade
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, i) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl overflow-hidden glass group hover:shadow-elevated transition-all duration-300"
            >
              <div className="aspect-[4/3] relative bg-muted flex">
                {/* Before */}
                <div className="flex-1 flex items-center justify-center border-r border-border/50 bg-muted/80">
                  <div className="text-center">
                    <span className="text-4xl block mb-2">{example.before}</span>
                    <span className="text-xs text-muted-foreground font-medium">Antes</span>
                  </div>
                </div>
                {/* After */}
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center">
                    <span className="text-4xl block mb-2">{example.after}</span>
                    <span className="text-xs text-primary font-medium">Depois</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold mb-1">{example.title}</h3>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
