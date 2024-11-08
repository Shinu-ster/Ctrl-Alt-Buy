import MyRoutes from "./routes/MyRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:10000
    }
  }
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MyRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
