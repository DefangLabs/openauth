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

app.use(require('./modules/jwt/jwt.router').jwtRouter);
app.use('/defang', require('./modules/defang/defang.router').defangRouter);

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});