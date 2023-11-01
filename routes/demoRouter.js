import { express } from '../index.js';
import { demoHandler } from '../controllers/demoController.js';

const demoRouter = express.Router();

demoRouter.get('/', demoHandler);

export { demoRouter };