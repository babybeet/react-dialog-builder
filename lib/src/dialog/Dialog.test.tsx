import { render, screen } from '@testing-library/react';

import { Dialog } from './Dialog';

describe('<Dialog />', () => {

  it('1. should render content passed as children', async () => {
    render(
      <Dialog open>
        <p>Hello World</p>
        <button>Click me</button>
      </Dialog>
    );
    expect(await screen.findByText('Hello World')).toBeInTheDocument();
    expect(await screen.findByText('Click me')).toBeInTheDocument();
  });

  it('2. should have an entering animation when it is opened', async () => {
    render(
      <Dialog open>
        <p>Hello World</p>
        <button>Click me</button>
      </Dialog>
    );
    expect(await screen.findByTestId('dialog')).toHaveClass('bx-dialog--entering');
  });

  it('3. should have an leaving animation when it is closed', async () => {
    render(
      <Dialog open={false}>
        <p>Hello World</p>
      </Dialog>
    );
    expect(await screen.findByTestId('dialog')).toHaveClass('bx-dialog--leaving');
  });

});
