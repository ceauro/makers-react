import axios from 'axios';
import React, { useEffect,useState } from "react";
import CreateUser from "./CreateUser";
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

export default function ListUser(){

    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [dataStudent, setDataStudent] = useState({});
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios({
 
            // Endpoint to send files
            url: "http://localhost:8080/api/student/all",
            method: "GET",
            // Attaching the form data
            //data: formData,
        })
            // Handle the response from backend here
            .then((response) => {
                setAPIData(response.data.students);
            })
 
            // Catch errors if any
            .catch((error) => {
                console.log('Error', error.message);
            });
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleCloseUpdate = () => setOpenUpdate(false);
    const handleOpenUpdate = (data) => {
        setOpenUpdate(true);
        setDataStudent(data);
    };

    const handleCloseDelete = () => setOpenDelete(false);
    const handleOpenDelete = (data) => {
        setOpenDelete(true);
        setDataStudent(data);
    }

    const formatDate = (mili) => {
        let dateFormatted = '';
        if(mili){
            let date = new Date(mili);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            dateFormatted = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
        }
        

        return dateFormatted;
    };

    const handleChangeUpdate = (e, { name, value }) => {
        setDataStudent((prevData) => ({ ...prevData, [name]: value }));
    };

    return(
        <>
        <CreateUser open={open} onClose={handleClose} />
        <UpdateUser open={openUpdate} onClose={handleCloseUpdate} student={dataStudent} onChange={handleChangeUpdate} />
        <DeleteUser open={openDelete} onClose={handleCloseDelete} student={dataStudent} />
        <div class="ui container">
            <button class="ui primary button" onClick={handleOpen}>Create User <i class="plus icon"></i></button>
            <div class="ui table">
                <table class="ui selectable celled striped unstackable table">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Actualización</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {APIData.map((data)=>{
                            return(
                                <>
                                    <tr>
                                        <td>{data.firstName}</td>
                                        <td>{data.lastName}</td>
                                        <td>{data.email}</td>
                                        <td>{formatDate(data.creationDate)}</td>
                                        <td>{formatDate(data.modificationDate)}</td>
                                        <td>
                                            <button onClick={() => handleOpenUpdate(data)} class="ui icon primary button"><i class="edit icon"></i></button>
                                            <button onClick={() => handleOpenDelete(data)} class="ui icon negative button"><i class="trash icon"></i></button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}