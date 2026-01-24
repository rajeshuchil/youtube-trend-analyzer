import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from './pages/LandingPage'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/Dashboard/Overview'
import TrendingVideos from './pages/Dashboard/TrendingVideos'
import Categories from './pages/Dashboard/Categories'
import Search from './pages/Dashboard/Search'
import Settings from './pages/Dashboard/Settings'

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
                        <Route path="categories" element={<Categories />} />
                        <Route path="search" element={<Search />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
