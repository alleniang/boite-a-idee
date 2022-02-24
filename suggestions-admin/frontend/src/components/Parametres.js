import * as React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
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
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { AjoutType } from './AjoutType';
import EditIcon from '@mui/icons-material/Edit';

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

export default function Parametres() {
    const [typeSuggestions, setTypeSuggestions] = useState([])


    useEffect(() => {
        axios.get(`${serverUrl}/types/ListTypes`)
            .then(res => setTypeSuggestions(res.data));


    }, []);

    const [open, setOpen] = useState(false);
    const [ajouter, setAjouter] = useState(false);
    const [modifier, setModifier] = useState(false);
    const [modalData, setModalData] = useState()

    const handleClose = () => {
        setOpen(false);
        setAjouter(false);
        setModifier(false);

        axios.get(`${serverUrl}/types/ListTypes`)
            .then(res => setTypeSuggestions(res.data));
    };

    const handleOpenA = () => {
        setOpen(true);
        setAjouter(true);
    };

    const handleOpenM = (row) => {
        setModalData(row)
        setOpen(true);
        setModifier(true);
    };

    const formik = useFormik({
        initialValues: {
            libelle: modalData && modalData.libelle,

        },
        onSubmit: (values) => {
            axios.put(`${serverUrl}/types/update-Types/${modalData._id}`, values)
                .then(res => {
                    alert('Modification réussie !');
                });
            //console.log(values)
            axios.get(`${serverUrl}/types/ListTypes`)
                .then(res => setTypeSuggestions(res.data));

            setOpen(false);
        },
    });
    const typeAction = (ajouter, modifier) => {
        if (ajouter) {
            return (
                <>
                    <h2 id="parent-modal-title" align="center">Ajouter un type d'idée</h2>
                    <p id="parent-modal-description">
                        <AjoutType />
                    </p>
                </>
            );
        }
        else if (modifier) { 
            return (
                <>
                    <h2 id="parent-modal-title" align="center">Modifier un type d'idée</h2>
                    <p id="parent-modal-description">
                        <form onSubmit={formik.handleSubmit}>
                            <br />
                            <TextField sx={{ m: 0, minWidth: 400 }}
                                id="libelle"
                                label="Libelle"
                                variant="outlined"
                                size="large"
                                value={formik.values.libelle}
                                defaultValue={modalData.libelle}
                                onChange={formik.handleChange}
                                required
                            />
                            <br />
                            <br />
                            <br />
                            <center>
                                <Button type="submit" variant="contained" size="medium" sx={{ backgroundColor: purple[500] }}>
                                    Modifier
                                </Button>
                            </center>
                        </form>
                    </p>
                </>
            )
        }
    }
    return (
        <div>
            <div align="right"><Button sx={{ color: purple[900] }} onClick={handleOpenA}>Ajouter</Button></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div align="right"><Button onClick={handleClose}><CloseIcon sx={{ color: purple[500] }} /></Button></div>
                    {typeAction(ajouter, modifier)}
                </Box>
            </Modal>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Libellé</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typeSuggestions.map((rows) => (

                                <TableRow hover role="checkbox" tabIndex={-1} key={rows._id}>

                                    <TableCell component="th" scope="row">
                                        {rows.libelle}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="Edit" >
                                            <EditIcon sx={{ color: purple[500] }} onClick={() => handleOpenM(rows)} />
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
