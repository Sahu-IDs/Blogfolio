import { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Container = styled(Box)`
    width: 50%;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    & > div {
        margin-top: 20px;
    }
`;

const Contact = () => {
    const [contact, setContact] = useState({ name: '', email: '', message: '' });
    const [error, setError] = useState(false);

    const onValueChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
        if (e.target.name === 'email') {
            setError(false);
        }
    }

    const sendEmail = () => {
        const { name, email, message } = contact;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(true);
            return;
        }
        const subject = `Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:sandeep@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Container>
                    <TextField label="Name" name="name" value={contact.name} onChange={(e) => onValueChange(e)} variant="outlined" />
                    <TextField 
                        label="Email" 
                        name="email" 
                        value={contact.email} 
                        onChange={(e) => onValueChange(e)} 
                        variant="outlined" 
                        error={error}
                        helperText={error ? "Please enter a valid email address" : ""}
                    />
                    <TextField label="Message" name="message" value={contact.message} onChange={(e) => onValueChange(e)} multiline rows={4} variant="outlined" />
                    <Button variant="contained" onClick={() => sendEmail()} style={{ marginTop: 20 }}>Send Email</Button>
                </Container>
            </Wrapper>
        </Box>
    );
}

export default Contact;