import { RepositoryContextProvider } from './contexts/RepositoryContext';
import { Repositories } from './pages/Repositories';
import './styles/global.css';

function App() {
  return (
    <div className="py-8 flex justify-center w-full bg-github min-h-screen">
      <RepositoryContextProvider>
        <Repositories />
      </RepositoryContextProvider>
    </div>
  );
}

export default App;
