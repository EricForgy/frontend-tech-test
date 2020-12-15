import { useQuery, gql } from "@apollo/client";

import { Related } from "../../components/Related";

const GET_REPOSITORY = gql`
  query getRepository($username: String!, $repository: String!) {
    repository(username: $username, repository: $repository) {
      stars
    }
  }
`;

const Repository = ({ match }) => {
  const { username, repository } = match.params;

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      username,
      repository,
    },
  });

  if (loading) {
    return null;
  }

  return (
    <>
      <h1 data-testid="repository">
        Repository: {username}/{repository}
      </h1>
      <ul>
        <li data-testid="stars">
          <strong>Stars:</strong> {data.repository.stars.toLocaleString()}
        </li>
      </ul>
      <Related />
    </>
  );
};

export default Repository;
