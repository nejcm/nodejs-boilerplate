import { Server, startServer } from '../start';

let server: Server,
 baseURL: string;
beforeAll(async () => {
  server = await startServer();
  const address = server.address();
  baseURL = `http://localhost:${
    typeof address === 'string' ? address : address?.port
  }/api`;
  // eslint-disable-next-line no-console
  console.log(baseURL);
});

afterAll(() => server.close());
