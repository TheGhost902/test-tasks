import React from 'react'

import './NewEmployeeForm.scss'

export function NewEmployeeForm({ submit }) {
    const [name, setName] = React.useState('')

    function formSubmit(e) {
        e.preventDefault()

        const names = name.split(' ')

        if (name.trim()) {
            submit({
                first_name: names[0],
                last_name: names[1] || ''
            })
        }

        setName('')
    }

    return (
        <div className="new-employee-form">
            <form onSubmit={formSubmit}>
                <h3>Добавить Нового сотрудника</h3>
                <p>Введите Имя и Фамилию:</p>

                <input type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <button type="submit">Добавить</button>
            </form>
        </div>
    )
}