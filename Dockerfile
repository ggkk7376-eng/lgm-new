FROM node:20-bookworm-slim

# Instalacja niezbędnych zależności systemowych (Debian/Ubuntu style)
# python3, make, g++ są potrzebne do budowania modułów natywnych
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Kopiowanie plików zależności
COPY package.json ./

# Instalacja zależności
RUN npm install --legacy-peer-deps

# Kopiowanie reszty kodu źródłowego
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Zmienne "zaślepki" potrzebne tylko do zbudowania aplikacji
ENV GITHUB_CLIENT_ID="mock_id"
ENV GITHUB_CLIENT_SECRET="mock_secret"
ENV GITHUB_REDIRECT_URI="http://localhost:3000/auth/done"
ENV MAIL_HOST="mock_host"
ENV MAIL_PORT="587"
ENV MAIL_USER="mock_user"
ENV MAIL_PASS="mock_pass"
ENV MAIL_FROM="mock@example.com"
ENV MAIL_TO="mock@example.com"

ENV NODE_ENV=production

# Budowanie aplikacji (bez limitu pamięci - niech system zarządza)
RUN npm run build -- --no-lint

# Kopiowanie plików statycznych do folderu standalone (wymagane dla Next.js standalone)
RUN cp -r public .next/standalone/public
RUN cp -r .next/static .next/standalone/.next/static

# Przygotowanie do uruchomienia (użytkownik nie-root dla bezpieczeństwa)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Utworzenie katalogów pod cache i contentlayer (jeśli nie powstały) i nadanie uprawnień
# Contentlayer i Next tworzą te foldery podczas builda jako root, więc musimy je przekazać userowi
RUN mkdir -p .next
RUN mkdir -p .contentlayer
RUN chown -R nextjs:nodejs .next
RUN chown -R nextjs:nodejs .contentlayer

# Przełączenie na użytkownika nextjs (dopiero gotowej aplikacji)
USER nextjs

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# Uruchomienie serwera
CMD ["node", ".next/standalone/server.js"]
