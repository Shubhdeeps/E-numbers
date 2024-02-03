import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { useEffect } from "react";
import { uploadDataToDB } from "./services/database/Additives";

// import translations from "./assets/translations.json";
// import all from "./assets/rawDataV2.json";
export default function App() {
  // https://github.com/dexie/Dexie.js
  useEffect(() => {
    uploadDataToDB();
    // test();
  }, []);

  return <RouterProvider router={router} />;
}
