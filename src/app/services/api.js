import axios from 'axios';

const api = axios.create({
  // Tenta ler a variável da Vercel primeiro, se não houver, usa o link direto do Render
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://backend-projeto-integrador-s6n2.onrender.com',
});

export default api;