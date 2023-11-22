import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Button, TextField } from "@mui/material";
import { Label } from "../../atoms/Label";
import { useCallback, useEffect, useState } from "react";
import {
  RandomID,
  imagePath,
  imageResize,
  isExtensionValid,
} from "../../../api/helper";
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { registerModalTypes } from "../../../types";

interface Props {
  open: boolean;
  name: string;
  value: number;
  image: string;
  handleClose: () => void;
  onClick: (e:registerModalTypes) => void;
}

export default function RegisterModal(props: Props) {
  const [fileButtonName, setFileButtonName] = useState("画像を選択");
  const [post, setPost] = useState<registerModalTypes>({
    name: "",
    image: "",
    value: 0,
  });
  useEffect(() => {
    if (!props.open) {
      setFileButtonName("画像を選択");
      setPost({
        name: "",
        image: "",
        value: 0,
      });
    }
  }, [props.open]);
  const onDrop = useCallback((file: File[]) => {
    if (file && file[0]) {
      if (!isExtensionValid(file[0].name)) {
        alert(
          "画像形式が正しくありません。iOSの場合、設定->カメラからフォーマット形式を選択し、「互換性優先」に切り替えてから再度お試しください。"
        );
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const resize = (await imageResize(base64)) as string;
        const id = RandomID();
        const storageRef = ref(storage, `${id}.jpg`);
        await uploadString(storageRef, resize.split(",")[1], "base64");
        setFileButtonName(id + ".jpg");
        setPost((e)=>({...e,image:imagePath(id)}));
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop });

  return (
    <form>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "20px",
            background:
              "linear-gradient(14deg, #9747FF 16.05%, #0769FB 94.13%)",
            height: "525px",
            width: "358px",
          },
        }}
      >
        <Label sm className="mt-2">
          名称（空白で改行）
        </Label>
        <TextField
          sx={{ input: { color: "#000" } }}
          className="bg-white w-[90%] mx-auto rounded-lg text-black"
          required
          type="text"
          onChange={(e) => {
            setPost((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <Label sm>画像</Label>
        <input {...getInputProps()} />
        <Button
          {...getRootProps()}
          variant="contained"
          className={classNames(
            "w-[90%] text-center mx-auto text-[23px] bg-white text-[#0072DB] rounded-lg font-bold",
            {
              "bg-[#212121] text-white": isDragActive,
            }
          )}
        >
          {fileButtonName}
        </Button>
        <Label sm>最大コイン枚数</Label>
        <TextField
          sx={{ input: { color: "#000" } }}
          className="bg-white w-[90%] mx-auto rounded-lg"
          required
          type="number"
          onChange={(e) => {
            setPost((prev) => ({ ...prev, value: Number(e.target.value) }));
          }}
        />
        <Button
          onClick={() => {
            props.onClick(post);
          }}
          variant="contained"
          className="w-[300px] h-[60px] text-center mx-auto mt-7 text-[23px] rounded-[30px] bg-[#212121]"
          disabled={post.name === "" || post.value === 0 || post.image === ""}
        >
          埋める
        </Button>
        <Button
          onClick={props.handleClose}
          variant="text"
          className="w-[300px] h-[60px] text-center mx-auto text-[23px] rounded-[30px] text-white"
        >
          キャンセル
        </Button>
      </Dialog>
    </form>
  );
}
