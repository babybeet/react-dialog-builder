import { DialogBuilder, DialogRef } from 'react-dialog-builder';

import './App.scss';
import 'react-dialog-builder/light.css';

function App() {
  const openDialog = () => {
    const dialogRef: DialogRef = DialogBuilder.newDialog(
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        padding: '5px 20px 15px',
        borderRadius: 4,
        fontFamily: 'Helvetica Neue'
      }}>
        <p>Creating dialogs can never be easier</p>
        <button
          type='button'
          style={{
            marginTop: 10
          }}
          onClick={() => dialogRef.close()}>
          Close
        </button>
      </div>
    )
      .dismissible()
      .open();

    dialogRef.runAfterClosed(() => console.info('Dialog was closed'));
  };

  return (
    <button onClick={openDialog}>Demo for react-dialog-bulder library</button>
  );
}

export default App;
