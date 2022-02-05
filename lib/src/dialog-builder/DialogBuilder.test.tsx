/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Dialog } from '../dialog/Dialog';

import { DialogBuilder } from './DialogBuilder';

describe('DialogBuilder', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1. should open a dialog with the provided content', async () => {
    const dialogBuilder = DialogBuilder.newDialog(null);
    jest.spyOn(dialogBuilder, 'open')
      .mockImplementationOnce(() => {
        render(
          <Dialog open>
            <p>Hello World</p>
            <button>Click me</button>
          </Dialog>
        );
        return null;
      });
    dialogBuilder.open();

    expect(await screen.findByText('Hello World')).toBeInTheDocument();
    expect(await screen.findByText('Click me')).toBeInTheDocument();
  });

  it('2. should return an object that has a method to close the opened dialog', async () => {
    const dialogBuilder = DialogBuilder.newDialog(null);
    jest.spyOn(dialogBuilder, 'open')
      .mockImplementationOnce(() => {
        const ref = createRef<Dialog>();
        render(
          <Dialog
            open
            ref={ref}>
            <p>Hello World</p>
          </Dialog>
        );
        return {
          close() {
            ref.current.close();
          },
          runAfterClosed() {

          }
        };
      });
    dialogBuilder.open().close();

    expect(await screen.findByTestId('dialog')).toHaveClass('bx-dialog--leaving');
  });

  it('3. should return an object that has a method to set the callback to be invoked after the dialog is closed', async () => {
    const dialogBuilder = DialogBuilder.newDialog(null);

    jest.spyOn(dialogBuilder, 'open')
      .mockImplementationOnce(() => {
        const ref = createRef<Dialog>();
        let afterClosedCallback: () => any;

        render(
          <Dialog
            open
            ref={ref}
            onAfterClosed={() => {
              afterClosedCallback();
            }}>
            <p>Hello World</p>
          </Dialog>
        );
        return {
          close() {
            ref.current.close();
          },
          runAfterClosed(fn: () => void) {
            afterClosedCallback = fn;
          }
        };
      });

    const dialogRef = dialogBuilder.open();
    const afterClosedCallbackSpy = jest.fn();
    dialogRef.runAfterClosed(afterClosedCallbackSpy);
    dialogRef.close();

    const dialog = await screen.findByTestId('dialog');
    expect(dialog).toHaveClass('bx-dialog--leaving');
    fireEvent.animationEnd(dialog);

    await waitFor(() => expect(afterClosedCallbackSpy).toHaveBeenCalledTimes(1));
  });

  it('4. clicking on the backdrop should close the dialog if it is dismissible', async () => {
    const dialogBuilder = DialogBuilder.newDialog(null);
    let dismissible = false;

    jest.spyOn(dialogBuilder, 'dismissible')
      .mockImplementationOnce(() => {
        dismissible = true;
        return dialogBuilder;
      });

    jest.spyOn(dialogBuilder, 'open')
      .mockImplementationOnce(() => {
        const ref = createRef<Dialog>();
        let afterClosedCallback: () => any;

        render(
          <Dialog
            open
            ref={ref}
            onAfterClosed={() => {
              afterClosedCallback();
            }}
            onBackdropClicked={() => {
              if (dismissible) {
                ref.current.close();
              }
            }}>
            <p>Hello World</p>
          </Dialog>
        );
        return {
          close() {
            ref.current.close();
          },
          runAfterClosed(fn: () => void) {
            afterClosedCallback = fn;
          }
        };
      });
    const afterClosedCallbackSpy = jest.fn();
    dialogBuilder.dismissible()
      .open()
      .runAfterClosed(afterClosedCallbackSpy);

    expect(dismissible).toBe(true);

    const backdrop = await screen.findByTestId('backdrop');
    userEvent.click(backdrop);
    expect(backdrop).toHaveClass('bx-fade-out');

    const dialog = await screen.findByTestId('dialog');
    expect(dialog).toHaveClass('bx-dialog--leaving');
    fireEvent.animationEnd(dialog);

    await waitFor(() => expect(afterClosedCallbackSpy).toHaveBeenCalledTimes(1));
  });

  it('5. backdrop should be transparent if `transparentBackdrop` method is called', async () => {
    const dialogBuilder = DialogBuilder.newDialog(null);
    let transparentBackdrop = false;

    jest.spyOn(dialogBuilder, 'transparentBackdrop')
      .mockImplementationOnce(() => {
        transparentBackdrop = true;
        return dialogBuilder;
      });

    jest.spyOn(dialogBuilder, 'open')
      .mockImplementationOnce(() => {
        render(
          <Dialog
            open
            transparentBackdrop={transparentBackdrop}>
            <p>Hello World</p>
          </Dialog>
        );
        return null;
      });

    dialogBuilder.transparentBackdrop().open();

    expect(transparentBackdrop).toBe(true);
    expect(await screen.findByTestId('backdrop')).toHaveClass('bx-transparent');
  });

});
