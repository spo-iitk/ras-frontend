import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Meta from "./Meta"

const Layout = ({children}:{children:any}) => {
  return (
    <div>
      <Meta/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout
