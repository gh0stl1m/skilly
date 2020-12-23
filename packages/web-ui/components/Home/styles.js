import Styled from 'styled-components';

export const MainContainer = Styled.main`
  padding: 5rem 0;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainTitle = Styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

  span {
    color: #0070f3;
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

export const HomeContainer = Styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
