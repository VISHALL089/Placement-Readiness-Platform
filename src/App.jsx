import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import JDAnalyzer from './pages/JDAnalyzer';
import History from './pages/History';
import Results from './pages/Results';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="analyzer" element={<JDAnalyzer />} />
                    <Route path="history" element={<History />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/results/:id" element={<DashboardLayout />} >
                    <Route index element={<Results />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
