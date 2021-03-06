import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import cors from "cors";

import { router } from './routes';

import "./database"

const app = express();
app.use(cors()); // habilita acesso de todas as origens
// app.use(cors({
//   origin: qualquer rota que queira habilitar acesso
// }));

app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      error: error.message
    })
  }

  // Se não for um erro tratado pela aplicação (erro de validação),
  // por exemplo, retorna erro 500
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
});

app.listen(3000, () => console.log('Server is running.'));
