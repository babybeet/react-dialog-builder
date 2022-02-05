import { Fade } from '../fade/Fade';

import './Backdrop.light.scss';
import './Backdrop.dark.scss';

interface Props {
  visible: boolean;
  transparent?: boolean;
  onClick?: () => void;
}

export function Backdrop(props: Props) {
  return (
    <Fade in={props.visible}>
      <div
        className={`bx-backdrop${props.transparent ? ' bx-transparent' : ''}`}
        data-testid='backdrop'
        onClick={props.onClick} />
    </Fade>
  );
}
