import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.page";
import Layout from "./components/layout/Layout";
import SingleAdditive from "./pages/SingleAdditive.page";
import ListPage from "./pages/List.page";
import ScannedResultPage from "./pages/ScannedResult.page";
import CategoryPage from "./pages/Category.page";
import SavedProductsPage from "./pages/SavedProductsList.page";
import ItemFromSavedDBPage from "./pages/SavedResult.page";
import ImageScannedPage from "./pages/ImageScanned.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>404 Error</h1>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/saved-items",
        element: <SavedProductsPage />,
      },
      {
        path: "/saved-items/:productId",
        element: <ItemFromSavedDBPage />,
      },
      {
        path: "/list-view",
        element: <ListPage />,
      },
      {
        path: "/additive/:additiveId",
        element: <SingleAdditive />,
      },
      {
        path: "/item-scanned",
        element: <ScannedResultPage />,
      },
      {
        path: "/category/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "/image-scanned",
        element: <ImageScannedPage />,
      },
    ],
  },
]);
