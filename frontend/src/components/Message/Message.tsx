import React from 'react';
import { Paper, Typography } from '@mui/material';
import { MessageResponse } from '@/types';
import cls from './message.module.css';
import { Box } from '@mui/system';
import dayjs, { extend } from 'dayjs';

interface Props {
  message: MessageResponse;
}

const Message: React.FC<Props> = ({message}) => {
  const messageDate = dayjs(message.datetime);
  const currentDate = dayjs();
  const yesterdayDate = currentDate.subtract(1, 'day');

  let formattedDate;

  if (messageDate.isAfter(yesterdayDate)) {
    formattedDate = 'Вчера';
  } else {
    formattedDate = messageDate.format('D MMMM HH:mm');
    if (!messageDate.isSame(currentDate, 'year')) {
      formattedDate += messageDate.format(' YYYY');
    }
  }

  return (
    <Paper className={cls.messageItem}>
      <Box className={cls.messageAuthor}>
        <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>
          {message.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formattedDate ? formattedDate : messageDate.format('DD.MM.YYYY HH:mm')}
        </Typography>
      </Box>
      <Typography variant="body1">
        {message.message}
      </Typography>
    </Paper>
  );
};

export default Message;