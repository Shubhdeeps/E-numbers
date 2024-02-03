import "react-image-crop/dist/ReactCrop.css";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { useNavigate } from "react-router-dom";
import { canvasPreview } from "../services/imageFunctions/canvasPreview";
import Button from "../components/Buttons/Button";
import AdditivesIndicator from "../components/Indicators/AdditivesIndicator";
import { leftRotateSVG, rightRotateSVG } from "../assets/icons/RotateIcon";

export default function ImageScannedPage() {
  //   const [active, setActive] = useState(false);
  const [imageSrc, setSrc] = useState<string | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [crop, setCrop] = useState<Crop>();
  const [rotation, setRotations] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const imageFromStorage = localStorage.getItem("e-number-image-scanned");
    // localStorage.removeItem("e-number-image-scanned");
    if (imageFromStorage) {
      setSrc(imageFromStorage);
    } else {
      //   navigate("/");
    }
  }, [navigate]);

  function handleCropChange(cropped: PixelCrop) {
    setCrop(cropped);
  }

  async function handleCropImageButton() {
    const previewCanvas = previewCanvasRef.current;
    if (!imgRef.current || !completedCrop || !previewCanvas) {
      return;
    }

    const image = imgRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    const imageData = ctx.getImageData(
      0,
      0,
      previewCanvas.width,
      previewCanvas.height
    );
    const data = imageData.data;
    // console.log(data);
    const contrast = 2;
    for (let i = 0; i < data.length; i += 4) {
      const pixelR = data[i];
      const pixelG = data[i + 1];
      const pixelB = data[i + 2];

      const newR = Math.min(Math.max(0, pixelR * contrast), 255);
      const newG = Math.min(Math.max(0, pixelG * contrast), 255);
      const newB = Math.min(Math.max(0, pixelB * contrast), 255);

      data[i] = newR;
      data[i + 1] = newG;
      data[i + 2] = newB;
    }

    const newImageData = new ImageData(imageData.width, imageData.height);
    newImageData.data.set(data);
    ctx.putImageData(newImageData, 0, 0);

    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    const blobURL = URL.createObjectURL(blob);

    uploadImageToLocalStorageAndNavigate(blobURL);
  }

  function uploadImageToLocalStorageAndNavigate(_imageURL: string) {
    localStorage.setItem("e-number-image-save", _imageURL);
    navigate("/item-scanned");
  }

  async function cropOnComplete(imageCrop: PixelCrop) {
    setCompletedCrop(imageCrop);
    if (!imageSrc || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    await canvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      imageCrop,
      1,
      rotation
    );
  }

  function handleRotate(val: number) {
    setRotations((prev) => prev + val);
  }

  return (
    <>
      <div className="flex flex-col gap-1 relative px-3">
        <div className="relative">
          <AdditivesIndicator title1={"Scanned"} backButton />
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="font-semibold mb-1">
          Please crop and rotate the Ingredients
        </div>
        <div>
          {imageSrc && (
            <div>
              <ReactCrop
                crop={crop}
                onComplete={cropOnComplete}
                onChange={(e) => handleCropChange(e)}
              >
                <img
                  style={{ transform: `rotate(${rotation}deg)` }}
                  src={imageSrc}
                  ref={imgRef}
                />
              </ReactCrop>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span>
            <Button onClick={() => handleRotate(-1)} round>
              {leftRotateSVG}
            </Button>{" "}
            <Button onClick={() => handleRotate(1)} round>
              {rightRotateSVG}
            </Button>
          </span>
          <Button onClick={handleCropImageButton}>Done</Button>
        </div>

        <br />
        <br />
        <br />
        {completedCrop && (
          <canvas
            className="absolute hidden"
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </>
  );
}
