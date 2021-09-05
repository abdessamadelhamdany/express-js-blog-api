import { Title } from './Edit.styled';
import { useRouter } from 'next/router';

export default function PostsEdit() {
  const {
    query: { id },
  } = useRouter();

  return <Title>Posts edit: {id}</Title>;
}
