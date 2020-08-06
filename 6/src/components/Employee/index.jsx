import React from 'react'

import './Employee.scss'

export function Employee({ data, deleteFn }) {
    function buttonHandler() {
        deleteFn(data.id)
    }

    return (
        <li className="employee">
            <span>{data.first_name} {data.last_name}</span>
            <button onClick={buttonHandler}>delete</button>
        </li>
    )
}