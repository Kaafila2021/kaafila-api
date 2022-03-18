import express from 'express';
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const { Server } = require("socket.io");

import initDBConnection from './lib/MongoDB';
import timePlayedSocket from './routes/sockets/timePlayed.socket';
import verifyToken from './helpers/validate-token';
import cors from 'cors';

//routes
import routeRegister from './routes/register';
import routeLogin from './routes/login';
import routeUser from './routes/user';
import routeUpload from './routes/upload';
import routeDownload from './routes/download';
import routeExplore from './routes/explore';
import routeRecentlyPlayed from './routes/recenelty-played';
import routeVideoWached from './routes/video-wached';
import routeStatics from './routes/statics';
import routePacks from './routes/packs';
import routeTokens from './routes/tokens';
import routeCategories from './routes/categories';
import routeCategory from './routes/category';
import routeAdminRates from './routes/admin-rates';
import routePasswordReset from './routes/password-reset';

// Init DB => 
initDBConnection();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(require('prerender-node')
    .set('prerenderToken', process.env.PRERENDER));

var whitelist = ['https://kaafila.org', 'https://app.kaafila.org', 'https://administration.kaafila.org'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || process.env.ENV_DEV) {
            callback(null, true)
        } else {
            callback(new Error(`Not allowed by CORS from => ${origin}`))
        }
    },
    credentials: true
}
app.use(cors(corsOptions));


app.use('/api/register', routeRegister);
app.use('/api/login', routeLogin);
app.use('/api/explore', routeExplore);
app.use('/api/packs', routePacks);
app.use('/api/categories', routeCategories);
app.use('/api/category', routeCategory);
app.use('/api/password-reset', routePasswordReset);
// Auth routes
app.use('/api/user', verifyToken, routeUser);
app.use('/api/upload', verifyToken, routeUpload);
app.use('/api/download', verifyToken, routeDownload);
app.use('/api/recently-played', verifyToken, routeRecentlyPlayed);
app.use('/api/video-wached', verifyToken, routeVideoWached);
app.use('/api/statics', verifyToken, routeStatics);
app.use('/api/tokens', verifyToken, routeTokens);
app.use('/api/admin/rates', verifyToken, routeAdminRates);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});


//Sockets
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('getTokens', () => {
        io.emit('tokensPrize', 'reset');
    });

    timePlayedSocket(io, socket);
});