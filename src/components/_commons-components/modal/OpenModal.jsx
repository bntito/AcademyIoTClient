import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

// Función para abrir un modal
function OpenModal(OpenModal, handleClose, size, title, bgChange) {
  // Importación dinámica del componente Modal usando lazy loading
  const Modal = lazy(() => import('./Modal'));
  // Crear un nuevo div para el modal
  const modalDiv = document.createElement('div');
  modalDiv.id = 'modal';
  document.body.appendChild(modalDiv);
  // Crear una raíz para renderizar el modal
  const root = createRoot(modalDiv);

  // Renderizar el modal dentro de un Suspense para manejar la carga
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
}

export default OpenModal;