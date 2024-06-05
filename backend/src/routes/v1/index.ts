import { Router } from 'express';



import user from './users';
import auth from './auth';

import reservation from './reservation';
import appartement from './appartement';

const router = Router();


router.use('/user', user);

router.use('/auth', auth);
router.use('/reservation', reservation);
router.use('/appartement', appartement);

export default router;
