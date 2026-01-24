import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'

function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 bg-gray-50">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
