import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import LoginUser from '../../_commons-components/loginUser/LoginUser';

import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './relations.css';

export default function Relations() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/enrollments`;
  const [enrollments, setEnrollments] = useState([]);
  
  const { 
    dataServer, 
    isLoading, 
    getData 
  } = useFetch(api);

  const getEnrollments = async () => {
    await getData(api);
  };

  useEffect(() => {
    if (dataServer) {
      if (dataServer.message) {
        Swal.fire(dataServer.message);
      };
      if (dataServer.dataServerResult) {
        const dataApi = dataServer.dataServerResult.dataApi;
        const coursesMap = new Map();
        dataApi.forEach(({ course, professor, student }) => {
          if (!coursesMap.has(course)) {
            coursesMap.set(course, new Map());
          };
          const professorsMap = coursesMap.get(course);
          if (!professorsMap.has(professor)) {
            professorsMap.set(professor, []);
          };
          professorsMap.get(professor).push(student);
        });
        const enrollmentsArray = [];
        coursesMap.forEach((professorsMap, course) => {
          enrollmentsArray.push({
            course,
            professors: Array.from(professorsMap.entries()).map(([professor, students]) => ({
              professor,
              students,
            })),
          });
        });
        setEnrollments(enrollmentsArray);
      }
    }
  }, [dataServer]);

  useEffect(() => {
    getEnrollments();
  }, []);

  return (
    <>
      <div className='login-user-container'>
        <LoginUser />
      </div>
      <h3 className='mt-4 mb-1'>Relaciones</h3>
      <h6 className='mx-2 mb-4'><b>Estudiantes</b> por <b>Profesor</b> en <b>Curso</b></h6>
      {
        isLoading ? (
          <h3>Cargando...</h3>
        ) : (
          <div className='lists'>
            <Table className='d-none d-md-table'>
              <thead className='thead-relation'>
                <tr className='tr-relation'>
                  <th>Curso</th>
                  <th>Profesor</th>
                  <th>Estudiantes</th>
                </tr>
              </thead>
              <tbody>
                {
                  enrollments.map(({ course, professors }, courseIndex) => (
                    <React.Fragment 
                      key={courseIndex}
                    >
                      {
                      professors.map(({ professor, students }, profIndex) => (
                        <React.Fragment 
                          key={`${courseIndex}-${profIndex}`}
                        >
                          <tr 
                            className={courseIndex % 2 === 0 ? 'course-even' : 'course-odd'}
                          >
                            {
                              profIndex === 0 && (
                                <td
                                  rowSpan={professors.length}
                                >{course}
                                </td>
                              )
                            }
                            <td>{professor}</td>
                            <td>
                              <Table>
                                <tbody>
                                  {
                                    students.map((student, studentIndex) => (
                                      <tr 
                                        key={`${courseIndex}-${profIndex}-${studentIndex}`}
                                        className={profIndex % 2 === 0 ? 'professor-even' : 'professor-odd'}
                                      >
                                        <td>{student}</td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </Table>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                      }
                    </React.Fragment>
                  ))
                }
              </tbody>
            </Table>
            <div className='d-md-none'>
              {
                enrollments.map(({ course, professors }, courseIndex) => (
                  <div 
                    key={courseIndex} 
                    className={`mb-4 ${courseIndex % 2 === 0 ? 'course-even p-2' : 'course-odd p-2'}`}
                  >
                    <h5>{course}</h5>
                    {
                      professors.map(({ professor, students }, profIndex) => (
                        <div 
                          key={`${courseIndex}-${profIndex}`}
                        >
                          <h6>{professor}</h6>
                          <ul>
                            {
                              students.map((student, studentIndex) => (
                                <li 
                                  key={`${courseIndex}-${profIndex}-${studentIndex}`}
                                >{student}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  );
};