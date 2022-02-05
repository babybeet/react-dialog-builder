import { render, screen } from '@testing-library/react';

import { Fade } from './Fade';

describe('<Fade />', () => {
  it('1. should fade in when prop `in` is `true`', async () => {
    render(<Fade in><p>Hello World</p></Fade>);

    expect(await screen.findByText('Hello World')).toBeInTheDocument();
    expect(await screen.findByText('Hello World')).toHaveClass('bx-fade-in');
  });

  it('2. should fade out when prop `in` is `false`', async () => {
    render(<Fade in={false}><p>Hello World</p></Fade>);

    expect(await screen.findByText('Hello World')).toBeInTheDocument();
    expect(await screen.findByText('Hello World')).toHaveClass('bx-fade-out');
  });
});
