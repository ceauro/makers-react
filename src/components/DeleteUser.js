
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react';


export default function DeleteUser({ open, onClose, student}) {
    
    const deleteStudent = () => {
        axios({
            url: "http://localhost:8080/api/student/"+student.id,
            method: "DELETE",
        }).then((response) => {
                window.location.reload();
        }).catch((error) => {
                console.log("Error eliminando estudiante", error);
                onClose();
        });
    }
    
    return (
        <div>
          <Modal open={open} onClose={onClose}>
            <Modal.Header> Eliminar Estudiante </Modal.Header>
            <Modal.Content>
                ¿Desea eliminar al estudiante {student.firstName} con id {student.id}?
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={deleteStudent}> Si </Button>
                <Button negative onClick={onClose}> No </Button>
            </Modal.Actions>
          </Modal>
        </div>
      );
}