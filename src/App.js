import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './Layout';
import Client from './pages/Client';
import Consultant from './pages/Consultant';
import Marketing from './pages/Marketing';
import Location from './pages/Location';
import ServiceType from './pages/ServiceType';
import ServiceOrders from './pages/ServiceOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login/>}
        />
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="service-orders" element={<Layout />}>
          <Route index element={<ServiceOrders />} />
        </Route>
        <Route path="client" element={<Layout />}>
          <Route index element={<Client />} />
        </Route>
        <Route path="consultant" element={<Layout />}>
          <Route index element={<Consultant />} />
        </Route>
        <Route path="marketing" element={<Layout />}>
          <Route index element={<Marketing />} />
        </Route>
        <Route path="locations" element={<Layout />}>
          <Route index element={<Location />} />
        </Route>
        <Route path="service-type" element={<Layout />}>
          <Route index element={<ServiceType />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
