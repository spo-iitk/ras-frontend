import React from 'react'
import Head from 'next/head'
const Meta = ({title, description, keywords}:{title:any, description: any, keywords:any}) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
    </div>  
  )
}

Meta.defaultProps = {
    title: 'Recruitment Automation System',
    description: '',
    keywords: 'automation, recuitment, systrem',
}

export default Meta
