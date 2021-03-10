import React from 'react';
import RepoItem from './repoItems';
import PropType from 'prop-types';

const Repos = ({ repos }) => {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
  repos: PropType.array.isRequired,
};

export default Repos;
