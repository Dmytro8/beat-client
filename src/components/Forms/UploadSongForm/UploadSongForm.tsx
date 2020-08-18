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
  const [isDurationFetching, setIsDurationFetching] = useState(false);

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
            }),
          ],
          {
            type: "application/json",
          }
        )
      );

      // await axios
      //   .post(`https://beatstart.herokuapp.com/audio/uploadAudio`, formData, {
      //     onUploadProgress: (progressEvent) => {
      //       setUploadProgress(
      //         Math.round((progressEvent.loaded / progressEvent.total) * 100)
      //       );
      //       // console.log(
      //       //   "Uploaded progress: " +
      //       //     Math.round((progressEvent.loaded / progressEvent.total) * 100) +
      //       //     "%"
      //       // );
      //     },
      //   })
      //   .then((res) => {
      //     setUploadProgress(0);
      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       setErrorCode(error.response.status);
      //     }
      //   });
    }
  };

  const renderProgress = () => {
    if (uploadProgress === 0) return null;
    if (uploadProgress > 0 && uploadProgress < 100) {
      return <ProgressBar progressValue={uploadProgress} />;
    }
  };
  const renderMessage = () => {
    if (errorCode !== 200 && uploadProgress === 100) {
      return <p className={classes.errorMessage}>Failed upload process</p>;
    } else if (errorCode === 200 && uploadProgress === 100) {
      return (
        <p className={classes.successMessage}>
          Your song was successfully uploaded
        </p>
      );
    } else return null;
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
    setIsDurationFetching(true);
    let duration = await getDurationFromFile(file);
    setSongDuration(duration);
    setIsDurationFetching(false);
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
        setIsDurationFetching={setIsDurationFetching}
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
        setIsDurationFetching={setIsDurationFetching}
        required
      />
      <SubmitButton
        type="submit"
        // className={classes.uploadSong__submitButton}
        isDurationFetching={isDurationFetching}
        onClick={checkEmptyFiles}
        disabled={isDurationFetching ? true : false}
      >
        Submit
      </SubmitButton>
      {renderProgress()}
      {renderMessage()}
    </form>
  );
};
