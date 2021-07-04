//import react & hook
import React, { useState, useEffect } from 'react';
//import style
import './header.css';
//import images
import bars from '../../img/bars.svg';
import search from '../../img/search.svg';

const Header = () => {

    //handel hide and show header when scroll
    const [show, setshow] = useState("nav--header")
    const controlnavbar = () => {
        if (window.scrollY > 100) {
            setshow("nav--header2")
        } else {
            setshow("nav--header")
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlnavbar)
        return () => {
            window.removeEventListener('scroll', controlnavbar)
        }
    }, [])

    return (
        <>
            <nav className={show}>
                <nav className='nav--items'>
                    <img src={bars} />
                    <img src={search} />
                </nav>
            </nav>
        </>
    )
}

export default Header