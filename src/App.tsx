import './App.css'
import { useState, useEffect } from 'react'
import SearchInput from './components/SearchInput'
import UserInfo from './components/UserInfo'
import RepositoryCard from './components/RepositoryCard'

export default function App() {
  const [userInfo, setUserInfo] = useState<InfoUserFiltered | null>(null);
  const [userRepository, setUserRepository] = useState<RepositoryUserFiltered[] | null>(null);
  const [isAllRepositories, setIsAllRepositories] = useState<boolean>(false);
  const [userText, setUserText] = useState<string>('');

  interface InfoUserFiltered {
    avatar_url: string;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    location: string;
    public_repos: number;
  }

  interface LicenseInfo {
    key: string;
    name: string;
    spdx_id: string;
  }

  interface RepositoryUserFiltered {
    name: string;
    description: string | null;
    forks: number;
    stargazers_count: number;
    updated_at: string;
    html_url: string;
    license: LicenseInfo | null;
  }

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedUserRepository = localStorage.getItem('userRepository');

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    if (storedUserRepository) {
      setUserRepository(JSON.parse(storedUserRepository));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    if (userRepository) {
      localStorage.setItem('userRepository', JSON.stringify(userRepository));
    }
  }, [userInfo, userRepository]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`https://api.github.com/users/${userText === '' ? 'github' : userText}`);
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      const data = await response.json();
      const filteredData: InfoUserFiltered = {
        avatar_url: data.avatar_url,
        name: data.name,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        location: data.location,
        public_repos: data.public_repos,
      };
      setUserInfo(filteredData)
    }

    const fetchUserRepository = async () => {
      const response = await fetch(`https://api.github.com/users/${userText === '' ? 'github' : userText}/repos`);
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      const repositories = await response.json();
      const filteredData: Array<RepositoryUserFiltered> = repositories.map((repository: RepositoryUserFiltered) => ({
        name: repository.name,
        description: repository.description,
        forks: repository.forks,
        stargazers_count: repository.stargazers_count,
        updated_at: repository.updated_at,
        html_url: repository.html_url,
        license: repository.license ? {
          key: repository.license?.key,
          name: repository.license?.name,
          spdx_id: repository.license?.spdx_id,
        } : null
      }));
      setUserRepository(filteredData);
    }

    fetchUserInfo();
    fetchUserRepository();
  }, [userText]);

  const renderAllRepositories = (userRepository: RepositoryUserFiltered[]) => {
    if (isAllRepositories === false) {
      return userRepository.slice(0, 4)
    } else {
      return userRepository
    }
  }

  return (
    <>
      <div className='bg-img-cont'>
        <img className='bg-img' src="hero-image-github-profile.png" alt="" />
        <SearchInput
          setUserText={setUserText}
        />
      </div>
      <div className='github-page'>
        {userInfo ? (
          <UserInfo userInfo={userInfo} />
        ) : (
          <p>Loading...</p>
        )}
        <div className='repository-list'>
          {userRepository ? (
            <RepositoryCard
              userRepository={userRepository}
              renderAllRepositories={renderAllRepositories} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {isAllRepositories === false ? (
          <button className='all-repositories-btn' onClick={() => setIsAllRepositories(true)}>View all repositories</button>
        ) : (
          null
        )}
      </div>
    </>
  )
}
