import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [message, setMessage] = useState('');
        const [loading, setLoading] = useState(false);
        const [responseMessage, setResponseMessage] = useState('');
        const [error, setError] = useState('');

        const handleSubmit = async(e) => {
            e.preventDefault();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            setLoading(true);

            try {
                const response = await axios.post('http://localhost:5000/api/contact', {
                    name,
                    email,
                    message,
                });

                setResponseMessage(response.data.message); // Display the response message
                setName('');
                setEmail('');
                setMessage('');
            } catch (error) {
                setError('❌ Error sending message. Please try again.');
                console.error('Error submitting contact form:', error);
            } finally {
                setLoading(false);
            }
        };

        return ( < div style = {
                { textAlign: 'center', marginTop: '50px' }
            } >
            <
            h2 > Contact Us < /h2> <
            form onSubmit = { handleSubmit } >
            <
            input type = "text"
            placeholder = "Your Name"
            value = { name }
            onChange = {
                (e) => setName(e.target.value)
            }
            required /
            >
            <
            br / > < br / >

            <
            input type = "email"
            placeholder = "Your Email"
            value = { email }
            onChange = {
                (e) => setEmail(e.target.value)
            }
            required /
            >
            <
            br / > < br / >

            <
            textarea placeholder = "Your Message"
            value = { message }
            onChange = {
                (e) => setMessage(e.target.value)
            }
            required /
            >
            <
            br / > < br / >

            <
            button type = "submit"
            disabled = { loading } > { loading ? 'Sending...' : 'Send Message' } <
            /button> < /
            form >

            {
                responseMessage && < p style = {
                    { color: 'green' }
                } > { responseMessage } < /p>} {
                error && < p style = {
                    { color: 'red' }
                } > { error } < /p>} </div >
            );
        };

        export default ContactUs;