import * as React from 'react';
import { Helmet } from "react-helmet-async";


interface propsHook {
    title: String
}


export default function useTitle ({ title } : propsHook) {
  const jsx = (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
  return jsx;
}