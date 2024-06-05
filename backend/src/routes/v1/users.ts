import { Router } from 'express';

import {
  changePassword,
  editProfile,
  securityPassword,
  forgotPassword,
  resetPassword,
  deleteProfile,



} from '../../controllers/users';
import { checkJwt } from '../../middleware/checkJwt';
import upload from '../../middleware/ImageConfig';
import { validatorResetPassword } from '../../middleware/validation/users';
import { checkRole } from '../../middleware/checkRole';
import {findAll, findById} from "../../controllers/users/findAll";
import {getDashboardData} from "../../services/dashbordAdmin.service";



const router = Router();

router.post('/change-password', [], changePassword);
router.post('/forgot-password', [], forgotPassword);
router.post('/reset-password', [validatorResetPassword], resetPassword);
router.post('/security-password', [checkJwt], securityPassword);

router.put('/edit-profile/:id',  editProfile);
router.delete('/profile/:id', [checkJwt],checkRole(['ADMIN']), deleteProfile);
router.get('/getAll', findAll);
router.get('/get/:id', findById);


router.get('/dashboard', getDashboardData);

export default router;
