import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default variant styling', () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('bg-white');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Test</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });
});
