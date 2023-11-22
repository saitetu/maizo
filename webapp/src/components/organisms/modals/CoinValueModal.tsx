import * as React from "react";
import Dialog from "@mui/material/Dialog";

interface Props {
  open: boolean;
  name: string;
  value: number;
  image: string;
  handleClose: () => void;
}

export default function CoinValueModal(props: Props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "99999px",
            background:"rgba(0, 0, 0, 0.55)",
            height: "337px",
            width: "337px",
          },
        }}
        onClick={props.handleClose}
      >
     <div className="text-[117px] absolute top-[20%] left-1/2 -translate-x-1/2 gradationColor font-bold">235</div>
     <div className="text-[52px] absolute bottom-[15%] left-1/2 -translate-x-1/2 text-white font-bold">GET!!</div>
      </Dialog>
    </div>
  );
}
