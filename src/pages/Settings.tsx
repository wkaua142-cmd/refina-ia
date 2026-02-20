import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Save, Bell, HardDrive, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function SettingsPage() {
  const { toast } = useToast();
  const [aiQuality, setAiQuality] = useState("high");
  const [defaultIntensity, setDefaultIntensity] = useState([75]);
  const [autoSave, setAutoSave] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifBrowser, setNotifBrowser] = useState(false);
  const [notifUpdates, setNotifUpdates] = useState(true);

  const handleSave = () => {
    toast({ title: "Configurações salvas", description: "Suas preferências foram atualizadas." });
  };

  return (
    <DashboardLayout title="Configurações">
      <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
        {/* AI Settings */}
        <motion.div variants={item}>
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <CardTitle className="font-display text-lg">Configurações da IA</CardTitle>
              </div>
              <CardDescription>Defina os padrões de processamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Qualidade padrão</Label>
                <Select value={aiQuality} onValueChange={setAiQuality}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Rápida (menor qualidade)</SelectItem>
                    <SelectItem value="medium">Balanceada</SelectItem>
                    <SelectItem value="high">Alta qualidade</SelectItem>
                    <SelectItem value="ultra">Ultra (mais lenta)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Intensidade padrão da IA</Label>
                  <span className="text-xs text-muted-foreground font-mono">{defaultIntensity[0]}%</span>
                </div>
                <Slider value={defaultIntensity} onValueChange={setDefaultIntensity} min={0} max={100} step={1} />
                <p className="text-xs text-muted-foreground">Valor padrão aplicado ao abrir o editor</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Storage */}
        <motion.div variants={item}>
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-primary" />
                <CardTitle className="font-display text-lg">Armazenamento</CardTitle>
              </div>
              <CardDescription>Gerencie seus dados e salvamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Salvamento automático</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Salva edições automaticamente a cada 30s</p>
                </div>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Espaço utilizado</Label>
                  <span className="text-xs text-muted-foreground">245 MB de 1 GB</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-bg rounded-full" style={{ width: "24.5%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={item}>
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle className="font-display text-lg">Notificações</CardTitle>
              </div>
              <CardDescription>Controle seus alertas e avisos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Receba atualizações por email</p>
                </div>
                <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Navegador</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Notificações push no navegador</p>
                </div>
                <Switch checked={notifBrowser} onCheckedChange={setNotifBrowser} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Novidades do produto</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Fique por dentro das atualizações</p>
                </div>
                <Switch checked={notifUpdates} onCheckedChange={setNotifUpdates} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save */}
        <motion.div variants={item} className="flex justify-end">
          <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 gap-2 h-11 px-6" onClick={handleSave}>
            <Save className="w-4 h-4" /> Salvar configurações
          </Button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
