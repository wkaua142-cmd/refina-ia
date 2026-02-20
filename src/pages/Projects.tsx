import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Clock, Eraser, ZoomIn, Palette, Focus, Wand2,
  Download, Trash2, Copy, ArrowUpRight, Search, Filter,
  LayoutGrid, LayoutList, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";

const toolIcons: Record<string, React.ElementType> = {
  "Melhorar Qualidade": Sparkles,
  "Restaurar Foto": Clock,
  "Remover Objeto": Eraser,
  "Aumentar Resolução": ZoomIn,
  "Ajustar Cores": Palette,
  "Nitidez Inteligente": Focus,
  "Tornar Realista": Wand2,
};

const projects = [
  { id: 1, name: "Retrato familiar", tool: "Melhorar Qualidade", date: "2026-02-20", size: "2.4 MB" },
  { id: 2, name: "Foto de paisagem", tool: "Ajustar Cores", date: "2026-02-20", size: "5.1 MB" },
  { id: 3, name: "Foto antiga avô", tool: "Restaurar Foto", date: "2026-02-19", size: "1.8 MB" },
  { id: 4, name: "Produto e-commerce", tool: "Remover Objeto", date: "2026-02-19", size: "3.2 MB" },
  { id: 5, name: "Avatar perfil", tool: "Aumentar Resolução", date: "2026-02-18", size: "0.9 MB" },
  { id: 6, name: "Banner Instagram", tool: "Melhorar Qualidade", date: "2026-02-17", size: "4.7 MB" },
  { id: 7, name: "Foto casamento", tool: "Ajustar Cores", date: "2026-02-16", size: "6.3 MB" },
  { id: 8, name: "Logo empresa", tool: "Aumentar Resolução", date: "2026-02-15", size: "0.5 MB" },
  { id: 9, name: "Selfie restaurada", tool: "Restaurar Foto", date: "2026-02-14", size: "2.1 MB" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Projects() {
  const [search, setSearch] = useState("");
  const [filterTool, setFilterTool] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchTool = filterTool === "all" || p.tool === filterTool;
    return matchSearch && matchTool;
  });

  return (
    <DashboardLayout title="Meus Projetos">
      <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Filters */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar projetos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterTool} onValueChange={setFilterTool}>
            <SelectTrigger className="w-full sm:w-52">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filtrar por ferramenta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as ferramentas</SelectItem>
              {Object.keys(toolIcons).map((tool) => (
                <SelectItem key={tool} value={tool}>{tool}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-1 border border-border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className={cn("h-8 w-8", viewMode === "grid" && "gradient-bg border-0 text-primary-foreground")}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className={cn("h-8 w-8", viewMode === "list" && "gradient-bg border-0 text-primary-foreground")}
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p variants={item} className="text-sm text-muted-foreground">
          {filtered.length} projeto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </motion.p>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => {
              const Icon = toolIcons[project.tool] || ImageIcon;
              return (
                <Card key={project.id} className="glass border-border/50 hover:border-primary/30 transition-all group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="h-36 bg-muted/50 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <Link to="/editor">
                          <Button size="sm" className="gradient-bg border-0 text-primary-foreground text-xs gap-1">
                            <ArrowUpRight className="w-3 h-3" /> Abrir
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="text-xs"><Copy className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline" className="text-xs"><Download className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline" className="text-xs text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-foreground truncate">{project.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{project.tool}</span>
                        <span className="text-xs text-muted-foreground">{project.size}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">{project.date}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        ) : (
          <motion.div variants={item} className="space-y-2">
            {filtered.map((project) => {
              const Icon = toolIcons[project.tool] || ImageIcon;
              return (
                <Card key={project.id} className="glass border-border/50 hover:border-primary/30 transition-all">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{project.name}</h4>
                      <span className="text-xs text-muted-foreground">{project.tool} • {project.date} • {project.size}</span>
                    </div>
                    <div className="flex gap-1">
                      <Link to="/editor"><Button size="icon" variant="ghost" className="h-8 w-8"><ArrowUpRight className="w-4 h-4" /></Button></Link>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Download className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Copy className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
