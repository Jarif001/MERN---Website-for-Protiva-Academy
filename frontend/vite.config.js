import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // Use IPv4 instead of IPv6 (::1)
    port: 3000, // Change to a port above 1024 if 5173 causes issues
  },
})

