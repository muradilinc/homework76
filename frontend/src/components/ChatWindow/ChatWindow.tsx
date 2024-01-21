'use client';
import React, { useEffect, useState } from 'react';
import { Paper, Stack } from '@mui/material';
import Message from '@/components/Message/Message';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import { MessageResponse } from '@/types';
import cls from './ChatWindow.module.css';

const ChatWindow = () => {
  const {data: messages, refetch} = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const messagesResponse = await axiosApi.get<MessageResponse[]>('/messages');
      return messagesResponse.data;
    }
  });

  const {data: lastMessages} = useQuery({
    queryKey: ['lastMessages'],
    queryFn: async () => {
      const messagesResponse = await axiosApi.get<MessageResponse[]>(`/messages?datetime=${messages && messages[0].datetime}`);
      return messagesResponse.data;
    },
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (lastMessages && lastMessages.length !== 0) {
      void refetch();
    }
  }, [lastMessages, refetch]);

  return (
    <Paper elevation={3} className={cls.chatContainer}>
      <Stack spacing={2}>
        {
          messages && messages.map(message => <Message message={message} key={message.id}/>)
        }
      </Stack>
    </Paper>
  );
};

export default ChatWindow;