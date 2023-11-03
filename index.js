import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config({
  path: '.env'
});

const server = express();
server.use(cors());
server.use(express.json());

// Inicializacion de firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Rutas
import { demoRouter } from './routes/demoRouter.js';
import { userRouter } from './routes/userRouter.js';

server.use('/demo', demoRouter);
server.use('/api/user', userRouter);


// Server start 
const port = process.env.PORT || 3000;

try {
  server.listen(port);
  console.log(`🚀 Server running on port ${port}`);
} catch (error) {
  console.error('Error starting the server:', error);
}
export { firestore }