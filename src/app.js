const express = require('express');
const app = express();
const config = require('./config/config')
const routes = require('./routes/index')
const cors = require('cors')
const models = require('./db/models')
const postgres = require('./config/postgres')
const morgen = require('./config/morgen')
const logger = require('./config/logger');
const {errorConverter, errorHandler} = require('./middlewares/error')
const morgan = require('./config/morgen');
const { status } = require('http-status');
const ApiError = require('./utils/ApiError');

models.sequelize.sync();

if (config.env !== 'test') {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

app.use(morgen.errorHandler);
app.use(morgen.successHandler);

app.use((req, _, next) => {
    req.postgres = postgres;
    next();
})

app.use(express.json());
app.use('/v1', routes);

app.use((req, res, next)=> {
    next(new ApiError(status.NOT_FOUND, 'Not found'))
})

app.use(cors());
app.options('*', cors());

const port = config.port || 3000;
app.listen(port, () => {
    logger.info(`Server is runing on port ${port}`);
})

app.use(errorConverter);
app.use(errorHandler);
