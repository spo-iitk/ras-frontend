import React, { useEffect } from 'react'
import {Stack } from '@mui/material'
import Meta from '../../../../components/Meta'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import ActiveButton from '../../../../components/Buttons/ActiveButton';
import InactiveButton from '../../../../components/Buttons/InactiveButton';
import { useRouter } from 'next/router';

function Index() {
  const router=useRouter();
  useEffect(()=>{
    router.push("createopening/step1")
  },[router])
  return (
    <div/>
  )
}

Index.layout = 'companyPhaseDashboard'
export default Index
