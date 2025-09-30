import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow bg-gray-50">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout