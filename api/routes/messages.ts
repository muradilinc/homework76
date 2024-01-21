import {Router} from "express";
import {promises as fs} from "fs";
import crypto from "crypto";
import {Message, MessageBody} from "../types";

const messagesRouter = Router();
let data: Message[] = [];
const filename = './db.json';

messagesRouter.post('/', async (req, res, next) => {
  try {
    const messageBody: MessageBody = {
      message: req.body.message,
      author: req.body.author,
    };

    if (!messageBody.message || !messageBody.author) {
      return res.status(422).send({error: 'Author and message must be present in the request'});
    }

    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();

    data.push({...messageBody, id, datetime});
    await fs.writeFile(filename, JSON.stringify(data));
    res.send("message sent");
  } catch (error) {
    next(error);
  }
});

messagesRouter.get('/', async (req, res, next) => {
  try {
    const fileContent = await fs.readFile(filename);
    data = JSON.parse(fileContent.toString());
    const startDate = req.query.datetime as string;

    if (startDate) {
      const date = new Date(startDate).getDate();
      if (!isNaN(date)) {
        const newMessages = data.filter(message => Date.parse(message.datetime) > Date.parse(startDate));
        res.send(newMessages);
      } else {
        return res.status(400).send({error: 'Date is wrong!'});
      }
    } else {
      const filteredByDate = data.sort((firstDate, secondDate) => Date.parse(secondDate.datetime) - Date.parse(firstDate.datetime));
      res.send(filteredByDate.slice(0, 30));
    }
  } catch (error) {
    next(error);
  }
});

export default messagesRouter;