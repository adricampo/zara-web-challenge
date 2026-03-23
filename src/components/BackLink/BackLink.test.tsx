import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BackLink } from './BackLink';

const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack }),
}));

describe('BackLink', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('renders back button', () => {
    render(<BackLink />);
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
  });

  it('displays BACK text', () => {
    render(<BackLink />);
    expect(screen.getByText(/BACK/i)).toBeInTheDocument();
  });

  it('calls router.back() on click', () => {
    render(<BackLink />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
