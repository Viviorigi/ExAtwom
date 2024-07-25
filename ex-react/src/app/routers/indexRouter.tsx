import Layout from "../comp/Layout";
import Category from "../pages/Category/Category";
import Home from "../pages/Home";
import Product from "../pages/Product/Product";


export const indexRouter: any = {
    path: '',
    element: (
        <Layout />
    ),
    children: [
        { path: 'dashboard', element: <Home /> },
        { path: 'category', element: <Category /> },
        // { path: '/contact/:username', element: <RouterContact /> },
        { path: 'product', element: <Product /> },
    ],
  };