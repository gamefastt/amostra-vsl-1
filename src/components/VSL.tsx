import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StickyOfferBar } from "@/components/StickyOfferBar";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// (sem import de /lovable-uploads aqui)
import heroVisual from "@/assets/hero-visual.png";
import fireBackground from "@/assets/fire-background.png";
import garantiaImage from "@/assets/garantia-90.png";

export const VSL = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewersCount, setViewersCount] = useState(596);
  const [samplesLeft, setSamplesLeft] = useState(10);
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, show: boolean}>>([]);
  const [usedNames, setUsedNames] = useState<string[]>([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const unlockedSectionRef = useRef<HTMLDivElement>(null);

  // ========================================
  // TEMPORIZADOR - EDITAR AQUI O TEMPO
  // ========================================
  // Tempo em segundos para liberar a seção de baixo
  const VSL_UNLOCK_SECONDS = 77; // 1:17 minutos

  useEffect(() => {
    setTimeLeft(VSL_UNLOCK_SECONDS);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsUnlocked(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll sempre liberado - página responsiva
  useEffect(() => {
    // Sempre garantir que o scroll esteja liberado
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // Cleanup - sempre restaura o scroll quando componente desmonta
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  // Scroll listener para mostrar barra fixa após 25% da seção liberada
  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      if (!unlockedSectionRef.current) return;

      const sectionTop = unlockedSectionRef.current.offsetTop;
      const sectionHeight = unlockedSectionRef.current.offsetHeight;
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Calcula se rolou 25% da seção liberada
      const sectionScrolled = scrollTop + windowHeight - sectionTop;
      const scrollPercentage = sectionScrolled / sectionHeight;

      if (scrollPercentage >= 0.25 && !showStickyBar) {
        setShowStickyBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked, showStickyBar]);

  // Contador de visualizações - aumenta gradualmente
  useEffect(() => {
    const viewerTimer = setInterval(() => {
      setViewersCount(prev => {
        const increment = Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3;
        return prev + increment;
      });
    }, Math.random() * 8000 + 5000); // Entre 5-13 segundos

    return () => clearInterval(viewerTimer);
  }, []);

  // Sistema de notificações dinâmicas
  useEffect(() => {
    console.log("useEffect notificações iniciado - isUnlocked:", isUnlocked);
    if (isUnlocked) return; // Só mostra antes de desbloquear

    const allNames = ["João", "Pedro", "Carlos", "Luis", "Fernando", "Rafael", "André", "Marcos", "Paulo", "Ricardo", "Roberto", "Diego", "Thiago", "Bruno", "Daniel", "Lucas", "Gabriel", "Felipe"];
    
    const getRandomUnusedName = () => {
      const availableNames = allNames.filter(name => !usedNames.includes(name));
      if (availableNames.length === 0) {
        // Se todos os nomes foram usados, reseta a lista
        setUsedNames([]);
        return allNames[Math.floor(Math.random() * allNames.length)];
      }
      return availableNames[Math.floor(Math.random() * availableNames.length)];
    };
    
    const sampleMessages = [
      () => `Restam apenas ${samplesLeft} amostras disponíveis`,
      () => {
        const name = getRandomUnusedName();
        setUsedNames(prev => [...prev, name]);
        return `${name} acabou de adquirir sua amostra grátis`;
      },
      () => {
        const name = getRandomUnusedName();
        setUsedNames(prev => [...prev, name]);
        return `${name} acabou de retirar sua amostra grátis`;
      },
      () => {
        const name = getRandomUnusedName();
        setUsedNames(prev => [...prev, name]);
        return `${name} garantiu sua amostra grátis agora mesmo`;
      },
      () => {
        const name = getRandomUnusedName();
        setUsedNames(prev => [...prev, name]);
        return `${name} acabou de solicitar sua amostra grátis`;
      },
    ];

    const showNotification = () => {
      const messageType = Math.random();
      let message = "";
      
      if (messageType < 0.3 && samplesLeft > 3) {
        message = sampleMessages[0]();
        setSamplesLeft(prev => Math.max(3, prev - 1));
      } else {
        const randomIndex = Math.floor(Math.random() * (sampleMessages.length - 1)) + 1;
        message = sampleMessages[randomIndex]();
      }

      console.log("Mostrando notificação:", message); // Debug log
      const id = Date.now();
      setNotifications(prev => {
        console.log("Adicionando notificação ao array:", prev.length + 1);
        return [...prev, { id, message, show: true }];
      });

      // Remove notificação após 4 segundos
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
    };

    // Primeira notificação após 15 segundos
    console.log("Configurando notificações dinâmicas..."); // Debug log
    const initialTimer = setTimeout(showNotification, 15000);
    
    // Notificações subsequentes a cada 25-35 segundos
    const notificationTimer = setInterval(showNotification, Math.random() * 10000 + 25000);

    return () => {
      console.log("Limpando timers de notificação"); // Debug log
      clearTimeout(initialTimer);
      clearInterval(notificationTimer);
    };
  }, [isUnlocked, samplesLeft, usedNames]);

  // useEffect para carregar o script do vturb
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/a76bece8-1841-4b3c-a0e7-616fe0020fc1/players/689e46f2d9373647d501cc64/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Exit intent detection (desktop e mobile)
  useEffect(() => {
    let hasShownModal = false;
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    let pageStartTime = Date.now();
    const MIN_TIME_ON_PAGE = 30000; // 30 segundos mínimo

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShownModal) return;
      
      // Desktop: detecta quando o mouse vai para fora da área do navegador
      // Só depois de 30 segundos na página
      if (e.clientY <= 0 && (Date.now() - pageStartTime) > MIN_TIME_ON_PAGE) {
        hasShownModal = true;
        setShowExitModal(true);
      }
    };

    const handleScroll = () => {
      if (hasShownModal) return;
      
      // Só ativar após tempo mínimo na página
      if ((Date.now() - pageStartTime) < MIN_TIME_ON_PAGE) return;
      
      const currentScrollY = window.scrollY;
      
      // Mobile: detectar scroll significativo para cima (tentativa real de sair)
      if (currentScrollY < lastScrollY) {
        const scrollDifference = lastScrollY - currentScrollY;
        
        // Só conta se o scroll para cima foi significativo (mais de 50px)
        if (scrollDifference > 50) {
          scrollUpCount++;
          
          // Se fez 2 scrolls significativos para cima OU chegou no topo da página
          if (scrollUpCount >= 2 || currentScrollY <= 100) {
            hasShownModal = true;
            setShowExitModal(true);
          }
        }
      } else if (currentScrollY > lastScrollY) {
        // Reset contador se rolar para baixo de forma significativa
        const scrollDifference = currentScrollY - lastScrollY;
        if (scrollDifference > 100) {
          scrollUpCount = 0;
        }
      }
      
      lastScrollY = currentScrollY;
    };

    const handlePopState = (e: PopStateEvent) => {
      if (hasShownModal) return;
      
      // Mobile: detectar uso do botão voltar (sempre ativo)
      e.preventDefault();
      hasShownModal = true;
      setShowExitModal(true);
      // Adiciona um estado para prevenir o voltar
      history.pushState(null, '', window.location.href);
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasShownModal) return;
      
      // Desktop: detectar fechamento da aba (sempre ativo)
      hasShownModal = true;
      setShowExitModal(true);
      
      // Previne o fechamento da página para mostrar o modal
      e.preventDefault();
      e.returnValue = '';
    };

    // Desktop
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Mobile
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    
    // Adiciona um estado inicial para capturar o botão voltar
    history.pushState(null, '', window.location.href);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gradient-hero min-h-screen">
      {/* Header estático no topo */}
      <header className="w-full px-3 py-4 md:p-6 bg-black/90 backdrop-blur-md border-b border-border/50 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-[#FFD700] leading-tight xs:leading-relaxed drop-shadow-lg px-2 break-words">
            Parabéns, você foi selecionado para receber o Tadalared Premium
          </h1>
          <p className="text-base md:text-base text-white font-semibold mt-2">
            Essa oferta é válida somente hoje, dia {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
      </header>

      {/* Seção do vídeo - sempre no mesmo local, logo abaixo da headline */}
      <div className="max-w-6xl mx-auto p-4">
        <section className="text-center py-8">
          <div className="relative inline-block w-full max-w-3xl mx-auto shadow-card-premium rounded-xl overflow-hidden">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <div 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: '<vturb-smartplayer id="vid-689e46f2d9373647d501cc64" style="display: block; margin: 0 auto; width: 100%; height: 100%;"></vturb-smartplayer>'
                }}
              />
            </div>
          </div>

          {/* Contador de pessoas assistindo - só antes de desbloquear - MOBILE */}
          {!isUnlocked && (
            <div className="md:hidden text-center mt-4">
              <p className="text-white/80 text-sm md:text-base">
                📹 <span className="font-semibold text-[#FFD700]">{viewersCount}</span> pessoas assistindo agora
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Contador de pessoas assistindo - DESKTOP - abaixo do vídeo */}
      {!isUnlocked && (
        <div className="hidden md:block max-w-6xl mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-white/80 text-base bg-black/70 inline-block px-4 py-2 rounded-lg">
              📹 <span className="font-semibold text-[#FFD700]">{viewersCount}</span> pessoas assistindo agora
            </p>
          </div>
        </div>
      )}

      {/* Seção que aparece após o timer */}
      {isUnlocked && (
        <div className="max-w-6xl mx-auto p-4 space-y-8">
          <div ref={unlockedSectionRef} className="space-y-12 animate-fade-in">
            {/* Imagem do produto */}
            <section className="text-center">
              <div className="relative max-w-md mx-auto">
                <div className="relative group">
                  <img
                    src="/lovable-uploads/8128bebb-ec8f-436e-b562-cae99627a5b7.png"
                    alt="Tadalared Premium - Fórmula 10x mais potente"
                    className="w-full h-auto rounded-xl shadow-premium group-hover:shadow-fire transition-all duration-500 transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-ping opacity-20" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-ping opacity-30 animation-delay-150" />
                </div>
              </div>
            </section>

            {/* Botão de compra principal */}
            <section className="text-center pb-8">
              <Button
                variant="cta"
                size="xl"
                className="w-full max-w-md mx-auto animate-pulse"
                onClick={() => {
                  window.location.href =
                    "https://pay.comprasmarketplace.com/checkout/3e40828f-71cb-4b95-b19b-f4d399fab0e3" + window.location.search;
                }}
              >
                Garantir meu Tadalared Premium GRÁTIS
              </Button>
            </section>

            {/* Depoimentos */}
            <section>
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">
                Veja o que nossos clientes dizem
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-card-premium">
                  <CardContent className="p-4">
                    <img src="/imagem/dep1.jpg" alt="Depoimento WhatsApp 1" className="w-full h-auto rounded-lg" />
                  </CardContent>
                </Card>

                <Card className="shadow-card-premium">
                  <CardContent className="p-4">
                    <img src="/imagem/dep2.jpg" alt="Depoimento WhatsApp 2" className="w-full h-auto rounded-lg" />
                  </CardContent>
                </Card>

                <Card className="shadow-card-premium">
                  <CardContent className="p-4">
                    <img src="/imagem/dep3.jpg" alt="Depoimento WhatsApp 3" className="w-full h-auto rounded-lg" />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Segundo botão */}
            <section className="text-center pb-8">
              <Button
                variant="cta"
                size="xl"
                className="w-full max-w-md mx-auto animate-pulse"
                onClick={() => {
                  window.location.href =
                    "https://pay.comprasmarketplace.com/checkout/3e40828f-71cb-4b95-b19b-f4d399fab0e3" + window.location.search;
                }}
              >
                Garantir meu Tadalared Premium GRÁTIS
              </Button>
            </section>

            {/* Garantia */}
            <section className="text-center">
              <div className="max-w-lg mx-auto bg-card rounded-xl p-6 shadow-card-premium">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16">
                    <img src={garantiaImage} alt="Garantia 90 dias" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-foreground">Garantia incondicional de 90 dias.</h3>
                    <p className="text-muted-foreground">Se não funcionar, devolvemos o seu dinheiro.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">Perguntas Frequentes</h2>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="tempo" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Quanto tempo demora para chegar?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    De <strong>3 a 10 dias</strong>, dependendo do envio e da sua região.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="alcool" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Pode consumir com bebida alcoólica?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Sim.</strong> A fórmula do Tadalared é natural.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="garantia" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">Tem garantia?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Sim, 90 dias.</strong> Se não funcionar, devolvemos seu dinheiro.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="uso" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">Como usar?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Tome <strong>1 cápsula até 20 minutos antes</strong> da relação. <strong>Duração: até 24h.</strong>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="composicao" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Qual a composição do Tadalared Premium?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    O Tadalared Premium é formulado com ingredientes 100% naturais e de alta performance, incluindo:
                    <br /><br />
                    <strong>Tribulus Terrestris (95% saponinas)</strong> – Aumenta a produção natural de testosterona e melhora o desempenho sexual.
                    <br /><br />
                    <strong>Maca Peruana</strong> – Potente estimulante natural, melhora libido e energia.
                    <br /><br />
                    <strong>Ginseng Panax</strong> – Favorece a circulação sanguínea, ajudando na ereção firme e duradoura.
                    <br /><br />
                    <strong>L-Arginina</strong> – Aminoácido que promove vasodilatação, melhorando fluxo sanguíneo peniano.
                    <br /><br />
                    <strong>Catuaba</strong> – Estimulante afrodisíaco tradicional, auxilia no controle da ejaculação precoce.
                    <br /><br />
                    <strong>Zinco Quelato</strong> – Mineral essencial para a saúde sexual e produção hormonal.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="anvisa" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    O Tadalared Premium tem liberação da Anvisa?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Sim.</strong> O Tadalared Premium é registrado como suplemento natural, seguindo todas as normas e regulamentações da Anvisa para segurança e qualidade.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Botão final */}
            <section className="text-center pb-8">
              <Button
                variant="cta"
                size="xl"
                className="w-full max-w-md mx-auto animate-pulse"
                onClick={() => {
                  window.location.href =
                    "https://pay.comprasmarketplace.com/checkout/3e40828f-71cb-4b95-b19b-f4d399fab0e3" + window.location.search;
                }}
              >
                Garantir meu Tadalared Premium GRÁTIS
              </Button>
            </section>
          </div>
        </div>
      )}

      {/* Notificações dinâmicas - apenas no mobile */}
      {!isUnlocked && notifications.length > 0 && (
        <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 space-y-2 w-11/12 max-w-md">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm w-full transform transition-all duration-500 ${
                notification.show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-center">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="font-medium">{notification.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Barra fixa inferior */}
      <StickyOfferBar 
        isVisible={showStickyBar} 
        onShow={() => {}} 
      />

      {/* Exit Intent Modal */}
      <ExitIntentModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onContinueToVSL={() => {
          window.location.href = "https://pay.comprasmarketplace.com/checkout/3e40828f-71cb-4b95-b19b-f4d399fab0e3" + window.location.search;
        }}
        continueButtonText="Continuar assistindo o video"
      />
    </div>
  );
};