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
      {props.userName===""&&props.blurName?
        <SnackbarContent className={classes.snackbar}
          message={
            <span id="client-snackbar" className={classes.message}>
              < ErrorIcon className={clsx(classes.icon, classes.iconVariant)}/> 
              Username is empty           
            </span>
          } 
        />
      :null}
      {props.userPassword===""&&props.blurPassword?
        <SnackbarContent
        className={classes.snackbar}
          message={
            <span id="client-snackbar" className={classes.message}>
              < ErrorIcon className={clsx(classes.icon, classes.iconVariant)}/> 
              Password is empty           
            </span>
          }  
        />
      :null}
      {props.errorMsg?
        <SnackbarContent
        className={classes.snackbar}
          message={
            <span id="client-snackbar" className={classes.message}>
              < ErrorIcon className={classes.icon}/> 
              Enter all the fields      
            </span>
          }
        />
      :null}
    </div>
  );
}
  