import { ChangeEvent, FC, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import env from '../env/env';

const Contact: FC = () => {
    const [enteredText, setEnteredText] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const SubmitFeedback = async (text: string) => {
        try {
            setSubmitting(true);
            setEnteredText("");
            setStatusMessage("Attempting message delivery...");
            const res = await axios.post(`${env.apiUrl}/contact`,
                { text });
            console.log(res);
            setStatusMessage("Message delivery successful.");
        }
        catch (err) {
            console.error(err);
            setStatusMessage("Message delivery failed: " + err.message);
        }
        setSubmitting(false);
    };

    return (
        <Col xl={8} className="col-12">
            <Form.Group controlId="formContact" className="mx-auto w-l-75 w-100">
                <Form.Label>
                    Leave a message to the developers with your suggestions, comments or bug reports.
                </Form.Label>
                <Form.Control
                    id="contactBox" 
                    as="textarea"
                    rows={3}
                    value={enteredText} 
                    placeholder="Tell us what you think!" 
                    disabled={submitting}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEnteredText(event.target.value)}>

                    </Form.Control>
            </Form.Group>
            <Button variant="primary" className="mt-3 mr-2" onClick={() => SubmitFeedback(enteredText)} disabled={enteredText === ''} >
                Submit
            </Button>
            {submitting && <Spinner className="mr-2" animation="border" role="status"/>}
            <span>{statusMessage}</span>
        </Col>
    );
}

export default Contact;
