import { AppRouter } from './routers';
import { Providers } from './providers';

const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
