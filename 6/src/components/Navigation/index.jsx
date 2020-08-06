import React from 'react'

import './Navigation.scss'

export function Nav({ links = [], setLink }) {
    // catching change history
    React.useEffect(() => {
        function popstateHandler(e) {
            const { path } = e.state
            setLink(path)
        }

        window.addEventListener('popstate', popstateHandler)

        return () => window.removeEventListener('popstate', popstateHandler)
    }, [setLink])

    // change history and displayed component
    function linkHandler(e) {
        e.preventDefault()
        const path = e.target.pathname

        setLink(path)
        window.history.pushState({path}, '', path)
    }

    return (
        <div className="nav">
            <nav>
                <ul className="nav__list">
                    {links.map(link => 
                        <li className="nav__item" key={link.path}>
                            <a
                                href={link.path}
                                onClick={linkHandler}
                            >
                                {link.name}
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export function Switch({ cases, activeLink }) {
    const Case = cases.find(Case => Case.link === activeLink)

    return Case && Case.component
        ? Case.component 
        : <h1>Not found</h1>
}