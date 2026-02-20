import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona a melhoria de imagens com IA?",
    answer: "Nossa IA analisa cada pixel da imagem e aplica melhorias inteligentes mantendo a naturalidade. Usamos modelos treinados com milhões de imagens profissionais para garantir resultados realistas.",
  },
  {
    question: "A IA altera o rosto das pessoas?",
    answer: "Não! Nossa tecnologia possui preservação facial automática. A IA melhora a qualidade sem alterar a identidade ou expressões das pessoas na foto.",
  },
  {
    question: "Qual o tamanho máximo de imagem suportado?",
    answer: "No plano Gratuito até 1080p, no Pro até 4K e no Premium até 8K. Suportamos os formatos JPG, PNG, WEBP e TIFF.",
  },
  {
    question: "Posso usar as imagens editadas comercialmente?",
    answer: "Sim! Todas as imagens editadas são de propriedade do usuário. Nos planos Pro e Premium não há marca d'água, permitindo uso comercial completo.",
  },
  {
    question: "Como funciona o chat com IA para edição?",
    answer: "Basta descrever em português o que deseja fazer, como 'deixe o céu mais azul' ou 'remova a pessoa da direita'. A IA interpreta e aplica a edição automaticamente.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim, você pode cancelar a qualquer momento sem multa. Seu acesso continua até o fim do período pago. Também oferecemos garantia de 7 dias.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Perguntas{" "}
            <span className="gradient-text">frequentes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl glass px-6 border-none"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
