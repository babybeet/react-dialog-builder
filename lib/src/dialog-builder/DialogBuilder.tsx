import { ReactNode, createRef } from 'react';

import { Dialog } from '../dialog/Dialog';
import { PortalRenderer } from '../portal-renderer/PortalRenderer';
import { DialogRef } from '../dialog-ref';

export class DialogBuilder {

  private readonly _dialogSpecs = {
    classNames: [] as string[],
    content: undefined as ReactNode,
    dismissible: false,
    transparentBackdrop: false
  };

  /**
   * The entry point to the `DialogBuilder` APIs
   *
   * @param content The component's JSX to render
   * @returns A new dialog builder instance
   */
  static newDialog(content: ReactNode) {
    return new DialogBuilder(content);
  }

  private constructor(content: ReactNode) {
    this._dialogSpecs.content = content;
  }

  /**
   * Adds another class name for this dialog, newly added class names are
   * concatenated instead of replacing previous ones.
   *
   * @param value The new class name to add
   * @returns This dialog builder instance
   */
  addClassName(value: string) {
    this._dialogSpecs.classNames.push(value);
    return this;
  }

  /**
   * Sets whether this dialog can be closed by clicking on the backdrop, `false` by default
   *
   * @returns This dialog builder instance
   */
  dismissible() {
    this._dialogSpecs.dismissible = true;
    return this;
  }

  /**
   * Sets whether the backdrop should be transparent, `false` by default
   *
   * @returns This dialog builder instance
   */
  transparentBackdrop() {
    this._dialogSpecs.transparentBackdrop = true;
    return this;
  }

  /**
   * Opens the currently configured dialog, returns a dialog reference object that includes methods
   * to close this dialog or to set a callback to be invoked after the dialog is closed
   *
   * @returns A {@link DialogRef} object
   */
  open(): DialogRef {
    const dialogRef = createRef<Dialog>();
    const portalRenderer = new PortalRenderer();
    const bodyOverflow = getComputedStyle(document.body).overflow;
    const dialogSpecs = this._dialogSpecs;
    let afterClosedCallback: () => void;

    document.body.style.overflow = 'hidden';
    portalRenderer.mount(
      <Dialog
        open
        ref={dialogRef}
        className={dialogSpecs.classNames.join(' ')}
        transparentBackdrop={dialogSpecs.transparentBackdrop}
        onAfterClosed={() => {
          portalRenderer.unmount();
          afterClosedCallback?.();
        }}
        onBackdropClicked={() => {
          if (dialogSpecs.dismissible) {
            dialogRef.current.close();
          }
        }}>
        {dialogSpecs.content}
      </Dialog>
    );

    return {
      close() {
        dialogRef.current.close();
        document.body.style.overflow = bodyOverflow;
      },

      runAfterClosed(fn: () => void) {
        afterClosedCallback = fn;
      }
    };
  }

}
