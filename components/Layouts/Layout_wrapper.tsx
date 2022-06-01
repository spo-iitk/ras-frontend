import React from 'react'
import Blank from './Blank'
import Layout from './Layout'
import StudentDashBoard from './StudentDashBoard'
import CompanyDashBoard from './CompanyDashBoard'
import CompanyPhaseDashboard from './CompanyPhaseDashboard'
import StudentPhaseDashboard from './StudentPhaseDashboard'
import AdminDashBoard from './AdminDashBoard'
const layouts:any = {
    'Navigation': Layout,
    'studentDashboard': StudentDashBoard,
    'none': Blank,
    'companyDashboard': CompanyDashBoard,
    'companyPhaseDashboard': CompanyPhaseDashboard,
    'studentPhaseDashboard': StudentPhaseDashboard,
    'adminDashBoard': AdminDashBoard,
}
const Layout_wrapper = ({ children }: { children: any }) => {
    let layoutType:string=children.type.layout
    if(layoutType==undefined){
        layoutType='none'
    }
    const Layout = layouts[layoutType]
    return (
             <Layout>{children}</Layout>
    )
}

export default Layout_wrapper
