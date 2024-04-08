import React from 'react'


const PageHeading= ({children}: {
    children: any;
}) => {
  return (
    <section className="mb-10 flex justify-end">{children}</section>
  )
}

export default PageHeading