import React, { useEffect, useRef, useState } from 'react'
import DropdownItem from '../atoms/DropdownItem'

import './header.css'

const navItems = [{ title: 'COINS' }]

const Index = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const dropdownRefs = useRef<(HTMLLIElement | null)[]>([])

    const handleDropdownClick = (index: number) => {
        setOpenIndex(index === openIndex ? null : index)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRefs.current.some(ref => ref && ref.contains(event.target as Node))) {
            return
        }
        setOpenIndex(null)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="header">
            <a className="logo">LOGO</a>
            <nav>
                <ul className="navigation">
                    {navItems.map((navItem, index) => (
                        <DropdownItem
                            key={index}
                            title={navItem.title}
                            isOpen={openIndex === index}
                            onClick={() => handleDropdownClick(index)}
                            ref={el => (dropdownRefs.current[index] = el)}
                        />
                    ))}
                </ul>
                <button className='navigation__item__button'>Log in</button>
                <button className='navigation__item__button'>Sign in</button>
            </nav>
        </div>
    )
}

export default Index
