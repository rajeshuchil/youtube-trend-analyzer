import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'

function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
