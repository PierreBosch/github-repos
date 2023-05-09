import { Text } from '../../../../components/Text';

type EmptyReposProps = {
  description?: string;
};

export function EmptyRepos({ description }: EmptyReposProps) {
  return (
    <Text className="text-center w-full p-8">
      {description || 'Nenhum repositório encontrado'}
    </Text>
  );
}
