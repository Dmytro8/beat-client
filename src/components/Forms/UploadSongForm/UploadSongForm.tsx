import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import classes from "./UploadSongForm.module.scss";

import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { ProgressBar } from "../../../components/common/ProgressBar";
import { Dropzone } from "../../../pages/AccountPage/common/Dropzone";
import { CropImage } from "../../../pages/AccountPage/common/CropImage";
import { formatTime } from "../../../components/Playlist/PlayerPanel/PlayerPanel";
import { UploadSongSchema } from "../FormValidation";

import styled from "styled-components";

export const ErrorMessage = styled.p`
  color: #ed4337;
  margin-left: 14px;
  font-size: 13px;
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
`;

export const CroppedImageContainer = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  margin: 10px auto;
  img {
    width: 100%;
  }
`;

type MessagePropsType = {
  messageType: string;
};

const Message = styled.p`
  color: ${(props: MessagePropsType) => {
    if (props.messageType === "success") return "#2bbf93";
    else return "#ed4337";
  }};
`;

type SubmitButtonProps = {
  isDurationFetching: boolean;
};

export const SubmitButton = styled.button`
  background-color: ${(props: SubmitButtonProps) => {
    if (props.isDurationFetching) return "#2bbf9388";
    else return "#2bbf93";
  }};
  color: ${(props: SubmitButtonProps) => {
    if (props.isDurationFetching) return "#ffffff88";
    else return "#ffffff";
  }};
  width: 100%;
  margin: 10px 0;
`;

export const ValidationTextField = withStyles({
  root: {
    margin: "5px 0",
    width: "100%",
    backgroundColor: "transparent",
    color: "white",
    "& label": {
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "darkorange",
    },
    "& input + fieldset": {
      borderColor: "white",
      color: "white",
      borderWidth: 2,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "darkorange",
      },
    },
  },
})(TextField);

type MessageType = {
  type: string;
  message: string;
};

export const UploadSongForm = () => {
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState("");

  const [songFile, setSongFile] = useState<null | File>(null);
  const [songFileTemplate, setSongFileTemplate] = useState<null | File>(null);
  const [songDuration, setSongDuration] = useState<string>("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorCode, setErrorCode] = useState(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingMessage, setUploadingMessage] = useState<null | MessageType>(
    null
  );

  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);
  const songTemplateInputRef = useRef(null);

  const { handleSubmit, control, errors } = useForm({
    validationSchema: UploadSongSchema,
  });

  useEffect(() => {
    return () => {};
  }, [croppedImage]);

  const checkEmptyFiles = () => {
    if (!imageFile || !songFile) {
      setGeneralError("This field is required");
    }
  };

  const onSubmit = async (data: any) => {
    let { title, artist } = data;
    if (imageFile && songFile) {
      const formData = new FormData();
      formData.append("img", imageFile);
      formData.append("audioFile", songFile);
      formData.append(
        "audio",
        new Blob(
          [
            JSON.stringify({
              name: title,
              artist: artist,
              length: songDuration,
              price: 0,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      setIsLoading(true);
      let response = await axios
        .post(`https://beatstart.herokuapp.com/audio/uploadAudio`, formData, {
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          },
        })
        .then((response) => response)
        .catch((error) => error.response);
      setIsLoading(false);

      if (response.status !== 200) {
        setErrorCode(response.status);
        setUploadingMessage({
          type: "error",
          message: response.data.message,
        });
      } else if (response.status === 200) {
        setUploadProgress(0);
        setUploadingMessage({
          type: "success",
          message: response.data.message,
        });
      }
    }
  };

  const renderProgress = () => {
    if (uploadProgress === 0) return null;
    if (uploadProgress > 0 && uploadProgress < 100) {
      return <ProgressBar progressValue={uploadProgress} />;
    }
  };

  async function getDurationFromFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      // When the file has been succesfully read
      reader.onload = function (event) {
        let audioContext = new (window.AudioContext ||
          // @ts-ignore
          window.webkitAudioContext)();
        // @ts-ignore
        audioContext.decodeAudioData(event.target.result, function (buffer) {
          let duration = buffer.duration;
          resolve(formatTime(duration));
        });
      };
      reader.onerror = function (event) {
        reject({ message: `An error ocurred reading the file: ${event}` });
      };
      reader.readAsArrayBuffer(file);
    });
  }

  const setDurationFromFile = async (file: any) => {
    setIsLoading(true);
    let duration = await getDurationFromFile(file);
    setSongDuration(duration);
    setIsLoading(false);
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={ValidationTextField}
        name="title"
        error={errors.title ? true : false}
        className={classes.uploadSong__textField}
        label="Enter song title"
        control={control}
        defaultValue=""
        variant="outlined"
        helperText={errors.title ? errors.title.message : ""}
      />
      <Controller
        as={ValidationTextField}
        name="artist"
        error={errors.artist ? true : false}
        className={classes.uploadSong__textField}
        label="Enter artist name"
        control={control}
        defaultValue=""
        variant="outlined"
        helperText={errors.artist ? errors.artist.message : ""}
      />
      <Dropzone
        id="imageFileSection"
        legend="Upload image for the song (.JPG, .JPEG, .PNG)"
        accept="image"
        targetRef={imageInputRef}
        setTargetFile={setImageFile}
        setImageSrc={setImageSrc}
        imageSrc={imageSrc}
        generalError={generalError}
        required
      />
      {croppedImage ? (
        <CroppedImageContainer>
          <div
            className={classes.uploadSong__iconWrapper}
            onClick={() => setCroppedImage("")}
          >
            <CloseIcon />
          </div>
          <img src={croppedImage} alt="cropped image" />
        </CroppedImageContainer>
      ) : null}
      {imageSrc ? (
        <CropImage
          imageSrc={imageSrc}
          setTargetFile={setImageFile}
          targetRef={imageInputRef}
          setImageSrc={setImageSrc}
          setCroppedImage={setCroppedImage}
        />
      ) : null}
      <Dropzone
        id="songTemplateFileSection"
        legend="Song file template"
        accept="audio"
        targetRef={songTemplateInputRef}
        setDurationFromFile={setDurationFromFile}
        setTargetFile={setSongFileTemplate}
        generalError={generalError}
        required={false}
      />
      <Dropzone
        id="songFileSection"
        legend="Song file"
        accept="audio"
        targetRef={songInputRef}
        setDurationFromFile={setDurationFromFile}
        setTargetFile={setSongFile}
        generalError={generalError}
        required
      />
      <SubmitButton
        type="submit"
        isDurationFetching={isLoading}
        onClick={checkEmptyFiles}
        disabled={isLoading ? true : false}
      >
        Submit
      </SubmitButton>
      {renderProgress()}
      {uploadingMessage ? (
        <Message messageType={uploadingMessage.type}>
          {uploadingMessage.message}
        </Message>
      ) : null}
    </form>
  );
};
