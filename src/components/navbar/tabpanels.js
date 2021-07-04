//import react & hooks
import React, { useState, useEffect } from 'react';
//import material ui items for tab panel
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box, } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
//import axios for get data
import axios from 'axios';
//import SwipeableViews for siwch to each tabpanel with drag
import SwipeableViews from 'react-swipeable-views';
//import component
import Home from './home'
import About from './about'
//import styles
import './tabpanels.css'

//return boxs and childeren , index
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// pas to tab panel 
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

// ----- component asly

export default function Tabpanels() {

  // get data with axios
  const [persons, setPersons] = useState([])
  useEffect(() => {
    getData()
    console.log(persons)
  }, [])

  const getData = () => {
    axios.get(`https://random-data-api.com/api/address/random_address?size=10`)
      .then(res => setPersons(res.data))
      .catch(err => console.log(err))
    console.log(persons);
  }

  // sent tabpanel to top with usestate , useeffect 
  const [top, settop] = useState("nav--tabs")
  const controlnavbar = () => {
    if (window.scrollY > 100) {
      settop("nav--tabs2")
    } else {
      settop("nav--tabs")
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlnavbar)
    return () => {
      window.removeEventListener('scroll', controlnavbar)
    }
  }, [])

  //handel change tab with click
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  

  return (
    <div className='nav--top'>
      <AppBar className={top} >
        <Tabs 
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="White"
        >
          <Tab label="home" {...a11yProps(0)}/>
          <Tab label="about" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      <TabPanel value={value} index={0}>
        <Home persons={persons} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About persons={persons} />
      </TabPanel>
      </SwipeableViews>
    </div>
  );
}

