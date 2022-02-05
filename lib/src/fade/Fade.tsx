import { Children, useEffect, cloneElement } from 'react';

import './Fade.dark.scss';

interface Props {
  in: boolean;
  children: React.ReactElement;
}

/**
 * Describe a fading-in/fading-out animation. Example usage
 *
 * ```
 *    <Fade in={someBooleanState}>
 *        <SomeComponent>
 *        </SomeComponent>
 *    </Fade>
 * ```
 */
export function Fade({ children, in: shouldFadeIn }: Props) {
  useEffect(() => {
    if (Children.count(children) !== 1) {
      throw new Error('<Fade /> component can only accept one child component');
    }
  }, []);

  if (children.props.className) {
    return cloneElement(children, { className: `${children.props.className} ${shouldFadeIn ? 'bx-fade-in' : 'bx-fade-out'}` });
  }
  return cloneElement(children, { className: shouldFadeIn ? 'bx-fade-in' : 'bx-fade-out' });

}
