import { render, screen } from '@testing-library/react';

import { Backdrop } from './Backdrop';

describe('<Backdrop />', () => {

  it('1. should render a non-transparent backdrop by default', async () => {
    render(<Backdrop visible />);

    const backdrop = await screen.findByTestId('backdrop');
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).not.toHaveClass('bx-transparent');
  });

  it('2. should render a transparent backdrop when prop `transparent` is provided', async () => {
    render(
      <Backdrop
        visible
        transparent />
    );
    const backdrop = await screen.findByTestId('backdrop');
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass('bx-transparent');
  });

});
