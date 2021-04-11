import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import env from '../env/env';

const SelectGame: FC = () => {
    const [rows, setRows] = useState<{ id: string, numMoves: number }[]>([]);
    // const history = useHistory();

    useEffect(() => {
        axios.get(`${env.apiUrl}/game`).then(res => {
            setRows(res.data);
        });
    }, [])

    return (
        <Table striped bordered hover variant="dark" aria-label="simple table">
            <thead>
                <tr>
                    <th align="left">Game Id</th>
                    <th align="left">Num Moves</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        <td align="left">{row.id}</td>
                        <td align="left">{row.numMoves}</td>
                        <td align="left">
                            <Button variant="primary">
                                {/* onClick={() => history.push(`game/watch/${row.id}`)}> */}
                                Spectate
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default SelectGame;
