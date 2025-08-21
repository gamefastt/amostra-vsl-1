import { Button } from "@/components/ui/button";
import produtoImage from "@/assets/produto-tadalared.png";

const Upsell = () => {
  // TODO: INSERIR AQUI SEU LINK DO CHECKOUT PARA O POTE COMPLETO (R$67,00)
  const handleAcceptOffer = () => {
    window.location.href = "https://pay.comprasmarketplace.com/checkout/cede7fb5-ac4b-4a9f-8784-39f95fec4be2";
  };

  const handleDeclineOffer = () => {
    window.location.href = "https://gamefastt.github.io/amostra-obrigado/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cabeçalho chamativo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in leading-tight">
            ⚠️ Espere! Seu Pedido Não Está Completo...
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary animate-fade-in">
            Garanta a SOLUÇÃO DEFINITIVA com Mais de 65% de Desconto e Frete GRÁTIS!
          </h2>
        </div>

        {/* Container principal */}
        <div className="bg-card rounded-2xl shadow-premium p-6 md:p-8 lg:p-12 border border-border animate-scale-in">
          
          {/* Texto persuasivo */}
          <div className="text-center mb-8">
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Você já garantiu sua amostra grátis. Agora, dê o próximo passo para uma vida sem inseguranças. 
              Clique no botão abaixo e adicione o pote completo ao seu pedido por apenas <span className="font-bold text-primary">R$ 67,00</span>. 
              O frete já está coberto pela sua primeira compra.
            </p>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-8 border border-primary/20">
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                De <span className="line-through text-muted-foreground">R$ 197,00</span> por apenas
              </p>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                R$ 67,00
              </p>
              <p className="text-lg md:text-xl text-accent font-semibold">
                Desconto de 65% + Frete GRÁTIS
              </p>
            </div>
          </div>

          {/* Imagem do produto */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <img
                src={produtoImage}
                alt="TadalaRed - Pote Completo"
                className="w-64 md:w-80 lg:w-96 h-auto object-contain drop-shadow-lg animate-fade-in"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-glow">
                65% OFF
              </div>
            </div>
          </div>

          {/* Botões CTA */}
          <div className="space-y-4 mb-8">
            <div className="text-center">
              <Button
                onClick={handleAcceptOffer}
                size="xl"
                variant="cta"
                className="text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 shadow-glow hover:shadow-glow/80 transition-all duration-300 mx-auto block"
              >
                Sim, Eu Quero o Desconto
              </Button>
            </div>
            
            <div className="text-center">
              <Button
                onClick={handleDeclineOffer}
                variant="outline"
                className="text-base md:text-lg px-6 py-3 md:px-8 md:py-4 w-full md:w-auto min-w-[300px] text-muted-foreground hover:text-foreground"
              >
                Não, obrigado.
              </Button>
            </div>
          </div>

          {/* Elementos de urgência e benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-primary font-bold text-2xl mb-2">🎯</div>
              <p className="font-semibold text-foreground">Solução Definitiva</p>
              <p className="text-sm text-muted-foreground mt-1">Pote completo para resultados duradouros</p>
            </div>
            <div className="text-center">
              <div className="text-primary font-bold text-2xl mb-2">🚚</div>
              <p className="font-semibold text-foreground">Frete GRÁTIS</p>
              <p className="text-sm text-muted-foreground mt-1">Já incluído na sua compra</p>
            </div>
            <div className="text-center">
              <div className="text-primary font-bold text-2xl mb-2">💰</div>
              <p className="font-semibold text-foreground">65% de Desconto</p>
              <p className="text-sm text-muted-foreground mt-1">Economize mais de R$ 130</p>
            </div>
          </div>

          {/* Nota de urgência */}
          <div className="text-center mt-8">
            <p className="text-sm md:text-base text-muted-foreground font-medium bg-muted/50 rounded-lg px-4 py-3 inline-block">
              ⏰ Oferta exclusiva válida apenas nesta página. Não perca esta oportunidade!
            </p>
          </div>
        </div>

        {/* Footer com garantia */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            Garantia de 90 dias • Site seguro e protegido • Compra 100% segura
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upsell;