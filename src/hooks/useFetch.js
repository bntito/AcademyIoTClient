import { useState } from 'react';

// Hook personalizado para realizar solicitudes HTTP
export const useFetch = (url) => {
  const [dataServer, setDataServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para realizar la solicitud HTTP
  const fetchData = async (
    url,
    method = 'GET',
    formData = null
  ) => {
    setIsLoading(true); // Establecer isLoading en true durante la carga
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
      setDataServer(result);  // Almacenar la respuesta del servidor en el estado
      return result;
    } catch (error) {
      if (error.name !== 'AbortError') {
        const data = {
          status: 500,
          message: 'No se pudo establecer conexión con el servidor',
          success: false,
          errorSystem: await error.message
        };
        setDataServer(data);  // Almacenar el error en el estado
      }      
    } finally {
      setIsLoading(false);  // Establecer isLoading en false después de completar la carga
    };
  };

  // Funciones para realizar diferentes tipos de solicitudes HTTP
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

  // Devolver los datos y funciones necesarios para realizar solicitudes HTTP
  return {
    dataServer,
    isLoading,
    getData,
    createData,
    updateData,
    deleteData,
    deleteTeacher
  };
};