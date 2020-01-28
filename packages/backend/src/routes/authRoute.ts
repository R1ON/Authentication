import express from 'express';

const Router = express.Router();

// api/auth/register
Router.post('/register', async (req: express.Request, res: express.Response) => {
  try {
    console.log('test');
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// api/auth/login
Router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    console.log('test');
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default Router;

