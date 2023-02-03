import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from './components/Layout';
import Home from './components/Home'
import Login from './components/Login'
import Bonus from './components/Bonus';
import About from './components/About';
import Logout from './components/logout';
import StaffManagement from './components/StaffManagement/StaffManagement';
import SuspendedStaff from './components/StaffManagement/SuspendedStaff';
import RetrenchedStaff from './components/StaffManagement/RetrenchedStaff';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' index element={<Home />} />
        <Route path='bonus/male' element={<Bonus staff="Male" />} />
        <Route path='bonus/female' element={<Bonus staff="Female" />} />
        <Route path='staff-management/customer-care/'>
          <Route path='' index element={<StaffManagement staff_type="customer-care" />} />
          <Route path='suspended-staff' element={<SuspendedStaff staff_type="customer-care" />} />
          <Route path='retrenched-staff' element={<RetrenchedStaff staff_type="customer-care" />} />
        </Route>
        <Route path='staff-management/senior/'>
          <Route path='' index element={<StaffManagement staff_type="senior" />} />
          <Route path='suspended-staff' element={<SuspendedStaff staff_type="senior" />} />
          <Route path='retrenched-staff' element={<RetrenchedStaff staff_type="senior" />} />
        </Route>
        <Route path='staff-management/security/'>
          <Route path='' index element={<StaffManagement staff_type="security" />} />
          <Route path='suspended-staff' element={<SuspendedStaff staff_type="security" />} />
          <Route path='retrenched-staff' element={<RetrenchedStaff staff_type="security" />} />
        </Route>
        <Route path='about' element={<About />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
    </>
  )

);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
