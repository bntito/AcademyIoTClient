import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

function OpenModal(OpenModal, handleClose, size, title, bgChange) {
  const Modal = lazy(() => import('./Modal'));
  const modalDiv = document.createElement('div');
  modalDiv.id = 'modal';
  document.body.appendChild(modalDiv);
  const root = createRoot(modalDiv);

  root.render(
    <Suspense fallback={ <div>Loading</div> }>
      <Modal
        handleClose={handleClose}
        size={size}
        title={title}
        bgChange={bgChange}
      >
        {OpenModal}
      </Modal>
    </Suspense>
  );
};

export default OpenModal;