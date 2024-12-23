import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Catalog from './components/catalog/catalog'
import Home from './components/home/home'
import StoreLink from './components/storeLink/storeLink.tsx';
import Blog from './components/blog/blog.tsx';
import Category from './components/category/category.tsx';
import CategoryProduct from './components/categoryProduct/categoryProduct.tsx';
import Info from './components/info/info.tsx';
import Admin from './components/admin/admin.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/catalog',
        element: <Catalog/>,
        children: [
          {
            path: '/catalog',
            element: <Blog/>,
          },
          {
            path: '/catalog/:id',
            element: <StoreLink/>,
          },
          {
            path: '/catalog/category/:id',
            element: <CategoryProduct/>
          }
        ]
      },
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/category',
        element: <Category/>,
      },
      {
        path: '/info',
        element: <Info/>,
      },
  ]},
  {
    path:"/admin",
    element: <Admin/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
