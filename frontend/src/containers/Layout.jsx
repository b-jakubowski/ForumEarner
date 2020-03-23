import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import PieChart from "../components/PieChart";
import useParseCsvToChartData from "../hooks/useParseCsvToChartData";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chartTitle: {
    margin: 0,
  }
}));

const Layout = () => {
  const classes = useStyles();
  const [ loading, age, cities, contract, stack ] = useParseCsvToChartData();

  return (
    <div className={classes.root}>
      { loading
        ? (
            <p>Loading...</p>
          )
        : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 500 }}>
                <h3 className={classes.chartTitle}>Stack</h3>
                <PieChart
                  data={stack}
                  theme="yellow_green_blue"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 500 }}>
                <h3 className={classes.chartTitle}>Cities</h3>
                <PieChart
                  data={cities}
                  theme="blues"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 500 }}>
                <h3 className={classes.chartTitle}>Users age</h3>
                <PieChart
                  data={age}
                  theme="oranges"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 500 }}>
                <h3 className={classes.chartTitle}>Contract type</h3>
                <PieChart
                  data={contract}
                  theme="reds"
                />
              </Paper>
            </Grid>
          </Grid>
        )
      }
    </div>
  );
};

export default Layout;
