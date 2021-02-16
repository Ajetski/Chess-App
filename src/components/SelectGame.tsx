import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import env from '../env/env';

const SelectGame: FC = () => {
    const [rows, setRows] = useState<{ id: string, numMoves: number }[]>([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${env.apiUrl}/game`).then(res => {
            setRows(res.data);
        })
        return () => {
            // clean up
        }
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Game Id</TableCell>
                        <TableCell align="left">Num Moves</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.numMoves}</TableCell>
                            <TableCell align="left">
                                <button className="btn btn-primary"
                                    onClick={() => history.push(`game/watch/${row.id}`)}>
                                    Spectate
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default SelectGame;
