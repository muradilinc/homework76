import express from 'express';
import cors from 'cors';
import messagesRouter from "./routes/messages";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log('we online port: ' + port);
});