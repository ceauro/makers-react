import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';

export default function UpdateUser({ open, onClose, student, onChange }) {
    

    const[errorHeader, setErrorHeader] = useState('');
    const [errors, setErrors] = useState({});
    const [errorsMessage, setErrorsMessage] = useState([])
    const [showWarning, setShowWarning] = useState(false);

    const putData = () => {
        const isValid = validateForm();
        setShowWarning(!isValid);

        if(isValid){
          axios({
            url: "http://localhost:8080/api/student/"+student.id,
            method: "PUT",
            data: {
              firstName: student.firstName,
              lastName: student.lastName,
              email: student.email
            },
        })
            // Handle the response from backend here
            .then((response) => {
                onClose();
                window.location.reload();
            })
  
            // Catch errors if any
            .catch((error) => {
                handleError(error);
            });
        }
    }
    
    const handleError = (error) => {
      setShowWarning(true);
      setErrorHeader('Ocurrió un error actualizando el estudiante');
      setErrorsMessage([error.message]);
      console.log('Error', error.message);
    }

    const validateForm = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};
        const errorMessages = [];
    
        if (!student.firstName) {
          newErrors.firstName = true;
          errorMessages.push('El primer nombre es requerido');
        }
    
        if (!student.email) {
          newErrors.email = true;
          errorMessages.push('El email es requerido');
        } else if(!emailPattern.test(student.email)) {
          newErrors.email = true;
          errorMessages.push('El email es inválido');
        }

        // Update the errors state
        setErrors(newErrors);
        setErrorsMessage(errorMessages);
        setErrorHeader('Algunos campos tienen errores:')
    
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
      };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Modal.Header> Actualizar Estudiante </Modal.Header>
        <Modal.Content>
            <div>
                <Form error>
                    <Form.Input
                        label="Nombre"
                        name="firstName"
                        placeholder="Nombre del estudiante, p.e. Ana"
                        value={student.firstName}
                        onChange={onChange}
                        error={errors.name ? true : false}
                    />
                    <Form.Input
                        label="Apellidor"
                        name="lastName"
                        placeholder="Apellido del estudiante, p.e. Maria"
                        value={student.lastName}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Email"
                        name="email"
                        placeholder="Correo electrónico del estudiante, p.e. abc@fgh.com"
                        value={student.email}
                        onChange={onChange}
                        error={errors.email ? true : false}
                    />
                    {showWarning &&
                    (<Message error
                             header={errorHeader}
                             list={errorsMessage}
                    />)}
                </Form>
            </div>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={putData} type='submit' primary>Actualizar</Button>
            <Button negative onClick={onClose}> Cerrar </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};