import React, { Component } from 'react';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { withStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
const styles = theme => ({
  root:{
    width:'37%',
    margin:'0 auto',
    marginTop: theme.spacing(8),
    background: 'bisque',
  },
  divele:{
    fontSize:'10',
    width:'11%',
    margin:'0 auto',
    marginTop: theme.spacing(8),
  },
  link:{
    color:"blue",
    fontSize:'15px',
    textDecoration:"none",
    background: 'bisque',
  },
  linkPath:{
    color:"blue",
    fontSize:'15px',
    textDecoration:"none"    
  },
  margin: {
    marginTop:theme.spacing(4),
    justifyContent:"center"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

class Exportlist extends Component {
  state = {
    dbNames:[]
  }

  componentDidMount() {
    const dbNames=this.props.location.state.users;
    console.log("dbnames",dbNames)
    this.setState({
      dbNames:dbNames
    })   
  }   
  render() {
    const { classes } = this.props;
    const icon = <TagFacesIcon />;
    return (
      <div className={classes.root}>
        <div className={classes.divele}>
          {this.state.dbNames.map(dbName=> (
            <Chip
              key={dbName.name}
              variant="outlined"
              label={dbName.name}
              icon={icon}
              className={classes.chip}
              color="secondary"
            />
          ))}      
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Exportlist);


