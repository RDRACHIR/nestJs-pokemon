export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: parseInt(process.env.PORT, 3001) || 3000,
  databaseUrl: process.env.MONGODB || 'mongodb://localhost:27017/nest-pokemon',
});
