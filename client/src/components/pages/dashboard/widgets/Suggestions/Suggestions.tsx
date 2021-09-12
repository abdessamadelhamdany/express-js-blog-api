import { useAuth } from '@/src/hooks';

export default function Suggestions() {
  const { authUser } = useAuth();

  return <div>Suggestions widget: {`${authUser?.firstName} ${authUser?.lastName}`}</div>;
}

// https://www.blueclaw.co.uk/2020/02/06/keyword-suggestions-using-the-google-suggest-api-and-google-apps-script/
// https://stackoverflow.com/questions/5102878/where-is-the-documentation-for-the-google-suggest-api
