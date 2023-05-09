import { useEffect } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { EmptyRepos } from './components/EmptyRepos';
import { RepositoryCard } from './components/RepositoryCard';
import { Heading } from '../../components/Heading';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../../components/Form';

export function Repositories() {
  const {
    isLoadingRepos,
    isEmptyRepos,
    filteredRepos,
    getRepositories,
    handleSearchRepository,
  } = useRepository();

  const searchRepositorySchema = z.object({
    repositoryName: z
      .string()
      .transform((repositoryName) => repositoryName.toLowerCase()),
  });

  type SearchRepositoryType = z.infer<typeof searchRepositorySchema>;

  const searchRepositoryForm = useForm<SearchRepositoryType>({
    resolver: zodResolver(searchRepositorySchema),
  });

  const { watch } = searchRepositoryForm;

  const repositoryName = watch('repositoryName');

  useEffect(() => {
    handleSearchRepository(repositoryName);
  }, [repositoryName]);

  useEffect(() => {
    getRepositories();
  }, []);

  if (isLoadingRepos) {
    return (
      <Heading asChild size="xs">
        <h1>Carregando repositórios...</h1>
      </Heading>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-3xl divide-y divide-zinc-800">
      <FormProvider {...searchRepositoryForm}>
        <Form.Input name="repositoryName" placeholder="Find a repository..." />
      </FormProvider>

      {isEmptyRepos && <EmptyRepos />}

      {filteredRepos.map((repo) => (
        <RepositoryCard repository={repo} key={repo.id} />
      ))}
    </div>
  );
}
