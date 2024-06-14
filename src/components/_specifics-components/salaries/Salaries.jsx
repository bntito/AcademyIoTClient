import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Swal from 'sweetalert2';

export default function Salaries() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/courses`;
  const [allCourses, setAllCourses] = useState([]);
  const [professorHoursArray, setProfessorHoursArray] = useState([]);

  let {
    dataServer,
    isLoading = false,
    getData
  } = useFetch(`${api}`);

  const fetchCourses = async () => {
    await getData(api);
  };

  function professorsActive() {
    const tempProfessorHoursArray = [];
    allCourses.forEach(course => {
      if (course.professors) {
        course.professors.forEach(prof => {
          const hours = parseFloat(prof.hourCost);
          const hourRate = parseFloat(prof.hourRate);
          let existingProf = tempProfessorHoursArray.find(p => p.professor === prof.professor);
          if (existingProf) {
            existingProf.hours += hours;
            existingProf.courseCount += 1;
          } else {
            tempProfessorHoursArray.push({
              professor: prof.professor,
              courseCount: 1,
              hourRate: hourRate,
              hours: hours
            });
          }
        });
      }
    });
    setProfessorHoursArray(tempProfessorHoursArray);
  };

  function handlePay() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Sin Fondos',
      showConfirmButton: false,
      timer: 2000
    }); 
  };

  useEffect(() => {
    if (dataServer?.message) {
      Swal.fire(dataServer.message);
    }
    if (dataServer?.status === 400 || dataServer?.status === 401) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: dataServer?.dataServerResult?.message || 'Error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    if (dataServer?.dataServerResult?.dataApi) {
      setAllCourses(dataServer.dataServerResult.dataApi);
    }
  }, [dataServer]);

  useEffect(() => {
    if (allCourses.length > 0) {
      professorsActive();
    }
  }, [allCourses]);
    
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className='login-user-container'>
        <LoginUser/>
      </div>
      <h3 className='mt-4 mb-3'>Salarios</h3>
      {
        isLoading ? (
          <h3>Cargando...</h3>
        ) : (
          <div>
            <table className='table table-striped table-bordered'>
              <thead>
                <tr className='table-dark'>
                  <th scope='col'>Profesor</th>
                  <th scope='col'>Horas</th>
                  <th scope='col'>Total a pagar</th>
                  <th scope='col'>Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataServer?.status === 500 ? (
                    <tr>
                      <td scope='col' colSpan={5}>
                        <h3>No hay información para esta entidad</h3>
                      </td>
                    </tr>
                  ) : (
                    professorHoursArray.map((professor, index) => (
                      <tr key={index}>
                        <td data-label='Profesor'>{professor.professor}</td>
                        <td data-label='Horas'>{professor.courseCount}</td>
                        <td data-label='Total a pagar'>{professor.hours}</td>
                        <td>
                          <button
                            onClick={handlePay} 
                            className="btn btn-primary w-100"
                          >Pagar
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        )
      }
    </>
  );
}