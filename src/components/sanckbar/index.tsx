import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}


export interface CustomSnackbarRef {
  onClick(dialogSnackBar: DialogSnackBar): void,
}


interface DialogSnackBar {
  message: string,
  error: boolean,
}



export const CustomSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorState, setError] = useState(false);

  const [transition, setTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  useImperativeHandle(ref, () => ({
    onClick({ message, error }) {
      setMsg(message)
      setError(error)
      setTransition(TransitionUp);
      setOpen(true);
    }
  } as CustomSnackbarRef));

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <Button
      color="secondary"
      size="small"
      onClick={handleClose}>
      fechar
    </Button>
  );

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      message={msg}
      key={transition ? transition.name : ''}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={errorState ? "error" : "success"}>
        {msg}
      </Alert>
    </Snackbar>

  )
})