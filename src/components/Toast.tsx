import { IconButton, Snackbar, SnackbarProps } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { eventBusService } from "@services/eventBusService";

interface ToastProps extends SnackbarProps {
  closable?: boolean;
}

export const Toast = () => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastProps>({});
  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    eventBusService.on("showToast", toast => {
      setToast(toast);
      setOpen(true);
    })
  }, [])

  const closeButton = (
      <IconButton size="small" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small"/>
      </IconButton>
  )

  return (
      <Snackbar
          open={open}
          onClose={handleClose}
          action={(toast.closable ?? true) ? closeButton : toast.action}
          {...toast}
      />
  )
}
