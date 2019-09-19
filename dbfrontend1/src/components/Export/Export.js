import React, { Component } from 'react';
import gql from "graphql-tag";
import axios from 'axios';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { print } from "graphql"
import { withStyles } from "@material-ui/core/styles";
import {createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Snackbar from '../Login/Snackbar';
import {AppBar} from '@material-ui/core';
const styles = theme => ({
  fab:{
    margin:'0 auto',
    width:'39%',
    marginTop:theme.spacing(10)
  },
  appbar:{
    margin:'0 auto',
    width:374,
    marginTop:theme.spacing(10)
  },
  app:{
    background:"red"
  },
  textField: {
    width: 489,
    marginTop: theme.spacing(2),
  },
  margin: {
    marginLeft: theme.spacing(44),
    marginTop:theme.spacing(4),
  },
  nav:{
    background:"black",
    height:45,
    paddingLeft:theme.spacing(7),
    justifyContent:'center',
    alignItems:"center"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

class Export extends Component {
  state = {
    value:'',
    focusName:false,
    focusPassword:false,
    blurPassword:false,
    blurName:false,
    userName:'',
    userPassword:'',
    hostName:'',
    portName:'',
    isClicked:false,
    errorMsg:false
  }

  componentDidMount(){
    const impHostname=this.props.location.state.impHostname;
    const impPortname=this.props.location.state.impPortname;
    const impDbname=this.props.location.state.impDbname;
    const impSelectedCollection=this.props.location.state.userData;
    this.setState({
      impHostname:impHostname,
      impPortname:impPortname,
      impDbname:impDbname,
      impSelectedCollection:impSelectedCollection
    })
  } 
 
  connect = () => { 
    if(this.state.hostName&&this.state.portName&&this.state.value){
      console.log("button clicked in export",this.state)
      console.log("button clicked in export",this.state)
      const collectionList = this.state.impSelectedCollection.toString();
      axios.post("http://localhost:5000/graphql", {
        query:print(gql`
          mutation adduser($host:String!,$port:String!,$impHost:String!,$impPort:String,$impDb:String,$collectionList:String!){
            adduser(host:$host,port:$port,impHost:$impHost,impPort:$impPort,impDb:$impDb,collectionList:$collectionList) 
          },
        `),
        variables:{
          host:this.state.hostName,
          port:this.state.portName,
          impHost:this.state.impHostname,
          impPort:this.state.impPortname,
          impDb:this.state.impDbname,
          collectionList:collectionList,
        }      
      })
      .then((result) => {
        console.log("result",JSON.parse(result.data.data.adduser));
        console.log("result without parsing",result)
        this.props.history.push({
          pathname: '/Exportlist',
            query: {
              userData: JSON.parse(result.data.data.adduser)
            },
            state:{users:JSON.parse(result.data.data.adduser)}
        })              
      }, err => {
        console.log(err)
      })
    }
    else{
      this.setState({
        errorMsg:true
      })
    }              
  }
  handleChange=(event)=>{
    this.setState({
      value:event.target.value
    })
  }
  handleChangeHost=(event)=>{
    this.setState({
      hostName:event.target.value  
    })
  }

  handleChangePort=(event)=>{
    this.setState({
      portName:event.target.value  
    })
  }

  handleChangeName=(event)=>{
    this.setState({
      userName:event.target.value
    })
  }

  handleChangePassword=(event)=>{
    this.setState({
      userPassword:event.target.value
    })
  }
  
  onFocusName=()=>{
    this.setState({
      focusName:true,
    })
  }
  
  onFocusPassword=()=>{
    this.setState({
      focusPassword:true
    })
  }

  onBlurName=()=>{
    this.setState({
      blurName:true,
    })
  }

  onBlurPassword=()=>{
    this.setState({
      blurPassword:true,
    })
  }
  render() {
    const options = [
      {
        value: ''  
      },
      {
        value: 'None'  
      },
      {
        value: 'Username/Password'  
      },
      {
        value: 'SCRAM-SHA-256'  
      },
      {
        value: 'Kerberos' 
      },
      {
        value: 'LDAP'  
      },
    ];
    const { classes } = this.props;
    return (
      <div  className={classes.fab}> 
        <AppBar title="My App" style={{ align: "center" }} className={classes.nav}>Export from Host</AppBar>
        <div >
          <form  noValidate autoComplete="off">
            <TextField
              id="standard-with-placeholder"
              label="Hostname"
              placeholder="localhost"
              className={classes.textField}
              margin="normal"
              fullWidth
              onChange={(event) => {
                this.handleChangeHost(event)
              }}
            />
            <div>
              <TextField
                id="standard-with-placeholder"
                label="Port"
                placeholder="27017"
                className={classes.textField}
                margin="normal"
                fullWidth
                onChange={(event) => {
                  this.handleChangePort(event)
                }}
              />
            </div>
            <div>
              <TextField
                select
                label="Authentication"
                required className={classes.textField}
                onChange={(event) => {
                  this.handleChange(event)
                }}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="filled"
                fullWidth
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </div>
            <div>
              {this.state.value==="Username/Password"?
                <div>
                  <div>
                    <TextField
                      id="outlined-dense"
                      label="UserName"
                      className={clsx(classes.textField, classes.dense)}
                      variant="outlined"
                      onFocus={
                        this.onFocusName
                      }
                      onChange={(event) => {
                        this.handleChangeName(event)
                      }}
                      onBlur={
                        this.onBlurName
                      }
                    />
                    {this.state.blurName&&!this.state.userName?
                      <Snackbar blurName={this.state.blurName} userName={this.state.userName} />
                    :null}
                  </div>
                  <div>
                    <TextField
                      label="Password"
                      className={clsx(classes.textField, classes.dense)}
                      onFocus={
                        this.onFocusPassword
                      }
                      onBlur={
                        this.onBlurPassword
                      }
                      onChange={(event) => {
                        this.handleChangePassword(event)
                      }}
                      type="password"
                      variant="outlined"
                    />
                    {this.state.blurPassword&&!this.state.userPassword?
                      <Snackbar  blurPassword={this.state.blurPassword} userPassword={this.state.userPassword}/>
                    :null}
                  </div>
                </div>
              :null}  
            </div>
          </form>
        </div>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" className={classes.margin} onClick={this.connect}>
            Export
          </Button>
          {this.state.errorMsg&&(!this.state.hostName||!this.state.portName||!this.state.value)?
            <Snackbar  errorMsg={this.state.errorMsg}/>
          :null}
        </ThemeProvider>         
      </div>
    );
  }
}
export default withStyles(styles)(Export);