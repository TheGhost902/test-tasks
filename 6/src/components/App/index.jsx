import React from 'react'

import { Nav, Switch } from '../Navigation'
import { MainPage } from '../MainPage'
import { EmployeesPage } from '../EmployeesPage'

export function App() {
    const [activeLink, setActiveLink] = React.useState(window.location.pathname)

    return (
        <div className="app">
            <Nav
                links={[
                    {name: 'Главная', path: '/'},
                    {name: 'Сотрудники', path: '/employees'}
                ]}

                setLink={setActiveLink}
            />

            <Switch
                cases={[
                    {link: '/', component: <MainPage/>},
                    {link: '/employees', component: <EmployeesPage/>}
                ]}

                activeLink={activeLink}
            />
        </div>
    )
}