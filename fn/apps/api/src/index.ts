import express from 'express';
import cors from 'cors';
import expressWsInit from 'express-ws';

const app = express();
expressWsInit(app);

app.use(cors({
    origin: '*', // Our IAP will prevent unauthorized access from the outside world.
    credentials: true,
}));

app.get('/', (req, res) => {
    res.status(200).send({ message: 'I\'m alive, thank you very much.' });
});

import { jwtRouter } from './modules/jwt/jwt.router';
import { defangRouter } from './modules/defang/defang.router';

app.use(jwtRouter);
app.use('/defang', defangRouter);

app.listen(8001, () => {
    console.log('Server is listening on port 8001');
});
