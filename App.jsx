
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from "./Components/Navbar";

import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Searchfilter from './Components/SearchFilter';
import { ProfileProvider } from './Context/ProfileContext';
import ProfileDescription from './Components/ProfileDescription';


function App() {

  return (
    <>
    <ProfileProvider>
      <Router>
        <Navbar/>
        <Searchfilter/>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/profile/:id" element={<ProfileDescription />} />
        </Routes>
         
      </Router>
    </ProfileProvider>
      
    </>
  )
}

export default App
