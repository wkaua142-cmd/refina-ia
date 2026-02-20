import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="gradient-text">ImageAI Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Edição inteligente de imagens com IA. Resultados profissionais mantendo 100% da naturalidade.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</a></li>
              <li><a href="#planos" className="hover:text-foreground transition-colors">Planos</a></li>
              <li><a href="#exemplos" className="hover:text-foreground transition-colors">Exemplos</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LGPD</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ImageAI Pro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
