import * as dotenv from 'dotenv';
dotenv.config();

import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { PrismaClient } from '@prisma/client';
import './utils/passport';
import { authenticateJwt } from './utils/passport';
import { isAuthenticated } from './utils/middlewares';

const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => {
    return { request, prisma, isAuthenticated };
  },
});

const options = {
  port: PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
);
