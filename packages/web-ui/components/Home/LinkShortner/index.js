import React from 'react';
import PropTypes from 'prop-types';

// Components
import { ButtonLink, InputLink } from '../../commons';

import { LinkShornerContainer } from './styles';

function LinkShorner() {
  return (
    <LinkShornerContainer>
      <InputLink />
      <ButtonLink />
    </LinkShornerContainer>

  );
}

export default LinkShorner;
