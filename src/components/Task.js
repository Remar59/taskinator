import React from 'react'


const Task = ({ name, action }) => {
    return (
        <li><input type="checkbox" /><input type="text" value={name} onChange={action} /><input type="button" value="Supprimer" onClick={action} /></li>
    )
}

export default Task
