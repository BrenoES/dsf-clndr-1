import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { Box, createStyles, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    gridContainer: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      }
    },
    boxWidth: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '25%'
      }
    }
  })
);

export default function ProductList({ loading, data }) {
  const classes = useStyles();

  return (
    <Grid className={classes.gridContainer} container>
      {(loading ? Array.from(new Array(6)) : data).map((item, index) => (
        <Box key={index} className={classes.boxWidth} minWidth={250} height="fit-content" paddingLeft={1} paddingRight={1} my={5}>
          {item ? (
            <img style={{ width: '100%', height: '100%' }} alt={item.name} src='/images.jpg' />
          ) : (
            <Skeleton variant="rect" className={classes.boxWidth} height={'100%'} />
          )}
          {item ? (
            <Box pr={2}>
              <Typography gutterBottom variant="body1">
                {item.name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {`avaliações - ${Number(item._meta.score / 10).toFixed(2)} • visitas - ${item._meta.visitsClickCount}`}
              </Typography>
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}