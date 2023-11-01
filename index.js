import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config({
  path: '.env'
});

class Server {
	app = express();
}
const server = new Server();
server.app.use(cors());
server.app.use(express.json());


//ROUTES//

import { demoRouter } from './routes/demoRouter.js';
server.app.use('/demo', demoRouter);


((port = process.env.PORT || 3000) => {
  server.app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
})();

export { express, server };