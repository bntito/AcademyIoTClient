import { useEffect, useState } from 'react';

import { useUsersContext } from '../../hooks/UserContext';

function Avatar() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const { usersContext } = useUsersContext();
  const idUser = usersContext.id;
  const [avatarUrl, setAvatarUrl] = useState();

  const getAvatar = async () => {
    const url = `${hostServer}/api/user/${idUser}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener la url del avatar');
      }
      const result = await response.json();
      setAvatarUrl(result.dataApi.avatar);
    } catch (error) {
      console.error('Error en consulta de url avatar', error); 
    };
  };

  useEffect(() => {
    if (idUser) {
      getAvatar();
    }
  }, [idUser]);

  return (
    <>
    <div>
      <img src={avatarUrl} alt='imagen avatar' className='avatar'/>
    </div>
    </>
  )
}

export default Avatar;