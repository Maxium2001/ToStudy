import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', formData); // Assicurati che l'URL sia corretto
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                // Il server ha risposto con uno stato diverso da 2xx
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
                console.error('Error request:', error.request);
            } else {
                // Qualcosa è andato storto nella configurazione della richiesta
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
                <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} placeholder="Cognome" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                <button type="submit">Registrati</button>
            </form>
        </div>
    );
};

export default Register;