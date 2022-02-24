import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { serverUrl } from '../api/params';
import client from '../api/client';
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "purple",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid purple',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    const [listTypes, setListTypes] = useState([])

    useEffect(() => {
        async function fetchMyAPI() {

            const listTypes = await client.get(`${serverUrl}/types/ListTypes`);
            setListTypes(listTypes.data);

            const listSuggestions = await client.get(`${serverUrl}/suggestions/ListSuggestions`)
            setSuggestions(listSuggestions.data);

        }

        fetchMyAPI()

    }, []);

    const getTypeById = (id) => {
        const result = listTypes.filter(lt => lt._id === id);
        return result[0].libelle
    }

    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState()


    const handleOpen = (row) => {
        setModalData(row)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        axios.get(`${serverUrl}/suggestions/ListSuggestions`)
            .then(res => setSuggestions(res.data));
    };


    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div align="right"><Button onClick={handleClose}><CloseIcon sx={{ color: purple[500] }} /></Button></div>
                    <h2 id="parent-modal-title" align="center">{modalData && getTypeById(modalData.typeSuggestion)}</h2>
                    <p id="parent-modal-description">
                        {modalData && modalData.description}
                    </p>

                </Box>
            </Modal>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suggestions.map((rows) => (

                                <TableRow hover role="checkbox" tabIndex={-1} key={rows._id}>

                                    <TableCell component="th" scope="row">
                                        {getTypeById(rows.typeSuggestion)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {rows.description.substring(0, 100)}...
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="Edit" >
                                            <RemoveRedEyeIcon sx={{ color: purple[500] }} onClick={() => handleOpen(rows)} />
                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </div>
    );
}
