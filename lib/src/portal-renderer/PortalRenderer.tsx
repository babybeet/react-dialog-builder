import { Component } from 'react';
import { createPortal, render, unmountComponentAtNode } from 'react-dom';

import './PortalRenderer.light.scss';
import './PortalRenderer.dark.scss';

interface Props {
  containerClassName?: string;
  portal?: HTMLElement;
}

interface State {
}

/**
 * Render props.children into a portal. By default, when the prop `portal` is not provided,
 * <body> is assumed to be the portal, the component in prop `children` will be wrapped inside
 * a container of type <div> for easy management.
 *
 * Below is an example of the rendered DOM tree when no prop `portal` is provided
 *
 * ```
 *   <body> <!-- This is the portal by default if no prop `portal` is provided -->
 *       <div> <!-- This is the container wrapping around children for easier DOM management -->
 *           <!-- {prop.children} -->
 *       </div>
 *   </body>
 * ```
 */
export class PortalRenderer extends Component<Props, State> {

  static defaultProps = {
    portal: document.body
  } as Props;

  readonly container = document.createElement('div');

  constructor(props: Props = PortalRenderer.defaultProps) {
    super(props);

    this.container.className = 'bx-portal-renderer';
    if (this.props.containerClassName) {
      this.container.className += ' ' + this.props.containerClassName;
    }
    props.portal.appendChild(this.container);

    this.unmount = this.unmount.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.containerClassName !== prevProps.containerClassName) {
      this.container.className = 'bx-portal-renderer';
      if (this.props.containerClassName) {
        this.container.className += ' ' + this.props.containerClassName;
      }
    }
  }

  render() {
    return createPortal(this.props.children, this.container);
  }

  componentWillUnmount() {
    if (this.props.portal.contains(this.container)) {
      this.props.portal.removeChild(this.container);
    }
  }

  mount(component: React.ReactElement<HTMLElement>) {
    render(component, this.container);
  }

  unmount() {
    if (this.props.portal.contains(this.container)) {
      this.props.portal.removeChild(this.container);
    }
    if (this.props.portal !== document.body) {
      this.props.portal.parentElement.removeChild(this.props.portal);
    }
    unmountComponentAtNode(this.container);
  }

}
