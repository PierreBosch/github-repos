import { Avatar } from '../../../../components/Avatar';
import { Text } from '../../../../components/Text';
import { Repository } from '../../types';

type RepositoryCardProps = {
  repository: Repository;
};

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="flex items-center px-4 py-6  gap-x-2 w-full">
      <Avatar avatarUrl={repository.owner.avatar_url} alt="Avatar Github" />

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <a
            target="_blank"
            href={repository?.html_url}
            className="flex items-center gap-2 text-lg font-semibold text-blue-400 hover:underline"
          >
            {repository.name}
          </a>
          <Text
            size="xs"
            className="flex items-center justify-center px-2 py-0.5 border border-gray-700 rounded-full"
          >
            Public
          </Text>
        </div>
        <Text asChild className="font-medium" size="xs">
          <strong>{repository.language}</strong>
        </Text>
      </div>
    </div>
  );
}
