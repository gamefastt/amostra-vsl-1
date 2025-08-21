import { Button } from "@/components/ui/button";
import produtoImage from "@/assets/produto-tadalared.png";

const Downsell = () => {
  // TODO: INSERIR AQUI SEU LINK DO CHECKOUT COM VALOR REDUZIDO (R$9,90)
  const handleCheckoutClick = () => {
    window.location.href = "https://pay.comprasmarketplace.com/checkout/27e52da8-aa58-45ef-807c-bd3fe2890401";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cabeçalho chamativo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            ⚠️ Espera! Antes de sair, temos um bônus para você…
          </h1>
        </div>

        {/* Container principal */}
        <div className="bg-card rounded-2xl shadow-premium p-6 md:p-8 lg:p-12 border border-border animate-scale-in">
          
          {/* Texto persuasivo */}
          <div className="text-center mb-8">
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Não sabemos o motivo da sua desistência, mas para mostrar a nossa credibilidade, 
              vamos lhe dar <span className="font-bold text-primary">R$10 de bônus no frete</span>.
            </p>
            
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-8">
              Ao invés de pagar <span className="line-through text-muted-foreground">R$19,90</span>, 
              você paga apenas <span className="text-primary font-bold text-2xl md:text-3xl">R$9,90</span> 
              e garante sua amostra grátis!
            </p>
          </div>

          {/* Imagem do produto */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <img
                src={produtoImage}
                alt="Produto TadalaRed - Amostra Grátis"
                className="w-64 md:w-80 lg:w-96 h-auto object-contain drop-shadow-lg animate-fade-in"
              />
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                OFERTA!
              </div>
            </div>
          </div>

          {/* Botão CTA */}
          <div className="text-center mb-8">
            <Button
              onClick={handleCheckoutClick}
              size="xl"
              variant="cta"
              className="text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 w-full md:w-auto min-w-[300px] shadow-glow hover:shadow-glow/80 transition-all duration-300"
            >
              Quero Garantir por R$9,90
            </Button>
          </div>

          {/* Nota de confiança */}
          <div className="text-center">
            <p className="text-sm md:text-base text-muted-foreground font-medium bg-muted/50 rounded-lg px-4 py-3 inline-block">
              ⏰ Oferta válida apenas nesta página. Aproveite agora!
            </p>
          </div>

          {/* Elementos de urgência */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-primary font-bold text-lg">✅</div>
              <p className="text-sm text-muted-foreground mt-1">Frete com desconto</p>
            </div>
            <div className="text-center">
              <div className="text-primary font-bold text-lg">🚚</div>
              <p className="text-sm text-muted-foreground mt-1">Envio rápido</p>
            </div>
            <div className="text-center">
              <div className="text-primary font-bold text-lg">🔒</div>
              <p className="text-sm text-muted-foreground mt-1">Compra segura</p>
            </div>
          </div>
        </div>

        {/* Footer com garantia */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            Garantia de 90 dias • Site seguro e protegido
          </p>
        </div>
      </div>
    </div>
  );
};

export default Downsell;
