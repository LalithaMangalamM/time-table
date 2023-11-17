import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Login from "./login/Login"
import Navbar from './navbar/Navbar';
import Home from './home/Home';
// import Signup from './signup/Signup';
import FacultyDetails from './facultyDetails/FacultyDetails';
import CreateTable from './createTable/CreateTable';
import { DepartmentProvider } from './DepartmentContext';
import { ClassProvider } from './ClassContext';
import Table from './Table';
import AddSubject from './addSub/AddSubject';
import AdminProfile from './profilePage/AdminProfile';
import Routing from './routes/Routing';
import Search1 from './Search1'
import Profile from './profile/Profile';
import View from './viewtt/View';

function App() {
  return (
    <div className="App">
     <DepartmentProvider>
     <ClassProvider>
      <BrowserRouter>
      {/* <View /> */}
        <Routing />
        {/* <Search1 /> */}
        {/* <Profile /> */}
        {/* <TimeTable /> */}
        {/* <CreateTable /> */}
        {/* <FacultyDetails /> */}
      </BrowserRouter>
      </ClassProvider>
      </DepartmentProvider>
    </div>
  );
}

export default App;
