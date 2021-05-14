import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

interface LayoutProps {
  children?: ReactNode
  title?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        <Link href="/checkout">
          <a>Checkout</a>
        </Link>
      </nav>
    </header>
    
    {children}

    <footer>
      <hr />
      <span>Copyright &copy; {(new Date()).getFullYear()}</span>
    </footer>
  </div>
)
