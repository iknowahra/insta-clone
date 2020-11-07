import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const allTypes = loadFilesSync(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers = loadFilesSync(
  path.join(__dirname, '/api/**/*.resolver.js'),
);

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
