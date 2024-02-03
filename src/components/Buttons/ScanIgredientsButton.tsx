// Also add re-scan function

import { useRef } from "react";
import { ScanIconSVG } from "../../assets/icons/ScanIcon";

import { useNavigate } from "react-router-dom";
type IProps = {
  action: "SCAN INGREDIENTS" | "RE-SCAN";
};
export default function ScanIgredientsButton({ action }: IProps) {
  // const [active, setActive] = useState(false);
  // const [image, setImage] = useState<string | null>(null);
  // const [imageText, setImageText] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  function handleUploadImage(file: File) {
    const imageURL = URL.createObjectURL(file);
    if (imageURL) {
      localStorage.setItem("e-number-image-scanned", imageURL);

      navigate("/image-scanned");
      // setImage(imageURL);
      //   setActive(false);
    }
  }
  function handleScannerButtonClick() {
    inputFileRef.current?.click();
  }
  return (
    <>
      <div
        onClick={handleScannerButtonClick}
        className={`bg-fg w-full h-[86px]  cursor-pointer rounded-3xl flex justify-center items-center gap-3`}
      >
        {ScanIconSVG}
        <span>{action}</span>
      </div>

      <div className={`absolute w-full h-full top-0 left-0 bg-fg hidden`}>
        <input
          ref={inputFileRef}
          className="scanner_camera"
          onChange={(e) => {
            const fileList = e.target.files;
            if (fileList) {
              const imageFile = fileList[0];
              handleUploadImage(imageFile);
            }
          }}
          type="file"
          name="scanner"
          accept="image/*"
          capture="environment"
        />
      </div>
    </>
  );
}
