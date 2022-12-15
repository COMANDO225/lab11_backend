import Express from "express";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getUsers, loginUser, logoutUser, registerUser } from "../controllers/UserController.js";
import { verificarToken } from "../middleware/VerificarToken.js";


const router = Express.Router();

router.get('/', verificarToken, getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/token', refreshToken)
router.get('/logout', logoutUser)

export default router;