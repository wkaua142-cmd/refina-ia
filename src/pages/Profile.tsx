import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Profile() {
  const { toast } = useToast();
  const [name, setName] = useState("Usuário Demo");
  const [email, setEmail] = useState("usuario@email.com");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("pt-BR");

  const handleSave = () => {
    toast({ title: "Perfil atualizado", description: "Suas informações foram salvas com sucesso." });
  };

  return (
    <DashboardLayout title="Perfil">
      <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
        {/* Avatar */}
        <motion.div variants={item}>
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Foto de Perfil</CardTitle>
              <CardDescription>Personalize sua imagem de perfil</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  U
                </div>
                <button className="absolute inset-0 rounded-full bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <Camera className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Camera className="w-4 h-4" /> Alterar foto
                </Button>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG. Máx 2MB.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Info */}
        <motion.div variants={item}>
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados de conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div variants={item}>
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Preferências</CardTitle>
              <CardDescription>Personalize sua experiência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Modo escuro</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Alterne entre tema claro e escuro</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Idioma</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save */}
        <motion.div variants={item} className="flex justify-end">
          <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 gap-2 h-11 px-6" onClick={handleSave}>
            <Save className="w-4 h-4" /> Salvar alterações
          </Button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
