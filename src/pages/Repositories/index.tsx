import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { EmptyRepos } from './components/EmptyRepos';
import { RepositoryCard } from './components/RepositoryCard';
import { Repository } from './types';

export function Repositories() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>(repos);
  const [isFetching, setIsFetching] = useState(true);

  const hasRepos = filteredRepos.length > 0;
  const isLoadingRepos = !hasRepos && isFetching;
  const isEmptyRepos = !hasRepos && !isFetching;

  useEffect(() => {
    setIsFetching(true);

    api
      .get('/users/pierrebosch/repos')
      .then(({ data: githubRepos }: AxiosResponse<Repository[]>) => {
        setRepos(githubRepos);
        setFilteredRepos(githubRepos);
      })
      .finally(() => setIsFetching(false));
  }, []);

  if (isLoadingRepos) {
    return <h1>Carregando repositórios...</h1>;
  }

  const handleSearchRepository = (event: any) => {
    const searchedRepositoryName = event.target.value.toLowerCase();
    const isEmptyRepositoryName = searchedRepositoryName === '';

    if (isEmptyRepositoryName) {
      setFilteredRepos(repos);
      return;
    }

    const repositoriesFound = repos.filter((currentRepository) => {
      const currentRepositoryName = currentRepository.name.toLowerCase();

      return currentRepositoryName.includes(searchedRepositoryName);
    });

    setFilteredRepos(repositoriesFound);
  };

  return (
    <div className="flex flex-col w-full max-w-3xl divide-y divide-zinc-800">
      <input
        type="text"
        onChange={handleSearchRepository}
        placeholder="Find a repository"
        className="bg-github border-2 border-zinc-700 py-2 px-5 rounded-md mb-6 focus:border-blue-400 focus:outline-none text-gray-400"
      />

      {isEmptyRepos && <EmptyRepos />}

      {filteredRepos.map((repo) => (
        <RepositoryCard repository={repo} key={repo.id} />
      ))}
    </div>
  );
}
