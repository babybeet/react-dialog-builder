import { render, screen } from '@testing-library/react';

import { PortalRenderer } from './PortalRenderer';

describe('<PortalRenderer />', () => {

  it('1. should render the component in prop `children` in a container inserted directly into <body> if no target portal is provided', async () => {
    render(<PortalRenderer><p>Hello World</p></PortalRenderer>);

    const element = await screen.findByText('Hello World');
    expect(element).toBeInTheDocument();
    expect(element.parentElement.parentElement).toHaveProperty('tagName', 'BODY');
  });

  it('2. should render the component in prop `children` in the provided portal', async () => {
    const portal = document.createElement('div');

    document.body.insertBefore(portal, document.body.lastElementChild);

    render(<PortalRenderer portal={portal}><p>Hello World</p></PortalRenderer>);

    const element = await screen.findByText('Hello World');
    expect(element).toBeInTheDocument();
    expect(element.parentElement.parentElement).toBe(portal);
  });

  it('3. should render the component in prop `children` in a container with the provided class name', async () => {
    const className = 'test-class-name';
    render(<PortalRenderer containerClassName={className}><p>Hello World</p></PortalRenderer>);

    const element = await screen.findByText('Hello World');
    expect(element).toBeInTheDocument();
    expect(element.parentElement).toHaveClass(className);
  });

});
