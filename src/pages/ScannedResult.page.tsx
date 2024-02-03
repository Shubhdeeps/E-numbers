import { useEffect, useState } from "react";
import ScannerResultUI from "../components/ScannedResultUi";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
export default function ScannedResultPage() {
  // const [isSaved, setIsSaved] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const _imageURL = localStorage.getItem("e-number-image-save");
    if (_imageURL) {
      setImageURL(_imageURL);
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ScannerResultUI
        variant="image"
        imageURL={imageURL}
        titleText="Scanned"
      />
    </>
  );
}
