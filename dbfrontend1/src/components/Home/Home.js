import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from './Snackbar';
import { green } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import {createMuiTheme} from '@material-ui/core/styles';
import gql from "graphql-tag";
import axios from 'axios';
import { print } from "graphql"
const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing(2),
    overflowX: 'auto',
    fontSize:40,
    color:'red',
    alignItems: "center",
    background: 'cornflowerblue',
    justifyContent:"center"
  },
  table: {
    minWidth: 200,
    background: 'bisque',
    alignItems: "center",
  },
  link:{
    color:"blue",
    fontSize:'15px',
    textDecoration:"none",
    background: 'bisque',
},
  divele:{
    fontSize:'10',
    width:'50%',
    margin:'0 auto',
    marginTop: theme.spacing(8),
  },
  linkPath:{
    color:"blue",
    fontSize:'15px',
    textDecoration:"none",    
  },
  margin: {
    marginTop:theme.spacing(4),
    justifyContent:"center"
  },
});
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
class Home extends Component {
  state = {
    users:[] ,
    dbname:'',
    emptyCollection:false,
    errorMsg:''
  }

  componentDidMount() {
    const localData=localStorage.getItem('localData')
    if(!localData){
      console.log(this.props.location)
      const users=this.props.location.state.userData.data.getuser;
      const hostName=this.props.location.state.hostName;
      const portName=this.props.location.state.portName;
      localStorage.setItem('localData',JSON.stringify(this.props.location.state));
      const localData=localStorage.getItem('localData')
      console.log(localData)
      this.setState({
        users:users,
        hostName:hostName,
        portName:portName
      })   
    }else{
      const localData=localStorage.getItem('localData')
      const local=JSON.parse(localData)
      console.log("localData in else",JSON.parse(localData));
      const hostName=local.hostName;
      const portName=local.portName;
      const users=local.userData.data.getuser
      console.log("hostname",hostName,portName,users)
      this.setState({
        users:users,
        hostName:hostName,
        portName:portName
      })   
     } 
  } 
  collections=(user)=>{
    console.log("called collections",user,this.state)
    console.log("button clicked",this.state)
    axios.post("http://localhost:5000/graphql", {
      query:print(gql`
        query{
          getcollection(host:"${this.state.hostName}",port:"${this.state.portName}",dbname:"${user.name}") {
            name,
            type,
          }
        }      
      `)
    })
    .then((result) => {
      this.setState({
        dbname:user.name
      })
      if(result.data.data.getcollection.length>0){
        const obj=result.data
        console.log("result.data",obj);
        this.props.history.push({
          pathname: '/Collections',
          query: {
            userData: obj
          },
          state:{userData:obj,user:this.state.users,hostName:this.state.hostName,portName:this.state.portName,dbName:this.state.dbname}
        })           
      }else{
        this.setState({
          emptyCollection:true,
          errorMsg:true
        })
      }
    }, err => {
      this.setState({
        user:true
      });
      console.log(err)
    })
  }  
  render() {
    console.log("dbName",this.state)
    const { classes } = this.props;
    return ( 
      <div className={classes.divele}>
        <Table className={classes.link} color="secondary">
          <TableHead >
            <TableRow >
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">sizeOnDisk</TableCell>
              <TableCell align="center">empty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(user=> (
              <TableRow key={user.name}>
                <TableCell  align="center">
                  <Link 
                    className={classes.link}
                    onClick={() => {this.collections(user)}} >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align="center"><Link className={classes.link} to={{ pathname: '/Collections', state: { userdetails:{user}} }}>{user.sizeOnDisk}</Link></TableCell>
                <TableCell align="center"><Link className={classes.link} to={{ pathname: '/Collections', state: { userdetails:{user}} }}>{user.empty}</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ThemeProvider theme={theme}>
        {this.state.errorMsg&&this.state.emptyCollection?
            <Snackbar dbName={this.state.dbname} errorMsg={this.state.errorMsg}/>
          :null}
        </ThemeProvider>  
      </div>
    );
  }
}
export default withStyles(styles)(Home);


