import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <footer className='bg-indigo-800'>
            <div className='flex justify-between px-8 py-4 text-white'>
                <div>
                    gooddealz.contact@gmail.com
                </div>
                <div>
                    <Link to="/CGU">Conditions Générals d'Utilisation</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer