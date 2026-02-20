import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Wand2, ImagePlus, Eraser, ZoomIn, Palette,
  Focus, RotateCcw, RotateCw, Download, Play, Upload,
  ArrowLeft, Sun, Moon, ChevronLeft, ChevronRight,
  Send, Paintbrush, Minus, Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const tools = [
  { id: "enhance", label: "Melhorar Qualidade", icon: Sparkles, desc: "IA melhora nitidez e detalhes" },
  { id: "restore", label: "Restaurar Foto", icon: RotateCcw, desc: "Recupere fotos antigas" },
  { id: "remove", label: "Remover Objeto", icon: Eraser, desc: "Remova qualquer elemento" },
  { id: "upscale", label: "Aumentar Resolução", icon: ZoomIn, desc: "Até 4x mais resolução" },
  { id: "realistic", label: "Tornar Realista", icon: Wand2, desc: "Adicione realismo natural" },
  { id: "colors", label: "Ajustar Cores", icon: Palette, desc: "Correção automática de cores" },
  { id: "sharpen", label: "Nitidez Inteligente", icon: Focus, desc: "Foco e nitidez com IA" },
];

export default function Editor() {
  const [selectedTool, setSelectedTool] = useState("enhance");
  const [hasImage, setHasImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  // Settings
  const [intensity, setIntensity] = useState([75]);
  const [naturalness, setNaturalness] = useState([85]);
  const [preserveFace, setPreserveFace] = useState(true);
  const [preserveColors, setPreserveColors] = useState(false);

  // Chat
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");

  // Brush
  const [brushSize, setBrushSize] = useState([30]);
  const [brushActive, setBrushActive] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setHasImage(true);
      setShowResult(false);
    }
  };

  const handleApplyAI = () => {
    if (!hasImage) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 3000);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: `Entendido! Aplicando: "${msg}". Veja o resultado no canvas.` },
      ]);
    }, 1500);
  };

  const handleSliderDrag = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 glass-strong flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="gradient-text hidden sm:inline">ImageAI Pro</span>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm text-muted-foreground hidden md:inline">Editor de Imagem</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Desfazer">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Refazer">
            <RotateCw className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm" className="gap-2" disabled={!showResult}>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Baixar</span>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL - Tools */}
        <motion.aside
          animate={{ width: leftCollapsed ? 48 : 260 }}
          transition={{ duration: 0.2 }}
          className="border-r border-border bg-card flex-shrink-0 flex flex-col relative"
        >
          <button
            onClick={() => setLeftCollapsed(!leftCollapsed)}
            className="absolute -right-3 top-4 z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            {leftCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-1">
              {!leftCollapsed && (
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
                  Ferramentas IA
                </p>
              )}
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg transition-all text-left",
                    leftCollapsed ? "p-2 justify-center" : "p-3",
                    selectedTool === tool.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "hover:bg-muted text-foreground"
                  )}
                  title={tool.label}
                >
                  <tool.icon className="w-5 h-5 flex-shrink-0" />
                  {!leftCollapsed && (
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{tool.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{tool.desc}</div>
                    </div>
                  )}
                </button>
              ))}

              {!leftCollapsed && (
                <>
                  <Separator className="my-3" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
                    Pincel IA
                  </p>
                  <button
                    onClick={() => setBrushActive(!brushActive)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                      brushActive
                        ? "bg-secondary/10 text-secondary border border-secondary/20"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <Paintbrush className="w-5 h-5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Seleção Manual</div>
                      <div className="text-xs text-muted-foreground">Pinte a área para editar</div>
                    </div>
                  </button>

                  {brushActive && (
                    <div className="px-3 py-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Tamanho</Label>
                        <span className="text-xs text-muted-foreground">{brushSize[0]}px</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Minus className="w-3 h-3 text-muted-foreground" />
                        <Slider value={brushSize} onValueChange={setBrushSize} min={5} max={100} step={1} className="flex-1" />
                        <Plus className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">Limpar</Button>
                        <Button size="sm" className="flex-1 text-xs gradient-bg border-0 text-primary-foreground">Aplicar</Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </motion.aside>

        {/* CENTER - Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            ref={canvasRef}
            className="flex-1 relative flex items-center justify-center bg-muted/30 overflow-hidden"
            onMouseMove={handleSliderDrag}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {!hasImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div
                  onClick={handleUpload}
                  className="w-64 h-48 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all mx-auto group"
                >
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Upload className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Envie sua imagem</p>
                    <p className="text-xs text-muted-foreground mt-1">Arraste ou clique para selecionar</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP • Máx 20MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </motion.div>
            ) : (
              <>
                {/* Simulated before/after canvas */}
                <div className="relative w-full h-full flex items-center justify-center select-none">
                  {/* Before image (placeholder) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] max-w-2xl aspect-[4/3] rounded-xl overflow-hidden relative bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                        <div className="text-center space-y-2 opacity-60">
                          <ImagePlus className="w-12 h-12 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Imagem Original</p>
                        </div>
                      </div>

                      {/* After overlay with slider */}
                      {showResult && (
                        <>
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
                            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                          >
                            <div className="text-center space-y-2">
                              <Sparkles className="w-12 h-12 mx-auto text-primary" />
                              <p className="text-sm text-primary font-medium">Resultado IA</p>
                            </div>
                          </div>

                          {/* Slider handle */}
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg cursor-col-resize z-10"
                            style={{ left: `${sliderPos}%` }}
                            onMouseDown={() => setIsDragging(true)}
                          >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                              <ChevronLeft className="w-3 h-3 text-primary-foreground" />
                              <ChevronRight className="w-3 h-3 text-primary-foreground" />
                            </div>
                          </div>

                          {/* Labels */}
                          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur text-xs font-medium">
                            Antes
                          </div>
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-md gradient-bg text-primary-foreground text-xs font-medium">
                            Depois
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Processing overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-strong rounded-2xl p-8 text-center space-y-4 max-w-xs"
                      >
                        <div className="w-16 h-16 rounded-full gradient-bg mx-auto flex items-center justify-center animate-pulse-glow">
                          <Sparkles className="w-8 h-8 text-primary-foreground animate-spin" style={{ animationDuration: "3s" }} />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-foreground">Processando com IA</p>
                          <p className="text-sm text-muted-foreground mt-1">Aplicando melhorias...</p>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full gradient-bg rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.8, ease: "easeInOut" }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>

          {/* Chat Panel */}
          <div className="border-t border-border bg-card">
            <Tabs defaultValue="chat" className="w-full">
              <div className="px-4 pt-2">
                <TabsList className="h-8">
                  <TabsTrigger value="chat" className="text-xs px-3 h-7">💬 Chat IA</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs px-3 h-7">📋 Histórico</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="chat" className="m-0">
                <div className="px-4 py-2 space-y-2 max-h-32 overflow-y-auto">
                  {chatMessages.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      Escreva um comando como "Deixe o céu mais azul" ou "Remova o fundo"
                    </p>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] px-3 py-2 rounded-xl text-xs",
                          msg.role === "user"
                            ? "gradient-bg text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 pb-3 flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    placeholder="Ex: Deixe o céu mais azul..."
                    className="h-9 text-sm"
                    disabled={!hasImage}
                  />
                  <Button
                    size="sm"
                    className="gradient-bg border-0 text-primary-foreground h-9 px-3"
                    onClick={handleSendChat}
                    disabled={!hasImage || !chatInput.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="history" className="m-0 px-4 py-3">
                <p className="text-xs text-muted-foreground text-center py-2">Nenhuma edição aplicada ainda</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* RIGHT PANEL - Settings */}
        <motion.aside
          animate={{ width: rightCollapsed ? 48 : 280 }}
          transition={{ duration: 0.2 }}
          className="border-l border-border bg-card flex-shrink-0 flex flex-col relative"
        >
          <button
            onClick={() => setRightCollapsed(!rightCollapsed)}
            className="absolute -left-3 top-4 z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            {rightCollapsed ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          {!rightCollapsed && (
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Configurações da IA
                  </p>

                  <div className="space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Intensidade</Label>
                        <span className="text-xs text-muted-foreground font-mono">{intensity[0]}%</span>
                      </div>
                      <Slider value={intensity} onValueChange={setIntensity} min={0} max={100} step={1} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Naturalidade</Label>
                        <span className="text-xs text-muted-foreground font-mono">{naturalness[0]}%</span>
                      </div>
                      <Slider value={naturalness} onValueChange={setNaturalness} min={0} max={100} step={1} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Preservação
                  </p>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Preservar rosto</Label>
                    <Switch checked={preserveFace} onCheckedChange={setPreserveFace} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Preservar cores</Label>
                    <Switch checked={preserveColors} onCheckedChange={setPreserveColors} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Ferramenta ativa
                  </p>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const t = tools.find((t) => t.id === selectedTool);
                        return t ? (
                          <>
                            <t.icon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">{t.label}</span>
                          </>
                        ) : null;
                      })()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tools.find((t) => t.id === selectedTool)?.desc}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full gradient-bg border-0 text-primary-foreground hover:opacity-90 gap-2 h-11"
                    onClick={handleApplyAI}
                    disabled={!hasImage || isProcessing}
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {isProcessing ? "Processando..." : "Aplicar IA"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleUpload}
                  >
                    <Upload className="w-4 h-4" />
                    {hasImage ? "Trocar imagem" : "Enviar imagem"}
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </motion.aside>
      </div>
    </div>
  );
}
