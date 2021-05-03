import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const {container} = render(<App />);
  expect(container.firstChild).toHaveClass("app");
  expect(container.firstChild.childNodes[0]).toHaveClass("header");
  expect(container.firstChild.childNodes[1]).toHaveClass("loader");
  expect(container.firstChild.childNodes[2]).toHaveClass("back-to-top");
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
