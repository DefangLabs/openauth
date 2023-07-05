import express from 'express';
import cors from 'cors';
import { jwtRouter } from './modules/jwt/jwt.router';
import { servicesRouter } from './modules/services/services.router';

const app = express();

app.use(cors({
    origin: '*', // Our IAP will prevent unauthorized access from the outside world. 
    credentials: true,
}));

app.get('/', (req, res) => {
    res.status(200).send({ message: 'I\'m alive, thank you very much.' });
});

app.use(jwtRouter)
app.use(servicesRouter)

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});