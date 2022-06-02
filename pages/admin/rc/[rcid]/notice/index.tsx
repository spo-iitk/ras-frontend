import { useRouter } from 'next/router';
import React from 'react'
import Meta from '../../../../../components/Meta';

function Index() {
  return (
    <div className="container">
      <Meta title="Notices - Admin"/>
      <h1>Notices</h1>
    </div>
  )
}

Index.layout="adminPhaseDashBoard";
export default Index
