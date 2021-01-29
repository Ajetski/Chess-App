import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import env from '../env/env';

const useStyles = makeStyles({
    // table: {
    //     minWidth: 650,
    // },
});


export default function SelectGame() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get(`${env.apiUrl}/game`).then(res => {
            setRows(() => res.data);
        })
        return () => {
            // clean up
        }
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Game Id</TableCell>
                        <TableCell align="left">Num Moves</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.numMoves}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
