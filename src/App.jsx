// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LoginSection } from './Components/LoginSection';
import { RegisterSection } from './Components/RegisterSection';
import { HomeSection } from './Components/HomeSetion';
import { AuthProvider } from './Components/PrivateHook/AuthContext';
import PrivateRoute from './Components/PrivateHook/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginSection />} />
          <Route path="/register" element={<RegisterSection />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeSection />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
