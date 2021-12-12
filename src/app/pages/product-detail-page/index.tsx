import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function ProductDetailPage() {
  return (
    <>
      <Helmet>
        <title>Truy xuất nguồn gốc thực phẩm</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      <span>product detail page</span>
    </>
  );
}
