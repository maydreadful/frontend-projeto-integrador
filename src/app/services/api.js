import axios from 'axios';

const api = axios.create({
  // ESSA LINHA É A CHAVE: Ela diz para o site usar a variável da Vercel
  // Se ela não existir, ele usa o localhost (por isso está falhando)
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

export default api;