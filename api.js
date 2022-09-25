const express = require('express');
const app = express();
const helmet = require("helmet");
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = 3000;
const corsOptions = {
    origin: 'http://localhost:3000/api-docs/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());
app.use(helmet());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Router
const router = require('./routes/router.js');
app.use('/', router);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    console.log(`Swagger doc Listening at http://localhost:${port}/api-docs/`);
});