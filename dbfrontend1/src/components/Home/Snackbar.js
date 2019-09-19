import React from 'react';
import clsx from 'clsx';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles1 = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.red,
  }, 
  message: {
    display: 'flex',
    alignItems: 'center',
  }, 
  appbar:{
    margin:'0 auto',
    width:374,
    marginTop:theme.spacing(1)
  },
  snackbar:
  {
    background:"red",
    color:'black',
    fontSize:17
  },
  icon:{
    padding:theme.spacing(1)
  }
}));
  
export default function Snackbar(props) {
  const classes = useStyles1();
  return (
    <div className={classes.appbar}>
        <SnackbarContent className={classes.snackbar}
          message={
            <span id="client-snackbar" className={classes.message}>
              < ErrorIcon className={clsx(classes.icon, classes.iconVariant)}/> 
              Can not export the Database {props.dbName}          
            </span>
          } 
        />
    </div>
  );
}
  