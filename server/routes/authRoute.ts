import { Router, Response, Request } from 'express';

const router = Router();

// api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {

  } catch (e) {
    // res.status(500).json({ error: true, message: e.message });
  }
});

// api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {

  } catch (e) {
    // res.status(500).json({ error: true, message: e.message });
  }
});

export default router;
