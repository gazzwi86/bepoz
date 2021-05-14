import * as React from 'react'
import CheckoutProvider from '../utils/checkoutContextProvider';

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => (
  <>
    <CheckoutProvider>
      <Component {...pageProps} />
    </CheckoutProvider>
  </>
)

export default MyApp