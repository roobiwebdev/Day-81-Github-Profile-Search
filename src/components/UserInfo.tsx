import '../styles/UserInfo.css'

interface InfoUserFiltered {
	avatar_url: string;
	name: string | null;
	bio: string | null;
	followers: number;
	following: number;
	location: string;
	public_repos: number;
}

interface InfoUserProps {
	userInfo: InfoUserFiltered;
}

export default function UserInfo({ userInfo }: InfoUserProps) {
	return (
		<div className='user-info-cont'>
			<div className='user-info-wrapper'>
				<div className='user-icon-cont'>
					<img className='user-icon' src={userInfo.avatar_url} alt="User icon" />
				</div>
				<ul className='info-list'>
					<li className='info-item'><span>Followers</span>{userInfo.followers}</li>
					<li className='info-item'><span>Following</span>{userInfo.following}</li>
					<li className='info-item'><span>Location</span>{userInfo.location !== null ? userInfo.location : 'Location unknown'}</li>
				</ul>
			</div>
			<div className='info-title-cont'>
				<h1 className='info-name'>{userInfo.name !== null ? userInfo.name : 'Username is missing'}</h1>
				<p className='info-description'>{userInfo.bio !== null ? userInfo.bio : 'User description missing'}</p>
			</div>
		</div>

	)
}