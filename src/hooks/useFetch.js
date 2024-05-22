import { useState } from 'react';
// import { useUsersContext } from '../hooks/UserContext';

export const useFetch = (url) => {
  const [dataServer, setDataServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { usersContext } = useUsersContext();
  // const token = usersContext.token;

  const fetchData = async (
    url,
    method = 'GET',
    formData = null
  ) => {
    setIsLoading(true);
    try {
      let options = null;
      options = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: formData ? JSON.stringify(formData) : null
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      const result = {
        status: response.status,
        dataServerResult: await responseData
      };
      setDataServer(result);
      return result;
    } catch (error) {
      if (error.name !== 'AbortError') {
        const data = {
          status: 500,
          message: 'No se pudo establecer conexión con el servidor',
          success: false,
          errorSystem: await error.message
        };
        setDataServer(data);
      }      
    } finally {
      setIsLoading(false);
    }
  };

  const getData = async (url) => {
    const resp = await fetchData(url);
    return resp;
  };

  const createData = async (url, formData) => {
    const resp = await fetchData(url, 'POST', formData);
    return resp;
  };

  const updateData = async (url, dataId, formData) => {
    const resp = await fetchData(`${url}/${dataId}`, 'PUT', formData);
    return resp;
  };

  const deleteData = async (url, dataId, token) => {
    const dataToken = { token };
    const resp = await fetchData(`${url}/${dataId}`, 'DELETE', dataToken);
    return resp;
  };

  const deleteTeacher = async (url, teacherId, courseId, token) => {
    const dataToken = { token };
    const resp = await fetchData(`${url}/${teacherId}/course/${courseId}`, 'DELETE', dataToken);
    return resp;
  };

  return {
    dataServer,
    isLoading,
    getData,
    createData,
    updateData,
    deleteData,
    deleteTeacher
  };
}