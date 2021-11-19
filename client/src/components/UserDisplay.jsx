import React from "react";

const UserDisplay = (props) => {

    return(
        <div className="userDisplay">
            <h3>Current Agents in chat:</h3>
            <ul className="userList">
                {
                    props.users.map((user, i) => {
                        return <li key={i}>Agent: {user.user} | Agent ID: {user.id}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default UserDisplay;
