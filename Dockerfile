FROM node:18-alpine

# Instalacja niezbędnych zależności systemowych
# libc6-compat, python3, make, g++ są potrzebne do budowania modułów natywnych (np. sharp, contentlayer, swc)
RUN apk add --no-cache libc6-compat python3 make g++ git

WORKDIR /app

# Kopiowanie plików zależności
COPY package.json package-lock.json* bun.lockb* ./

# Instalacja wszystkich zależności (włącznie z devDependencies dla TypeScript i Tailwind)
# --legacy-peer-deps pomaga przy konfliktach wersji
RUN npm install --legacy-peer-deps

# Kopiowanie reszty kodu źródłowego
COPY . .

# Konfiguracja pamięci dla Node.js (zapobiega OOM na słabszych maszynach/NASach)
# ZMNIEJSZAM DO 1.5GB (4GB to za dużo dla NAS-a i system ubija proces)
ENV NODE_OPTIONS="--max-old-space-size=1536"
ENV NEXT_TELEMETRY_DISABLED=1

# Zmienne "zaślepki" potrzebne tylko do zbudowania aplikacji (Next.js sprawdza ich obecność)
ENV GITHUB_CLIENT_ID="mock_id"
ENV GITHUB_CLIENT_SECRET="mock_secret"
ENV GITHUB_REDIRECT_URI="http://localhost:3000/auth/done"
ENV MAIL_HOST="mock_host"
ENV MAIL_PORT="587"
ENV MAIL_USER="mock_user"
ENV MAIL_PASS="mock_pass"
ENV MAIL_FROM="mock@example.com"
ENV MAIL_TO="mock@example.com"

# Budowanie zmiennych (potrzebne do builda)
ENV NODE_ENV=production

# Budowanie aplikacji (JAKO ROOT, żeby uniknąć problemów z uprawnieniami do node_modules)
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
