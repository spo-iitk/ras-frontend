import React from 'react'
import Footer from '@components/Footer'
import Header from '@components/Header'
import Meta from "@components/Meta"

const Layout = ({children}:{children:any}) => {
  return (
    <div>
      <Meta/>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout
