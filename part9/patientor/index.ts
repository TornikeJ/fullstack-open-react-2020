import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoses'
import patientsRouter from './src/routes/patients'

const app = express()
// const cors = require('cors')
app.use(express.json())
app.use(cors())

const PORT = 3001;

app.get('/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses',diagnoseRouter);
app.use('/api/patients',patientsRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});