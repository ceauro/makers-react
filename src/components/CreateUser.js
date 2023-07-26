import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function CreateUser({ open, onClose }) {

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const[errorHeader, setErrorHeader] = useState('');
    const [errors, setErrors] = useState({});
    const [errorsMessage, setErrorsMessage] = useState([])
    const [showWarning, setShowWarning] = useState(false);

    const handleChange = (e, { name, value }) => {
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const postData = () => {
        const isValid = validateForm();
        setShowWarning(!isValid);

        if(isValid){
          axios({
            url: "http://localhost:8080/api/student",
            method: "POST",
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email
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
      setErrorHeader('Ocurrió un error guardando el estudiante');
      setErrorsMessage([error.message]);
      console.log('Error', error.message);
    }

    const validateForm = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};
        const errorMessages = [];
    
        if (!data.firstName) {
          newErrors.firstName = true;
          errorMessages.push('El primer nombre es requerido');
        }
    
        if (!data.email) {
          newErrors.email = true;
          errorMessages.push('El email es requerido');
        } else if(!emailPattern.test(data.email)) {
          newErrors.email = true;
          errorMessages.push('El email es inválido');
        }

        // Update the errors state
        setErrors(newErrors);
        setErrorsMessage(errorMessages);
        setErrorHeader('Algunos son inválidos!')
    
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
      };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Modal.Header> Crear Estudiante </Modal.Header>
        <Modal.Content>
            <div>
                <Form error>
                    <Form.Input
                        label="Nombre"
                        name="firstName"
                        placeholder="Nombre del estudiante, p.e. Ana"
                        value={data.firstName}
                        onChange={handleChange}
                        error={errors.firstName ? true : false}
                        ref={firstNameRef}
                    />
                    <Form.Input
                        label="Apellidor"
                        name="lastName"
                        placeholder="Apellido del estudiante, p.e. Maria"
                        value={data.lastName}
                        onChange={handleChange}
                        ref={lastNameRef}
                    />
                    <Form.Input
                        label="Email"
                        name="email"
                        placeholder="Correo electrónico del estudiante, p.e. abc@fgh.com"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email ? true : false}
                        ref={emailRef}
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
            <Button onClick={postData} type='submit'>Save</Button>
            <Button negative onClick={onClose}> Close </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};