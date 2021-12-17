import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/home-page/Loadable';
import { NotFoundPage } from './components/not-found-page/Loadable';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from './layouts/default-layout';
import { ProductDetailPage } from './pages/product-detail-page/Loadable';
import { FarmerPage } from './pages/farmer-page/Loadable';
import { AgencyPage } from './pages/agency-page/Loadable';
import { RegisterPage } from './pages/register-page/Loadable';

// InfoPage
export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path={process.env.PUBLIC_URL + '/'} element={<HomePage />} />
          <Route
            path={process.env.PUBLIC_URL + '/product/:id'}
            element={<ProductDetailPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + '/farmer'}
            element={<FarmerPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + '/agency'}
            element={<AgencyPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + '/register'}
            element={<RegisterPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
