import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setInputValue(value);
  }

  const handleSearchClick = () => {
    props.onSearchClick(inputValue);
  }

  const clearSearch = () => setInputValue('');

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={inputValue || ''}
        placeholder={props.placeholder}
        inputProps={{ 'aria-label': props.ariaLabelInput }}
        onChange={handleChange}
        fullWidth
      />
      <IconButton className={classes.iconButton} onClick={clearSearch}>
        <ClearIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label={props.ariaLabelButton} onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}