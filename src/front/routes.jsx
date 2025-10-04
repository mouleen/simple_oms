// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound.jsx";
import OrderIndex from "./components/OrderIndex.jsx";
import UserIndex from "./components/UserIndex.jsx";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<OrderIndex />} />
      <Route path="/users" element={<UserIndex />} />
      <Route path="/home" element={<OrderIndex />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  )
);