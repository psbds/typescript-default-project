import * as express from 'express';
import * as http from 'http';
import * as serverEvents from './server/serverEvents';

import DefaultHandler from './server/serverHandlerDefaults';
import ErrorHandler from './server/serverHandlerError';
import NotFoundHandler from './server/serverHandlerNotFound';

//import * as Routes from './routes/routes/index';
const app: express.Application = express();

DefaultHandler.init(app);

//Routes.init(app);

NotFoundHandler.init(app);
ErrorHandler.init(app);


// App Settings
app.set('port', process.env.PORT || 80);
app.set('secret', process.env.SECRET || 'superSecret');


// Running Web Server
const Server: http.Server = http.createServer(app);

Server.listen(app.get('port'));

Server.on('error', (error: Error) => serverEvents.onError(error, app.get('port')));
Server.on('listening', serverEvents.onListening.bind(Server));

export default app;