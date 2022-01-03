import React from 'react';

const Follower = ({ html_url, login, avatar_url }) => {
	return (
		<article className='card'>
			<img src={avatar_url} alt={login} />
			<h4>{login}</h4>
			<a href={html_url} className='btn'>
				View Profile
			</a>
		</article>
	);
};

export default Follower;
