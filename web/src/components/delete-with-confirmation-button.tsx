"use client";

import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface Props {
  onDelete: () => void;
  dialogTitle: string;
  dialogContent?: string;
}

function DeleteWithConfirmationButton(props: Props) {
  const { onDelete, dialogTitle, dialogContent } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(async () => {
    setDialogOpen(true);
  }, [setDialogOpen]);

  const handleCancel = useCallback(async () => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  const handleOk = useCallback(async () => {
    onDelete();
    setDialogOpen(false);
  }, [setDialogOpen, onDelete]);

  return (
    <Box>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={dialogOpen}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (
          <DialogContent dividers>{dialogContent}</DialogContent>
        )}
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={openDialog} title="Delete project">
        <Delete />
      </Button>
    </Box>
  );
}

export default DeleteWithConfirmationButton;
