import Styled from 'styled-components';

export const Button = Styled.button`
  padding: 12px;
  outline: none;
  border: none;
  color: #fff;
  background-color: #0070f3;
  cursor: pointer;
  transition: background-color 240ms ease-out;
  border: 1px solid #0070f3;
  z-index: 1;
  border-radius: 0 3px 3px 0;
  user-select: none;
  min-width: 100px;

  &:hover {
    background-color: #00489b;
  }
`;
