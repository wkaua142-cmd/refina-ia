import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para experimentar",
    features: [
      "5 edições por mês",
      "Melhorar qualidade básica",
      "Resolução até 1080p",
      "Marca d'água no resultado",
    ],
    cta: "Começar Grátis",
    popular: false,
  },
  {
    name: "Pro",
    price: "R$ 49",
    period: "/mês",
    description: "Para profissionais e criadores",
    features: [
      "100 edições por mês",
      "Todas as ferramentas de IA",
      "Resolução até 4K",
      "Sem marca d'água",
      "Chat com IA",
      "Pincel inteligente",
      "Download em alta resolução",
    ],
    cta: "Assinar Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "R$ 99",
    period: "/mês",
    description: "Para equipes e empresas",
    features: [
      "Edições ilimitadas",
      "Todas as ferramentas Pro",
      "Resolução até 8K",
      "API de integração",
      "Suporte prioritário",
      "Processamento em lote",
      "White-label disponível",
      "Múltiplos usuários",
    ],
    cta: "Assinar Premium",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            Planos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Escolha o plano{" "}
            <span className="gradient-text">ideal para você</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comece gratuitamente e evolua conforme sua necessidade
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "glass shadow-glow border-primary/30 scale-105"
                  : "glass hover:shadow-elevated"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-xs font-bold text-primary-foreground">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "gradient-bg border-0 text-primary-foreground hover:opacity-90"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
