import { Router } from 'express';
import { check } from 'prettier';

import { create, deleteAppartement,findAll,update } from '../../controllers/appartement';
import { checkJwt } from '../../middleware/checkJwt';
import {
  validatorCreate,
  validatorUpdate,
} from '../../middleware/validation/appartement';
import { checkRole } from '../../middleware/checkRole';
import {findById, findByIdUser} from "../../controllers/appartement/findById";



const router = Router();

router.post('/create', [checkJwt,checkRole(['ADMIN']), validatorCreate], create);
router.get('/getAll',  findAll);
router.delete('/delete/:id', [checkJwt],checkRole(['ADMIN']), deleteAppartement);
router.put('/update/:id', [checkJwt,checkRole(['ADMIN'])], update);
router.get('/find/:id',  findById);
router.get('/find/', [checkJwt], findByIdUser);
export default router;
