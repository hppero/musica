import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './alert.css';

class Alert extends Component {
  state = {
    
    tituloMensaje:'',
    cuerpoMensaje:''

  };

//   handleClickOpen () {
//     console.log(' Usuario o Clave incorrecta 2- '+this.state.open);
//     this.setState({ open: true });
//     console.log(' Usuario o Clave incorrecta 3- '+this.state.open);
// };

  

  render() {
    return (
      <div className="content-alert" >
        <Dialog
          
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className='title'>{this.props.tituloMensaje}</DialogTitle>
          <DialogContent >
            <DialogContentText id="alert-dialog-description" className='descripcion'>
                {this.props.cuerpoMensaje}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Alert;
