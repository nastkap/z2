# Etap 1: Budowanie aplikacji
FROM node:14-alpine as build

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY app/package*.json ./

# Instalowanie zależności
RUN npm install

# Kopiowanie pozostałych plików źródłowych
COPY app/ .

# Etap 2: Tworzenie obrazu produkcyjnego z użyciem scratch
FROM scratch

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie aplikacji z poprzedniego etapu
COPY --from=build /app /app

# Wymagane biblioteki do uruchomienia Node.js
COPY --from=build /usr/local/bin/node /usr/local/bin/
COPY --from=build /app/node_modules /app/node_modules


# Ustawienie użytkownika na non-root dla bezpieczeństwa
USER 1000

# Otworzenie portu 3000
EXPOSE 3000

# Dodanie informacji o autorze
LABEL maintainer="Anastasiia Pryimachuk"

# Ustawienie komendy uruchamiającej aplikację
CMD ["node", "server.js"]

# Dodanie healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1
