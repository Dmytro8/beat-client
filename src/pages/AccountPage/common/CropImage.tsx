import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";

import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/canvasUtils";

type CropImagePropsType = {
  imageSrc: any;
  targetRef: any;
  setTargetFile: (e: any) => void;
  setImageSrc: (e: any) => void;
  setCroppedImage: (e: any) => void;
};

const CropperContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  background: black;
  margin: 10px 0;
  .reactEasyCrop_CropArea::before,
  .reactEasyCrop_CropArea::after {
    border: none;
  }
`;

const CropDialogContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
  justify-content: center;
`;

type ButtonPropsType = {
  functionality: string;
};

const Button = styled.button`
  border: 1px solid
    ${(props: ButtonPropsType) => {
      if (props.functionality === "decline") return "#ed4337";
      else if (props.functionality === "accept") return "#2bbf93";
      else return "#fff";
    }};
  color: ${(props: ButtonPropsType) => {
    if (props.functionality === "decline") return "#ed4337";
    else if (props.functionality === "accept") return "#2bbf93";
    else return "#fff";
  }};
  background-color: transparent;
`;

export const CropImage: FC<CropImagePropsType> = ({
  imageSrc,
  targetRef,
  setTargetFile,
  setImageSrc,
  setCroppedImage,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const croppeImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(URL.createObjectURL(croppedImage));
      let file = new File([croppedImage], "image", {
        lastModified: new Date().getTime(),
        type: `${croppedImage.type}`,
      });
      setTargetFile(file);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const closeCropDialog = () => {
    // @ts-ignore
    targetRef.current.value = "";
    setImageSrc(null);
  };

  return (
    <>
      {imageSrc ? (
        <>
          <CropperContainer>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </CropperContainer>
          <CropDialogContainer>
            <Button
              functionality="decline"
              onClick={(e) => {
                e.preventDefault();
                closeCropDialog();
              }}
            >
              Decline
            </Button>
            <Button
              functionality="accept"
              onClick={(e) => {
                e.preventDefault();
                closeCropDialog();
                croppeImage();
              }}
            >
              Accept
            </Button>
          </CropDialogContainer>
        </>
      ) : null}
    </>
  );
};
