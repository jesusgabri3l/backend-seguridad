import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Importa las funciones que necesitas de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

dotenv.config({
  path: '.env'
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const server = express();

server.use(cors());
server.use(express.json());

// Importa tus rutas después de inicializar Firebase
import { demoRouter } from './routes/demoRouter.js';

// Añade tus rutas aquí
server.use('/demo', demoRouter);

const port = process.env.PORT || 3000;

// Utiliza una función asincrónica para esperar que Firebase se inicialice
const startServer = async () => {
  try {
    await server.listen(port);
    console.log(`🚀 Server running on port ${port}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
