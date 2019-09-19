import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import {createMuiTheme} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
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

class Collections extends Component {
  state = {
    users:[] ,
    checked:false
  }
  
  componentDidMount() {
    console.log(this.props.location.state)
    const users=this.props.location.state.userData.data.getcollection;
    const hostName=this.props.location.state.hostName;
    const portName=this.props.location.state.portName;
    const dbName=this.props.location.state.dbName;
    console.log(users)
    this.setState({
      dbName:dbName,
      users:users,
      hostName:hostName,
      portName:portName,
      checked:false,
      selectedCollection:[]
    })   
  }
  handleInputChange= this.handleInputChange.bind(this);  
  handleInputChange (event) {
    console.log("event.target.value",event.target.value)
    if (this.state.selectedCollection) {
      var selectedArr = [...this.state.selectedCollection]
    } 
    if(selectedArr.indexOf(event.target.value) !== -1){
      console.log("value exists")
      var index = selectedArr.indexOf(event.target.value);
      if (index > -1) {
        selectedArr.splice(index, 1);
      }
    }
    else{
      selectedArr.push(event.target.value)
    }       
    this.setState({
        selectedCollection: selectedArr
    })
    selectedArr.forEach(element => {
      console.log("element",element)  
    });
  }
  collections=()=>{
    if(this.state.selectedCollection.length>0) {
      console.log("this.state.selectedCollection",this.state.selectedCollection)
      this.props.history.push({
        pathname: '/Export',
        state:{userData:this.state.selectedCollection,impDbname:this.state.dbName,impHostname:this.state.hostName,impPortname:this.state.portName}
      }) 
    }
    else{
      console.log("usersssss",this.state.users)
      const arr=[];
      for(const each of this.state.users)
      {
        arr.push(each.name)
      }
      console.log("arr",arr)
      this.props.history.push({
        pathname: '/Export',
        state:{userData:arr,impDbname:this.state.dbName,impHostname:this.state.hostName,impPortname:this.state.portName}
      }) 
    }  
  }  
  render() {
    console.log("this.state",this.state.selectedCollection)
    const { classes } = this.props;
    return ( 
      <div className={classes.divele}>
        <Table className={classes.link} color="secondary">
          <TableHead >
            <TableRow >
              <TableCell align="center">name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(user=> (
              <TableRow key={user.name}>
                <TableCell  align="center">{user.name}</TableCell>
                <TableCell align="center">{user.type}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    value={user.name}
                    onClick={this.handleInputChange} 
                    checked={user.checked}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" allign='center' className={classes.margin} onClick={this.collections}>
            {/* <Link className={classes.linkPath} to={{ pathname: '/Export', state: { selectedCollection:{this.state.selectedCollection}} }}>Next</Link> */}
            Next
          </Button>  
        </ThemeProvider>  
      </div>
    );
  }
}
export default withStyles(styles)(Collections);


