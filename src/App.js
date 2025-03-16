import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import Client from "./pages/Client";
import Location from "./pages/Location";
import ServiceType from "./pages/ServiceType";
import ServiceOrders from "./pages/ServiceOrders";
import Author from "./component/Author";
import { UserProvider } from "./Context/UserProvider";
import ServiceTypeProvider from "./Context/ServiceTypeProvider";
import LocationProvider from "./Context/LocationPrivider";
import ClientProvider from "./Context/ClientProvider";
import Users from "./pages/Users";
import ServiceOrderProvider from "./Context/ServiceOrder";
import DetailOrders from "./pages/SubPage/DetailOrders";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={
              <Author>
                <Layout />
              </Author>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="service-orders"
              element={
                <ServiceOrderProvider>
                  <ServiceOrders />
                </ServiceOrderProvider>
              }
            />
            <Route
              path="service-orders/detail-orders/:id"
              element={<DetailOrders />}
            />
            <Route
              path="client"
              element={
                <ClientProvider>
                  <Client />
                </ClientProvider>
              }
            />
            <Route path="users" element={<Users />} />
            <Route
              path="locations"
              element={
                <LocationProvider>
                  <Location />
                </LocationProvider>
              }
            />
            <Route
              path="service-type"
              element={
                <ServiceTypeProvider>
                  <ServiceType />
                </ServiceTypeProvider>
              }
            />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
