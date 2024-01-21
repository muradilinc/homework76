import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={client}>
        <main>

        </main>
      </QueryClientProvider>
    </>
  );
}
