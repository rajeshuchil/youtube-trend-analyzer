import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from './pages/LandingPage'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/Dashboard/Overview'
import TrendingVideos from './pages/Dashboard/TrendingVideos'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Overview />} />
                        <Route path="trending" element={<TrendingVideos />} />
                        <Route path="categories" element={<div className="p-8 text-white">Categories Page - Coming Soon</div>} />
                        <Route path="search" element={<div className="p-8 text-white">Search Page - Coming Soon</div>} />
                        <Route path="settings" element={<div className="p-8 text-white">Settings Page - Coming Soon</div>} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
