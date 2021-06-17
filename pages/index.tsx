import Head from 'next/head'
import React, { useState } from 'react';
import CustomizedInputBase from '../components/CustomizedInputBase';
import ProductList from '../components/ProductList';
import SuggestionsTags from '../components/SuggestionsTags';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import StoreIcon from '@material-ui/icons/Store';
import { getProduct } from '../api/searchProductAPI';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        padding: '0 20px'
      },
    },
    toolbar: {
      minHeight: '76px'
    },
    storeIcon: {
      margin: '0 5px'
    }
  })
);

export default function Home() {
  const classes = useStyles();

  const [listProducts, setListProducts] = useState([])
  const [listSuggestions, setListSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('camiseta');

  const handleSearch = async () => {

    try {
      setIsLoading(true)
      const { data } = await getProduct(searchTerm);
      const { products, suggestions } = data as any;

      setListProducts(products)
      setListSuggestions(suggestions)
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    handleSearch()
  }, [searchTerm])

  const TextResult = () => (
    listProducts.length > 1 ? 'Resultados para' : 'Resultado para'
  );

  return (
    <>
      <Head>
        <title>Dsf Clndr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <StoreIcon className={classes.storeIcon} fontSize="large" />
          <Typography className={classes.title} variant="h6" noWrap>
            MarketPlace
          </Typography>
          <CustomizedInputBase placeholder="Buscar aqui seu produto" onSearchClick={(term) => term && setSearchTerm(term)} />
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12}>
          <Box padding="0 20px">
            {
              (listSuggestions.length > 0) && <Box display="flex" flexWrap="wrap" padding="15px 0px" >
                <Box minWidth="200px">
                  <Typography noWrap variant="h6">Buscas relacionadas: </Typography>
                </Box>
                <SuggestionsTags listSuggestions={listSuggestions} />
              </Box>
            }
            {!isLoading && <Typography variant="h4">{`${listProducts.length} ${TextResult()} "${searchTerm}"`}</Typography>}
            {listProducts.length && < ProductList data={listProducts} loading={isLoading} />}

          </Box>
        </Grid>
      </Grid>
    </>
  )
}
