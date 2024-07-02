# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala las definiciones de tipos de Node.js
RUN npm install @types/node --save-dev

# Copia el resto del código
COPY . .

# Construye el proyecto
RUN npm run build

# Expone el puerto del cliente
EXPOSE 8080

# Comando para correr la aplicación
CMD ["npm", "run", "dev"]