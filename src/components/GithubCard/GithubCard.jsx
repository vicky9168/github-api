import React,{ useState } from 'react'

const GithubCard = () => {
    const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const search = await fetch(`https://api.github.com/users/${username}`);
    const data = await search.json();
    setUserData(data);
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="sr-only">
          Enter your GitHub username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your GitHub username"
          className="block border-b-2 w-full px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="my-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-4 py-2 text-white font-medium rounded-md"
        >
          Search
        </button>
      </form>
      {userData && (
        <div className="px-4 py-3 ">
          <img src={userData.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full mx-auto" />
          <h2 className="mt-4 text-lg font-semibold text-gray-800">{userData.login}</h2>
          {userData.name && <p className="mt-1 text-sm text-gray-600">{userData.name}</p>}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-700">Public Repos: {userData.public_repos}</p>
            <p className="text-gray-700">Public Gists: {userData.public_gists}</p>
            <p className="text-gray-700">Created at: {new Date(userData.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default GithubCard