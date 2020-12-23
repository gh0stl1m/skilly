import React, { useState } from 'react';

// Components
import { ButtonLink, InputLink } from '../../commons';

import { LinkShornerContainer } from './styles';
import { urlShortnerApi } from '../../../utils/endpoints';

function LinkShorner() {
  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmitLink = async () => {
    setLoading(true);

    fetch(urlShortnerApi(process.env.SERVER_API), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: value,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setValue(data.url.link);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleInputOnChange = ({ target }) => setValue(target.value);

  return (
    <LinkShornerContainer>
      <InputLink
        onChange={handleInputOnChange}
        value={value}
        isDisabled={isLoading}
      />
      <ButtonLink
        onClick={handleSubmitLink}
        isLoading={isLoading}
      />
    </LinkShornerContainer>

  );
}

export default LinkShorner;
