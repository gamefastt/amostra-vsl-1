import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import produtoOriginal from "/lovable-uploads/314d3233-82fc-4b62-82b0-0e612948eef0.png";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueToVSL: () => void;
  continueButtonText?: string;
}

export const ExitIntentModal = ({ isOpen, onClose, onContinueToVSL, continueButtonText = "Continuar" }: ExitIntentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-auto p-0 bg-card border-border shadow-fire overflow-hidden">
        {/* Header com ícone de alerta */}
        <div className="bg-gradient-cta p-4 text-center">
          <div className="text-2xl md:text-3xl mb-2">⚠️</div>
          <h2 className="text-lg md:text-xl font-bold text-white">
            Atenção! Não saia agora!
          </h2>
        </div>

        {/* Conteúdo principal */}
        <div className="p-6 space-y-6">
          {/* Texto persuasivo */}
          <div className="text-center">
            <p className="text-foreground text-base md:text-lg font-medium">
              Você ainda pode garantir a sua amostra grátis. Clique no botão abaixo e finalize seu pedido agora mesmo!
            </p>
          </div>

          {/* Imagem do produto - centralizada e em destaque */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={produtoOriginal}
                alt="TadalaRed Premium"
                className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg shadow-premium"
              />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping opacity-30" />
            </div>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3 pt-2">
            <Button 
              onClick={onContinueToVSL}
              variant="cta"
              size="lg"
              className="w-full text-sm md:text-base font-bold px-6 py-3 bg-gradient-cta hover:scale-105 transition-all duration-300 shadow-fire animate-pulse"
            >
              🎯 Quero minha amostra grátis
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-foreground border-muted hover:border-border"
            >
              {continueButtonText}
            </Button>
          </div>
        </div>

        {/* Rodapé com garantia */}
        <div className="bg-muted/30 px-4 py-2 text-center">
          <p className="text-xs text-muted-foreground">
            ✅ 100% seguro • 💯 Garantia total
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};