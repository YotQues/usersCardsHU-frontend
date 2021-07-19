import React from 'react';
import PageHeader from './common/pageHeader';

function Page404(props) {
  return (
    <div>
      <PageHeader title="Page not found , 404!" />
      <PageHeader title="Woops! Seems like you are looking for a page that doesn't exist..." />
    </div>
  )
}

export default Page404