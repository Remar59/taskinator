import React from 'react'
import "../App.scss";


const Task = ({ name, checked, action, deleteAction }) => {
    const taskChecked = checked ? 'strike' : '';

    return (
        <li>
            <input type="checkbox" checked={checked} onChange={action} />
            <p minlength='4' className={taskChecked}>{name}</p>
            <input id='delete' type="button" value="Supprimer la tâche" onClick={deleteAction} />
        </li>
    );
};

export default Task
