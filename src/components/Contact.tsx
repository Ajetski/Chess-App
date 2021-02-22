import { FC, useState } from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import env from '../env/env';

const Contact: FC = () => {
    const [enteredText, setEnteredText] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    return (
        <div className="col-xl-8 col-12">
            <p>
                Use the textbox below to leave a message to the developers with your suggestions, comments or bug reports.
            </p>
            <div className="mx-auto w-l-75 w-100" >
                <TextField id="contactBox" value={enteredText} label="Tell us what you think!" disabled={submitting}
                    variant="filled" multiline={true} rows={5} fullWidth={true} onChange={(event: any) => setEnteredText(event.target.value)} />
                <button className='btn btn-primary' onClick={() => SubmitFeedback(enteredText)} disabled={enteredText === ''} >
                    Submit
                </button>
                <p>{statusMessage}</p>
            </div>
        </div>
    )

    async function SubmitFeedback(text: string) {
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
            console.log(err);
            setStatusMessage("Message delivery failed: " + err.message);
        }
        setSubmitting(false);
    }
}

export default Contact;