import { Router } from 'express';

import { info, updateDeposit } from 'controllers/users';
import { checkJwt } from 'middleware/checkJwt';
import { validatorUpdateDeposit } from 'middleware/validation/users';

const router = Router();

router.get('/info', [checkJwt], info);
router.post('/deposit', [checkJwt, validatorUpdateDeposit], updateDeposit);

export default router;
