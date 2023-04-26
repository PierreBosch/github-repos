type EmptyReposProps = {
  description?: string;
};

export function EmptyRepos({ description }: EmptyReposProps) {
  return (
    <span className="text-gray-400 text-center w-full p-8">
      {description || 'Nenhum repositório encontrado'}
    </span>
  );
}
