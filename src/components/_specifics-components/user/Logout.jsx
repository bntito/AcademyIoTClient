import { useNavigate } from 'react-router-dom';

import BackButton from '../../../services/backButton/BackButton';
import { ImExit } from "react-icons/im";
import { useUsersContext } from '../../../hooks/UserContext';

import Swal from 'sweetalert2';

function Logout() {
  const navigate = useNavigate();
  const { setUsersContext } = useUsersContext();
  
  const logout = async () => {
    Swal.fire({
      title: 'Está seguro que desea salir?',
      text: 'Cerrar sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Salir'
    })
    .then((result) => {
      if (result.isConfirmed) {
        setUsersContext([]);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Hasta la próxima!',
          showConfirmButton: false,
          timer: 2000
        })
        navigate('/login');
        window.location.reload(true);
      }
    });
  };

  return (
    <>
      <BackButton />
      <div>
        <h2 className='text-center exit-text'>Salir</h2>
        <ImExit 
          onClick={logout}
          className='exit-icon'
        />
      </div>
    </>
  );
}

export default Logout;