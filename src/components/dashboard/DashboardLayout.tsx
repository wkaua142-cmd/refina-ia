import { Link, useLocation } from "react-router-dom";
import {
  Sparkles, Home, ImagePlus, FolderOpen, CreditCard, Settings,
  User, LogOut, ChevronLeft, ChevronRight, Zap
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Novo Projeto", icon: ImagePlus, href: "/editor", highlight: true },
  { label: "Meus Projetos", icon: FolderOpen, href: "/projects" },
  { label: "Planos", icon: CreditCard, href: "/plans" },
  { label: "Configurações", icon: Settings, href: "/settings" },
  { label: "Perfil", icon: User, href: "/profile" },
];

export function DashboardLayout({ children, title = "Dashboard" }: { children: React.ReactNode; title?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all duration-200 flex-shrink-0 relative",
          collapsed ? "w-[68px]" : "w-64"
        )}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[72px] z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Logo */}
        <div className="h-16 flex items-center px-4 gap-2 border-b border-border">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display font-bold text-lg gradient-text">ImageAI Pro</span>}
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end
                className={cn(
                  "flex items-center gap-3 rounded-lg transition-all text-sm font-medium",
                  collapsed ? "justify-center p-3" : "px-3 py-2.5",
                  item.highlight
                    ? "gradient-bg text-primary-foreground hover:opacity-90"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                activeClassName={item.highlight ? "" : "bg-primary/10 text-primary"}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>

        {/* Credits + Logout */}
        <div className="border-t border-border p-3 space-y-3">
          {!collapsed && (
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Créditos</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-display font-bold gradient-text">47</span>
                <span className="text-xs text-muted-foreground">de 50</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full gradient-bg rounded-full" style={{ width: "94%" }} />
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center" title="47 créditos">
                <Zap className="w-4 h-4 text-primary" />
              </div>
            </div>
          )}
          <button
            className={cn(
              "flex items-center gap-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all w-full",
              collapsed ? "justify-center p-3" : "px-3 py-2.5"
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm flex-shrink-0">
          <h1 className="font-display font-semibold text-lg text-foreground">{title}</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-semibold">
              U
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
