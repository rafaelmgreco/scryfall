import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // O CDN da Scryfall (cards.scryfall.io) recusa com 400 requisicoes com
    // User-Agent generico, e o otimizador do Next nao permite customizar esse
    // header. As imagens ja sao servidas otimizadas pelo CDN, entao o browser
    // carrega direto de la.
    unoptimized: true,
  },
};

export default nextConfig;
