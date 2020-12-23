import React from 'react';
import PropTypes from 'prop-types';

import { Input } from './styles';

function InputLink ({
  onChange,
  value,
  placeholder,
  isDisabled,
  onFocus,
  onBlur,
}) {
  return (
    <Input
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      readOnly={isDisabled}
      disabled={isDisabled}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

InputLink.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
};

InputLink.defaultProps = {
  placeholder: "Add link ...",
};

export default InputLink;
