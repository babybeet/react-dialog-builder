/**
 * Represents an object that contains a reference to the opened dialog which allows
 * closing the dialog or setting a callback to be invoked after the dialog is closed
 */
export interface DialogRef {
  /**
   * Manually close this dialog
   */
  close(): void;

  /**
   * Sets the callback to be invoked after the dialog is closed.
   */
  runAfterClosed(fn: () => void): void;
}
