import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export default function CustomButton(props) {
  const ColorButton = withStyles((theme) => ({
    root: {
      color: props.color === "#FFDE59" ? "black" : "white",
      backgroundColor: props.color,
      paddingRight: props.pr,
      paddingLeft: props.pl,
      paddingTop: props.pt,
      paddingBottom: props.pb,
      marginTop: props.mt,
      marginRight: props.mr,
      marginLeft: props.ml,
      marginBottom: props.mb,
      borderRadius: props.br,
      '&:hover': {
        backgroundColor: props.color,
      },
    },
  }))(Button);

  return (
    <div>
      <ColorButton variant="contained" color="primary" endIcon={props.endIcon}>
        {props.icon}
        {props.content}
      </ColorButton>
      
    </div>
  );
}