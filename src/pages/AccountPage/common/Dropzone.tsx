import React, { FC, useState, useRef, useEffect } from "react";

import styled from "styled-components";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloseIcon from "@material-ui/icons/Close";
import { ErrorMessage } from "../../../components/Forms/UploadSongForm/UploadSongForm";

type DropSectionType = {
  isDragOver: boolean;
};

const DropSection = styled.fieldset`
  border: 1px dashed #fff;
  transition: all 0.2s ease-in-out;
  margin-top: 10px;
  /* Active style */
  background-color: ${(props: DropSectionType) =>
    props.isDragOver ? "#2bbf9388" : "unset"};
  filter: ${(props: DropSectionType) =>
    props.isDragOver ? "drop-shadow(0px 0px 10px #2bbf9388)" : "unset"};
  legend {
    margin-left: 13px;
  }
`;

const DropBoard = styled.div`
  color: white;
  display: grid;
  justify-items: center;
  height: 180px;
  align-content: space-evenly;
  pointer-events: none;
`;

const DropButton = styled.button`
  border: 1px solid
    ${(props: DropSectionType) => (props.isDragOver ? "white" : "#0883fc")};
  background-color: transparent;
  color: ${(props: DropSectionType) =>
    props.isDragOver ? "white" : "#0883fc"};
  transition: all 0.1s ease-in-out;
  outline: none;
  pointer-events: all;
  &:active {
    transform: scale(1.02);
  }
`;

const DropFile = styled.p`
  margin-bottom: 10px;
  color: darkorange;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
`;

type DropzoneProps = {
  id: string;
  legend: string;
  accept: string;
  targetRef: any;
  required: boolean;
  generalError: string | null;
  setDurationFromFile?: (e: any) => void;
  setTargetFile: (e: any) => void;
  setImageSrc?: (e: any) => void;
  imageSrc?: string | null;
};

export const Dropzone: FC<DropzoneProps> = ({
  id,
  legend,
  accept,
  setDurationFromFile,
  targetRef,
  setTargetFile,
  setImageSrc,
  imageSrc,
  generalError,
  required = false,
}) => {
  let maxImageSize = 2e6;

  const [isDragOver, setIsDragOver] = useState(false);
  const [targetDropId, setTargetDropId] = useState("");

  const [targetFileName, setTargetFileName] = useState("");

  const [targetFileType, setTargetFileType] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dragOver = (isDragOver: boolean, event: any) => {
    isDragOver ? setTargetDropId(event.target.id) : setTargetDropId("");
    setIsDragOver(isDragOver);
  };

  const validateFile = (file: any) => {
    let fileSize = file.size;
    let fileType = file.type.slice(0, 5);
    if (accept === "image" && fileType !== "image") {
      setError(`Incorrect file format. Please, upload an image`);
      return true;
    } else if (accept === "audio" && fileType !== "audio") {
      setError(`Incorrect file format. Please, upload an audio`);
      return true;
    } else if (fileType === "image" && fileSize > maxImageSize) {
      setError(`Maximum upload file size 2Mb`);
      return true;
    } else return false;
  };

  const handleFile = async (files: any) => {
    setError(null);
    setTargetFileName("");

    if (files && files.length > 0) {
      let file = files![0];
      let isError = validateFile(file);
      setTargetFileType(file.type.slice(0, 5));
      let fileType = file.type.slice(0, 5);
      if (!isError) {
        if (fileType === "audio") {
          // @ts-ignore
          setDurationFromFile(file);
        } else if (fileType === "image") {
          let imageDataUrl = await readFile(file);
          // @ts-ignore
          setImageSrc(imageDataUrl);
        }
        setTargetFile(file);
        setTargetFileName(file.name);
      }
    }
  };

  const renderError = () => {
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    } else if (generalError && required && targetFileName.length === 0) {
      setError(generalError);
      return <ErrorMessage>{error}</ErrorMessage>;
    } else return null;
  };

  return (
    <>
      <DropSection
        id={id}
        isDragOver={targetDropId === id}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dragOver(false, e);
          handleFile(e.dataTransfer.files);
          e.dataTransfer.clearData();
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          dragOver(true, e);
        }}
        onDragLeave={(e) => dragOver(false, e)}
      >
        <legend>{legend}</legend>
        <input
          type="file"
          style={{ display: "none" }}
          accept={`${accept}/*`}
          ref={targetRef}
          onChange={(e) => {
            handleFile(e.target.files);
          }}
        />
        <DropBoard>
          <CloudUploadIcon />
          <h1>Drag&#38;Drop file here</h1>
          <p>or</p>
          <DropButton
            type="button"
            isDragOver={targetDropId === id}
            onClick={() => {
              if (targetRef && targetRef.current) {
                // @ts-ignore
                targetRef.current.click();
              }
            }}
          >
            Browse file
          </DropButton>
        </DropBoard>
      </DropSection>
      {renderError()}
      {targetFileName.length !== 0 && targetFileType !== "image" ? (
        <DropFile>
          {targetFileName}
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              // @ts-ignore
              targetRef.current.value = "";
              setTargetFile("");
              setTargetFileName("");
            }}
          />
        </DropFile>
      ) : null}
    </>
  );
};

function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
