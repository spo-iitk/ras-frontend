import React from 'react'
import Blank from './Blank'
import Layout from './Layout'
import StudentDashBoard from './Student/StudentDashBoard'
import CompanyDashBoard from './Company/CompanyDashBoard'
import CompanyPhaseDashboard from './Company/CompanyPhaseDashboard'
import StudentPhaseDashboard from './Student/StudentPhaseDashboard'
import AdminDashBoard from './Admin/AdminDashBoard'
import AdminPhaseDashBoard from './Admin/AdminPhaseDashBoard'

const layouts:any = {
    'Navigation': Layout,
    'studentDashboard': StudentDashBoard,
    'none': Blank,
    'companyDashboard': CompanyDashBoard,
    'companyPhaseDashboard': CompanyPhaseDashboard,
    'studentPhaseDashboard': StudentPhaseDashboard,
    'adminDashBoard': AdminDashBoard,
    'adminPhaseDashBoard': AdminPhaseDashBoard,
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
