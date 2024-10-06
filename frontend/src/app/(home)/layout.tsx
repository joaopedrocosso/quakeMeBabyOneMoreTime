import React from 'react'

const homeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default homeLayout