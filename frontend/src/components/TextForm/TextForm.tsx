import { Message } from '@/types';
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axiosApi from '@/axiosApi';
import { useMutation } from '@tanstack/react-query';
import { Box } from '@mui/system';
import cls from './TextForm.module.css';

const TextForm = () => {
  const [message, setMessage] = useState<Message>({
    message: '',
    author: '',
  });

  const messagesMutation = useMutation({
    mutationFn: async (message: Message) => {
      await axiosApi.post('/messages', message);
    }
  });

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setMessage(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    await messagesMutation.mutateAsync(message);
    setMessage({
      message: '',
      author: '',
    });
  };

  return (
    <form onSubmit={sendMessage}>
      <Box className={cls.fieldsContainer}>
        <TextField
          multiline
          rows={4}
          name="message"
          label="Message"
          required
          style={{
            width: '40%'
          }}
          value={message.message}
          onChange={changeField}
        />
        <TextField
          label="Author"
          name="author"
          value={message.author}
          required
          onChange={changeField}
        />
        <Button style={{alignSelf: 'flex-start'}} variant="contained" type="submit">Send</Button>
      </Box>
    </form>
  );
};

export default TextForm;