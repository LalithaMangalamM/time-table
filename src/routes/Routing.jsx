import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import AdminProfile from "../profilePage/AdminProfile";
import FacultyDetails from "../facultyDetails/FacultyDetails";
import AddSubject from "../addSub/AddSubject";
import CreateTable from "../createTable/CreateTable";
import Profile from "../profile/Profile";
import Profilewa from "../profile-wa/Profilewa";
import View from "../viewtt/View";

export default function Routing() {
  return (
      <Routes>
        <Route  path="/" element={<Home />}></Route>
        <Route  path="/admin" element={<AdminProfile />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route  path="/createtable" element={<CreateTable />} />
        <Route  path="/addfaculties" element={<AddSubject />} />
        <Route path="/faculty-details" element={<FacultyDetails /> } />
        <Route path="/profiles/:useremail" element={<Profilewa />} />
        <Route path="/viewtables" element={<View/>}/>
      </Routes>
  )
}
