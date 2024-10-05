import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './Layout'
import Client from './pages/Client'
import Consultant from './pages/Consultant'
import Marketing from './pages/Marketing'
import Location from './pages/Location'
import ServiceType from './pages/ServiceType'
import ServiceOrders from './pages/ServiceOrders'
import Users from './pages/Users'
import ProtectAuth from './pages/ProtectAuth'
import DashboardUsers from './pages/DashboardUsers'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectAuth>
              <Layout />
            </ProtectAuth>
          }
        >
          {/* Default route */}
          <Route index element={<Dashboard />} />

          {/* Nested routes under "dashboard" */}
          <Route path="service-orders" element={<ServiceOrders />} />
          <Route path="client" element={<Client />} />
          <Route path="consultant" element={<Consultant />} />
          <Route path="users" element={<Users />} />
          <Route path="locations" element={<Location />} />
          <Route path="service-type" element={<ServiceType />} />
          <Route path="user" element={<DashboardUsers />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
