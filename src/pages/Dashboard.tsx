import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ImagePlus, Clock, Sparkles, Eraser, ZoomIn, Palette,
  MoreHorizontal, Download, Trash2, Copy, ArrowUpRight, Zap,
  TrendingUp, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const recentProjects = [
  { id: 1, name: "Retrato familiar", tool: "Melhorar Qualidade", date: "Há 2 horas", icon: Sparkles },
  { id: 2, name: "Foto de paisagem", tool: "Ajustar Cores", date: "Há 5 horas", icon: Palette },
  { id: 3, name: "Foto antiga avô", tool: "Restaurar Foto", date: "Ontem", icon: Clock },
  { id: 4, name: "Produto e-commerce", tool: "Remover Fundo", date: "Ontem", icon: Eraser },
  { id: 5, name: "Avatar perfil", tool: "Aumentar Resolução", date: "2 dias atrás", icon: ZoomIn },
  { id: 6, name: "Banner Instagram", tool: "Melhorar Qualidade", date: "3 dias atrás", icon: Sparkles },
];

const stats = [
  { label: "Imagens editadas", value: "128", icon: ImageIcon, change: "+12 esta semana" },
  { label: "Créditos usados", value: "203", icon: Zap, change: "47 restantes" },
  { label: "Projetos salvos", value: "34", icon: TrendingUp, change: "+5 este mês" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto"
      >
        {/* Welcome + CTA */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Olá, Usuário 👋</h2>
            <p className="text-muted-foreground mt-1">O que deseja editar hoje?</p>
          </div>
          <Link to="/editor">
            <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 gap-2 h-11 px-6">
              <ImagePlus className="w-5 h-5" />
              Novo Projeto
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-primary mt-2">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Recent Projects */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Projetos Recentes</h3>
            <Link to="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <Card
                key={project.id}
                className="glass border-border/50 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <CardContent className="p-0">
                  {/* Thumbnail placeholder */}
                  <div className="h-36 bg-muted/50 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                      <Link to="/editor">
                        <Button size="sm" className="gradient-bg border-0 text-primary-foreground text-xs gap-1">
                          <ArrowUpRight className="w-3 h-3" /> Abrir
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-foreground truncate">{project.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{project.tool}</span>
                      <span className="text-xs text-muted-foreground">{project.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Acesso Rápido</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Melhorar Foto", icon: Sparkles },
              { label: "Restaurar Antiga", icon: Clock },
              { label: "Remover Objeto", icon: Eraser },
              { label: "Aumentar Resolução", icon: ZoomIn },
            ].map((action) => (
              <Link to="/editor" key={action.label}>
                <Card className="glass border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
