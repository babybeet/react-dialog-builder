import { Component, createRef } from 'react';

import { Backdrop } from '../backdrop/Backdrop';

import './Dialog.light.scss';
import './Dialog.dark.scss';

interface Props {
  open: boolean;
  className?: string;
  transparentBackdrop?: boolean;
  onAfterClosed?: () => void;
  onBackdropClicked?: () => void;
}

interface State {
  open: boolean;
}

/**
 * You typically don't want to use this component directly, instead, you `Dialog.create()`
 * to create a dialog builder for configuring the dialog
 */
export class Dialog extends Component<Props, State> {

  readonly dialogRef = createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      open: props.open
    };

    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.open !== prevProps.open) {
      this.setState({
        open: this.props.open
      });
    }
  }

  render() {
    return (
      <div className={`bx-dialog-container${this.props.open ? ' bx-active' : ''}`}>
        <Backdrop
          visible={this.state.open}
          transparent={this.props.transparentBackdrop}
          onClick={this.props.onBackdropClicked} />
        <div
          ref={this.dialogRef}
          className={
            `bx-dialog ${this.state.open ? 'bx-dialog--entering' : 'bx-dialog--leaving'}${this.props.className ? ` ${this.props.className}` : ''}`
          }
          data-testid='dialog'
          onAnimationEnd={this.onAnimationEnd}>
          {this.props.children}
        </div>
      </div>
    );
  }

  onAnimationEnd() {
    if (!this.state.open) {
      this.props.onAfterClosed?.();
    }
  }

  close() {
    this.setState({
      open: false
    });
  }

}
