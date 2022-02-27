import express from 'express';

const app = express();
const port = 8080;

app.get(
    '/',
    (req, resp) => resp.send('Status 200 OK')
);

export const serve = () => app.listen(
    port,
    () => console.log(`App listening on port ${port}`)
);
