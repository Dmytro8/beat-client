import React, { useState, useContext, useRef } from "react";

import classes from "./UploadPage.module.scss";

import { ACCESS_TOKEN } from "../../../../constants";
import { useHistory } from "react-router-dom";
import { HOME } from "../../../../constants/route.urls";

import axios from "axios";
import { ProgressBar } from "../../../../components/common/ProgressBar";
import { AuthContext } from "../../../../contexts/AuthContext/AuthContext";
import {
  updateAuthentication,
  updateToken,
} from "../../../../contexts/AuthContext/actions";

export const UploadPage = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<string | File>("");
  const [songFile, setSongFile] = useState<string | File>("");

  const [imageFileName, setImageFileName] = useState("");
  const [songFileName, setSongFileName] = useState<null | string>(null);

  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorCode, setErrorCode] = useState(null);

  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);
  let history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    authDispatch(updateAuthentication(false));
    authDispatch(updateToken(null));
    history.replace(HOME);
  };
  const formSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", songTitle);
    data.append("artist", songArtist);
    data.append("img", imageFile);
    data.append("audioFile", songFile);

    await axios
      .post(`https://beatstart.herokuapp.com/audio/uploadAudio`, data, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
          // console.log(
          //   "Uploaded progress: " +
          //     Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          //     "%"
          // );
        },
      })
      .then((res) => {
        setUploadProgress(0);
      })
      .catch((error) => {
        if (error.response) {
          setErrorCode(error.response.status);
        }
      });
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
  return (
    <div className={classes.settings}>
      <h1>Upload subpage</h1>
      <section className={classes.logout}>
        <button onClick={logoutHandler} className={classes.logout__button}>
          Log out
        </button>
      </section>
      <section className={classes.uploadSong}>
        <form encType="multipart/form-data" onSubmit={formSubmit}>
          <input
            type="text"
            name="songTitle"
            placeholder="Enter song title"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <input
            type="text"
            name="artistName"
            placeholder="Enter artist name"
            value={songArtist}
            onChange={(e) => setSongArtist(e.target.value)}
          />

          <input
            type="file"
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png"
            ref={imageInputRef}
            onChange={(e) => {
              setImageFile(e.target.files![0]);
              setImageFileName(e.target.files![0].name);
            }}
          />
          <label htmlFor="uploadImage">
            Upload image for the song (.JPG, .JPEG, .PNG)
          </label>
          <button
            type="button"
            name="uploadImage"
            onClick={() => {
              if (imageInputRef && imageInputRef.current) {
                // @ts-ignore
                imageInputRef.current.click();
              }
            }}
          >
            Upload
          </button>
          <p>{imageFileName}</p>

          <input
            type="file"
            style={{ display: "none" }}
            ref={songInputRef}
            accept=".mp3"
            onChange={(e) => {
              setSongFile(e.target.files![0]);
              setSongFileName(e.target.files![0].name);
            }}
          />
          <label htmlFor="uploadSong">Upload image for the song (.MP3)</label>
          <button
            type="button"
            name="uploadSong"
            onClick={() => {
              if (songInputRef && songInputRef.current) {
                // @ts-ignore
                songInputRef.current.click();
              }
            }}
          >
            Upload
          </button>
          <p>{songFileName}</p>
          <button onClick={(e) => formSubmit(e)}>Submit</button>
          {renderProgress()}
          {renderMessage()}
        </form>
      </section>
    </div>
  );
};
