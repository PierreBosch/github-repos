import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { AxiosResponse } from 'axios';
import { Repository } from '../pages/Repositories/types';

type RepositoryContextType = {
  hasRepos: boolean;
  isLoadingRepos: boolean;
  isEmptyRepos: boolean;
  filteredRepos: Repository[];
  getRepositories: () => void;
  handleSearchRepository: (searchRepositoryName: string) => void;
};

export const RepositoryContext = createContext<RepositoryContextType | undefined>(
  undefined
);

type RepositoryContextProviderProps = {
  children: ReactNode;
};

export const RepositoryContextProvider = ({
  children,
}: RepositoryContextProviderProps) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>(repos);
  const [isFetching, setIsFetching] = useState(true);

  const hasRepos = filteredRepos.length > 0;
  const isLoadingRepos = !hasRepos && isFetching;
  const isEmptyRepos = !hasRepos && !isFetching;

  const getRepositories = () => {
    setIsFetching(true);

    api
      .get('/users/pierrebosch/repos')
      .then(({ data: githubRepos }: AxiosResponse<Repository[]>) => {
        setRepos(githubRepos);
        setFilteredRepos(githubRepos);
      })
      .finally(() => setIsFetching(false));
  };

  const handleSearchRepository = (searchedRepositoryName: string) => {
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

  const contextValue: RepositoryContextType = {
    hasRepos,
    isLoadingRepos,
    isEmptyRepos,
    filteredRepos,
    getRepositories,
    handleSearchRepository,
  };

  return (
    <RepositoryContext.Provider value={contextValue}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      'useRepositoryContext deve ser usado dentro de um RepositoryContextProvider'
    );
  }

  return context;
};
