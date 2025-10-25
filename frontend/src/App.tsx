import Login from './pages/login';
import SellerDashboard from './pages/SellerDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContexts';

const AppContent = () => {
  const { user } = useAuth();

  // If user is logged in, show dashboard, otherwise show login
  return user ? <SellerDashboard /> : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;