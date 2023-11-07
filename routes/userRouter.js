import express from 'express';
import { getAllUsers, createUser, loginUser } from '../controllers/user/userController.js';

const userRouter = express.Router();

userRouter.get('/', async (_, res) => {
    const response = await getAllUsers();
    res.json(response);
});

userRouter.post('/', async (req, res) => {
    const response = await createUser(req.body);
    res.json(response)
});
userRouter.post('/login', async (req, res) => {
    const response = await loginUser(req.body);
    res.json(response)
});



export { userRouter };