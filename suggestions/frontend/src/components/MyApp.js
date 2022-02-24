import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { serverUrl } from '../api/params';
import client from '../api/client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { purple, green } from '@mui/material/colors';
import logo from './logo_w2c.png';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useFormik, FormikProvider } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function MyApp() {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }));

  const [open, setOpen] = React.useState(false);
  const [listTypes, setListTypes] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      const listTypes = await client.get(`${serverUrl}/types/ListTypes`);
      setListTypes(listTypes.data);
    }

    fetchMyAPI()

  }, []);

  const formik = useFormik({
    initialValues: {
      typeSuggestion: '',
      description: '',

    },
    onSubmit: (values, { resetForm }) => {
      axios.post(`${serverUrl}/suggestions/AjoutSuggestion`, values)
        .then();
      resetForm({ values: '' });
      setOpen(true)

    },
  })
  if (!open) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: purple[700] }}>
          <img src={logo} height="60px" width="140px" />
        </AppBar>

        <Grid container spacing={2}>
          <Grid item xs={6} md={12}>
            <Item><h1>Boite à idées</h1></Item>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6} md={2}></Grid>
          <Grid item xs={6} md={5}>
            <FormikProvider value={formik}>
              <row>
                <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                  <FormControl sx={{ m: 0, width: 1 }}>
                    <InputLabel id="typeSuggestion">Type d'idées*</InputLabel>
                    <Select
                      labelId="typeSuggestion"
                      id="typeSuggestion"
                      size="small"
                      variant="outlined"
                      label="Type de Suggestion"
                      onChange={formik.handleChange}
                      name="typeSuggestion"
                      value={formik.values.typeSuggestion}
                      required
                    >
                      {listTypes.map(lt => <MenuItem key={lt._id} value={lt._id}>{lt.libelle}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    size="normal"
                    name="description"
                    sx={{ m: 0, width: 1 }}
                    multiline
                    rows={10}

                    onChange={formik.handleChange}
                    value={formik.values.description}
                    required
                  />
                  <br />
                  <br />
                  <center>
                    <Button type="reset" variant="outlined" size="medium" color="error">
                      Annuler
                    </Button>
                    &nbsp;&nbsp;
                    <Button type="submit" variant="contained" size="medium" color="secondary">
                      Envoyer
                    </Button>
                  </center>
                </form>
              </row>
            </FormikProvider >
          </Grid>
          <Grid item xs={6} md={3}>
            <Item sx={{ fontFamily: 'Raleway', fontSize: 22, textAlign: 'justify' }}>
              <p>
                Way2call atteste sur l'honneur que les suggestions faites à partir de cette boite à idées sont totalement anonymes.
                Aucune donnée permettant de retracer l'auteur ne sera stockée ou exploitée.
              </p>
            </Item>
          </Grid>

          <Grid item xs={6} md={2}></Grid>

        </Grid>

      </Box>
    );
  }
  return (
    <>
      <Box sx={{ width: '100%', height: 140, marginTop: '18%', backgroundColor: green[700], color: "white" }}>
        <br />
        <center><h1>Votre idée a bien été enregistrée !!!</h1></center>
      </Box>
    </>
  );
}
