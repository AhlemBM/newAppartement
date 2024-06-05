import { Router } from 'express';



import { checkJwt } from '../../middleware/checkJwt';
import {
  validatorCreate,
  validatorUpdate,
} from '../../middleware/validation/reservation';
import {create, deleteCheckin, findAll, findById, update } from "../../controllers/reservation";
import {findByMonth} from "../../controllers/reservation/findByMonth";





const router = Router();

router.post('/create',  create);
router.get('/getAll',  [checkJwt], findAll);
router.delete('/delete/:id', [checkJwt], deleteCheckin);
router.put('/update/:id', [checkJwt, validatorUpdate], update);
router.get('/find/:id', findById);
router.get('/find/year/:id', findByMonth);


export default router;
