import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/userService.js'
import './LandingView.scss';

export function LandingView() {

	const [users, setUsers] = useState();

	useEffect(()=>{
		setUsers(getUsers);
	},[getUsers]);

  return (
    <React.Fragment>
      <div className="landing-view">
				<h1>List of Users</h1>
        {users&&users.map(user=>
					<p key={user.id} >{`${user.firstname} ${user.lastname}`}</p>
				)}
      </div>
    </React.Fragment>
  )

}