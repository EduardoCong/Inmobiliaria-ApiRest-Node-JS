import express, { NextFunction, Request, Response }  from "express";
import  jwt  from "jsonwebtoken";
import { createUser, deleteUser, getAllUsers, getById, updateUser } from "../controllers/usersController";

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

const authToken = (req: Request, res: Response, next: NextFunction) => {
    const authenticator = req.headers['authorization'];
    const token =  authenticator && authenticator.split(' ')[1]
    if (!token) {
        res.status(401).json({ error: 'No autorizado'})
        return
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) =>{
        if (err) {
            console.log('Error en la autorizacion ', err)
            return res.status(403).json({ error: 'No tienes acceso a este recurso '})    
        }
        next();
    });

};
router.post('/', authToken,  createUser)
router.get('/', authToken,  getAllUsers)
router.get('/:id', authToken,  getById)
router.put('/:id', authToken,  updateUser)
router.delete('/:id', authToken,  deleteUser)


export default router;