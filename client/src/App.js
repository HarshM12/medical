import Header from './component/Page/Header';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import DoctorRoutes from './component/routes/DoctorRoutes';
import PatientRoutes from './component/routes/PatientRoutes';
import Nav from './component/Page/Home';
import Home from './component/Page/Home';
import Footer from './component/Page/Footer';
import About from './component/Page/About';
import Doctor from './component/Page/Doctor';
import Login from './component/Page/Login';
import Blog from './component/Page/Blog';
import Contact from './component/Page/Contact';
import Register from './component/Page/Register';
import DoctorRegister from './component/Page/DoctorRegister';
import PatientRegister from './component/Page/PatientRegister';
import UserProfile from './component/Page/UserProfile';
import AdminRoute from './component/routes/AdminRoutes';
import Logout from './component/Page/Logout';

function App() {
  let user_role = UserProfile.getRole();
  console.log("Role:" + user_role)
  if(user_role){
    console.log("logged..");
    if(user_role === "Doctor"){
      let user = UserProfile.getName();
      return(
        <DoctorRoutes />
      )
    }
    if(user_role === "Patient"){
      let user = UserProfile.getName();
      return(
        <PatientRoutes />
      );
    }
    if(user_role === "Admin"){
      return(
        <AdminRoute />
      );
    }
  }else{
    return(
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/About' element={<About />} exact />
          <Route path='/Doctor' element={<Doctor />} exact />
          <Route path='/Blog' element={<Blog/>} exact />
          <Route path='/Contact' element={<Contact/>} exact></Route>

          <Route path='/Register' element={<Register/>} exact />
          <Route path='/DoctorRegister' element={<DoctorRegister/>} exact />
          <Route path='/PatientRegister' element={<PatientRegister/>} exact />
          <Route path='/Login' element={<Login/>} exact />
          <Route path='/Logout' element={<Logout/>} exact/>

        </Routes>
      </Router>      
    );
  }
}

export default App;
