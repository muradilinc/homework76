'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatWindow from '@/components/ChatWindow/ChatWindow';
import { Container } from '@mui/material';
import TextForm from '@/components/TextForm/TextForm';
import { Box } from '@mui/system';

const client = new QueryClient();

export default function Home() {

  return (
    <>
      <QueryClientProvider client={client}>
        <main>
          <Container maxWidth="lg" style={{
            margin: '20px auto',
          }}>
            <Box>
              <ChatWindow/>
              <TextForm/>
            </Box>
          </Container>
        </main>
      </QueryClientProvider>
    </>
  );
}
