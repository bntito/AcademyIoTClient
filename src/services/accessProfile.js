import { useEffect } from 'react';
import { UseUserContext } from '../hooks/UserContext';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

function accessProfile(profile = 'isAdmin') {
  const { usersContext } = UseUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (usersContext.role == 'isAdmin' || usersContext.role == profile) {

    } else {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'No está autorizado para trabajar en la sección adminitrativa',
        showConfirmButton: false,
        timer: 3000
      });
      navigate('/');
    };
  });

  return (
    <div>accessProfile</div>
  );
}

export default accessProfile;