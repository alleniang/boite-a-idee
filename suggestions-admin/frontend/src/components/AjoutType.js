import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { serverUrl } from '../api/params';
import axios from 'axios';
import { purple } from '@mui/material/colors';

export const AjoutType = () => {

    const formik = useFormik({
        initialValues: {
            libelle: '',

        },
        onSubmit: (values, { resetForm }) => {
            axios.post(`${serverUrl}/types/AjoutType`, values)
                .then(res => {
                    alert('Type ajouté !')
                });
            //console.log(values)
            resetForm({ values: '' });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <br />
            <TextField sx={{ m: 0, minWidth: 400 }}
                id="libelle"
                label="Libelle"
                variant="outlined"
                size="large"
                value={formik.values.libelle}
                onChange={formik.handleChange}
                required
            />
            <br />
            <br />
            <br />
            <center>
                <Button type="submit" variant="contained" size="medium" sx={{ backgroundColor: purple[500] }}>
                    Ajouter
                </Button>
            </center>
        </form>
    );
};