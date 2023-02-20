import { Router } from 'express';

import { create, bid } from 'controllers/items';
import { list, listOngoing, listCompleted } from 'controllers/items/list';
import { checkJwt } from 'middleware/checkJwt';
import { validatorCreate, validatorBidItem } from 'middleware/validation/items';

const router = Router();

router.get('/', [checkJwt], list);

router.get('/ongoing', [checkJwt], listOngoing);

router.get('/completed', [checkJwt], listCompleted);

router.post('/create', [checkJwt, validatorCreate], create);

router.post('/bid', [checkJwt, validatorBidItem], bid);

export default router;
