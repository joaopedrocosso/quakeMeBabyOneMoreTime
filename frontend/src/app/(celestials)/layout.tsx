import { BottomNavBar } from '@/components/BottomNavBar';
import React from 'react'

const homeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
  return (
    <div>
        {children}
        <BottomNavBar />
    </div>
  )
}

export default homeLayout