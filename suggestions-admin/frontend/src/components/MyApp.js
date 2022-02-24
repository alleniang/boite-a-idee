import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { purple } from '@mui/material/colors';
import logo from './logo_w2c.png';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Toolbar } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Suggestions from './Suggestions';
import Parametres from './Parametres';


export default function MyApp() {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }));

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: purple[700] }}>
        <Toolbar sx={{ marginLeft: '-23px' }}>
          <img src={logo} height="63px" width="140px" />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={6} md={12}>
          <Item><h1>Boite à idées</h1></Item>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
              <Tab label="Idées" value="1" />
              <Tab label="Paramètres" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><Suggestions /></TabPanel>
          <TabPanel value="2"><Parametres /></TabPanel>

        </TabContext>
      </Box>
    </Box>

  );

}
