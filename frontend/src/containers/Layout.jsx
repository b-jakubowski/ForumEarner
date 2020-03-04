import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const dataToCities = ({ data }) => {
  const cities = {};

  data.map(d => checkAgeAndSetKey(cities, d.location));
  // console.log(cities);

  return cities;
};

const dataToJobs = ({ data }) => {
  const jobs = {};

  data.map(d => {

  });

  return jobs;
};

const checkAgeAndSetKey = (obj, key) => {
  if (!obj[key]) {
    obj[key] = 1;
  } else {
    obj[key]++;
  }
};

const mapAge = ({ data }) => {
  const age = {};

  data.map(d => {
    switch (true) {
      case d.age <= 20:
        checkAgeAndSetKey(age, '<=20');
        break;
      case d.age >= 21 && d.age <= 25:
        checkAgeAndSetKey(age, '21-25');
        break;
      case d.age >= 26 && d.age <= 30:
        checkAgeAndSetKey(age, '26-30');
        break;
      case d.age >= 31 && d.age <= 35:
        checkAgeAndSetKey(age, '31-35');
        break;
      case d.age >= 36 && d.age <= 40:
        checkAgeAndSetKey(age, '36-40');
        break;
      case d.age >= 41 && d.age <= 45:
        checkAgeAndSetKey(age, '41-45');
        break;
      default:
        checkAgeAndSetKey(age, '>46');
        break;
    };
    return '';
  });

  return age;
}

const parseTest = () => {
  const csvFilePath = require("../data/data_test.csv");
  const Papa = require("papaparse/papaparse.min");

  Papa.parse(csvFilePath, {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: (res) => {
      mapAge(res);
      dataToCities(res)
    }
  });
}


const Layout = () => {
  const classes = useStyles();
  parseTest();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>1</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>2</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>3</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Paper className={classes.paper}>4</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>5</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>6</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>7</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>8</Paper>
        </Grid>
      </Grid>
    </div>
  );

};

export default Layout;
