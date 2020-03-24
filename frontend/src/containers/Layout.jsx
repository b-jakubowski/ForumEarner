import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import PieChart from "../components/PieChart";
import useParseCsvToChartData from "../hooks/useParseCsvToChartData";
import BarChart from "../components/BarChart";

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
  const [ loading, age, cities, contract, stack, experience ] = useParseCsvToChartData();

  return (
    <div className={classes.root}>
      { loading
        ? (
            <p>Loading...</p>
          )
        : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 450 }}>
                <h3 className={classes.chartTitle}>Users age</h3>
                <PieChart
                  data={age}
                  theme="greens"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 450 }}>
                <h3 className={classes.chartTitle}>Contract type</h3>
                <PieChart
                  data={contract}
                  theme="oranges"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Paper className={classes.paper} style={{ height: 600 }}>
                <h3 className={classes.chartTitle}>Cities</h3>
                <BarChart
                  data={cities}
                  theme="spectral"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 450 }}>
                <h3 className={classes.chartTitle}>Stack</h3>
                <PieChart
                  data={stack}
                  theme="pastel1"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper} style={{ height: 450 }}>
                <h3 className={classes.chartTitle}>Experience (years)</h3>
                <PieChart
                  data={experience}
                  theme="pastel2"
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
