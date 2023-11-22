import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";

interface Props {
  open: boolean;
  name: string;
  value: number;
  image: string;
  handleClose: () => void;
  onClick: () => void;
}

export default function GetModal(props: Props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "20px",
            background: "linear-gradient(14deg, #9747FF 16.05%, #0769FB 94.13%)",
            height: "525px",
            width: "358px",
          },
        }}
      >
        <div style={{
          background: "linear-gradient(181deg, #000 71.13%, #A48100 94.41%)",
          height: "98.5%",
          width: "98%",
          margin: "auto",
          borderRadius: "20px",
        }}>
          <div className="text-center font-bold text-[31px] mt-7">
            {props.name.split(/\s+/).map((word, index, array) => (
              <React.Fragment key={index}>
                {word}
                {index < array.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          <img
            className="h-[188px] text-center mx-auto mt-5 rounded-[10px]"
            src={props.image}
            alt="thumbnail"
          />
          <div className="text-center font-bold text-[23px] mt-8">
            獲得コイン
          </div>
          <div className="text-center font-bold text-[43px] mt-1 gradationModalTextColor">
            ??? ~ {props.value}
          </div>

          <Button
            onClick={props.onClick}
            variant="contained"
            className="w-[300px] h-[60px] absolute bottom-5 left-1/2 -translate-x-1/2 text-[23px] rounded-[30px] bg-[#212121]"
          >
            宝箱を開ける
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
