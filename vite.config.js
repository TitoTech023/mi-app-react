import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'stonewall-luster-passport.ngrok-free.dev',
      '*.ngrok-free.dev'  // Permite cualquier subdominio de ngrok
    ]
  }
})