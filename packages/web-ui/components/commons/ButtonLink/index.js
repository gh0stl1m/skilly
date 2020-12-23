import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

const ButtonLink = ({
  onClick,
  isLoading,
}) => (
  <Button
    type='button'
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : 'Generate'}
  </Button>
);

ButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ButtonLink;
