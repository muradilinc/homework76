'use client'
import React from 'react';
import { Paper, Stack } from '@mui/material';
import Message from '@/components/Message/Message';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import { MessageResponse } from '@/types';
import cls from './ChatWindow.module.css';

const ChatWindow = () => {
  const {data: messages} = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const productResponse = await axiosApi.get<MessageResponse[]>('/messages');
      return productResponse.data;
    },
  });

  return (
    <Paper elevation={3} className={cls.chatContainer}>
      <Stack spacing={2} direction="column-reverse">
        {
          messages && messages.map(message => <Message message={message} key={message.id}/>)
        }
      </Stack>
    </Paper>
  );
};

export default ChatWindow;