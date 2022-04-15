import React from 'react'
import Layout from './Layout'
import StudentDashBoard from './StudentDashBoard'

const layouts = {
    'Navigation': Layout,
    'dashboard': StudentDashBoard,
}
const Layout_wrapper = ({ children }: { children: any }) => {
    let layoutType:string=children.type.layout
    if(layoutType==undefined){
        layoutType='dashboard'
    }
    const Layout = layouts[layoutType as keyof ObjectType]
    return (
             <Layout>{children}</Layout>
    )
}

export default Layout_wrapper
