import React, { useEffect, useState, forwardRef } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
import Fuse from 'fuse.js'

import './dropdown-item.css'

interface DropdownItemProps {
    title: string
    isOpen: boolean
    onClick: () => void
}

const favoritesMockData = ['PLY', 'MAGE']

const Index = forwardRef<HTMLLIElement, DropdownItemProps>(({ title, isOpen, onClick }, ref) => {
    const [namesData, setNamesData] = useState<string[]>()
    const [fuse, setFuse] = useState<Fuse<string> | null>(null)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<string[] | undefined>(undefined)

    const [settings, setSettings] = useState<'favorites' | 'all'>('all')

    const getNames = async () => {
        try {
            const response = await fetch('https://api-eu.okotoki.com/coins')
            const data: string[] = await response.json()
            const fuseInstance = new Fuse(data, {})
            setFuse(fuseInstance)
            setNamesData(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
        setQuery(query)

        if (query.length > 0 && fuse) {
            const result = fuse.search(query)
            setResults(result.map(({ item }) => item))
        } else {
            setResults(undefined)
        }
    }

    useEffect(() => {
        getNames()
    }, [])

    return (
        <li className={`navigation__item ${isOpen ? 'active' : ''}`} ref={ref}>
            <button className="navigation__item__button" onClick={onClick}>
                {' '}
                <IoIosSearch /> {title}
            </button>
            <div className="navigation__item__content">
                <div className="dropdown__search">
                    <IoIosSearch />
                    <input
                        className="dropdown__input"
                        placeholder="Search..."
                        value={query}
                        onChange={handleSearch}
                    ></input>
                </div>
                <div className="dropdown__buttons">
                    <button
                        onClick={() => setSettings('favorites')}
                        className={`dropdown__button ${settings === 'favorites' ? 'active' : ''}`}
                    >
                        <FaStar /> FAVORITES
                    </button>
                    <button
                        onClick={() => setSettings('all')}
                        className={`dropdown__button ${settings === 'all' ? 'active' : ''}`}
                    >
                        ALL COINS
                    </button>
                </div>
                <div className="dropdown__content">
                    {settings === 'all' && (
                        <>
                            {results ? (
                                <>
                                    {results.map((item: string, index: number) => (
                                        <a href="#!" className="dropdown__item" key={index}>
                                            <FaRegStar/>
                                            {item}
                                        </a>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {namesData?.map((item: string, index: number) => (
                                        <a href="#!" className="dropdown__item" key={index}>
                                            <FaRegStar/>
                                            {item}
                                        </a>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                    {settings === 'favorites' && (
                        <>
                            {favoritesMockData?.map((item: string, index: number) => (
                                <a href="#!" className="dropdown__item" key={index}>
                                    <FaRegStar/>
                                    {item}
                                </a>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </li>
    )
})

export default Index
