import React from 'react'
import Navbar from '../navbar/Navbar'
import admin from "./admin.svg"
import create from "./create.svg"
import view from "./view.svg"
import update from "./update.svg"
import "./adminProfile.css"
import { useNavigate } from 'react-router-dom'



export default function AdminProfile() {
    const navigate = useNavigate()
    const onClickHandler = () =>{
        navigate("/addfaculties")
    }
    return (
        <div>
            <Navbar />
            <div className='admin-des'>
                <img src={admin} alt='admin' />
            </div>
            <div className='dashboard'>
                <div className='d1'>
                    <img src={create} alt='create' />
                    <button className='d-button' onClick={onClickHandler}>Create Table</button>
                </div>
                <div className='d1'>
                    <img src={view} alt='view' />
                    <button className='d-button'>View Table</button>
                </div>
                <div className='d1'>
                    <img src={update} alt='update' />
                    <button className='d-button'>Update Table</button>
                </div>
            </div>
        </div>
    )
}
