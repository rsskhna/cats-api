import { render, screen } from '@testing-library/react';
import App from '../components/app/app';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
    const title = screen.getByText(/cats/i);
    expect(title).toBeInTheDocument();
  });
});
