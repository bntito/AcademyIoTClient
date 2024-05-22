<div
key={index}
className='mb-3'
>
<small>{`Código del Curso: ${course.code}`}</small>
<div className='card text-center card-container'>
  <div className='card-header'>
    <ul className='nav nav-tabs card-header-tabs'>
      <li className='nav-item'>
        <a className='nav-link active' aria-current='true' href='#'>Curso</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>Profesores</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link disabled' href='#' tabIndex='-1' aria-disabled='true'>Precio</a>
      </li>
    </ul>
  </div>
  <div className='card-body card-course-view'>
    <div>
    <img src={`${hostServer}${course.urlImg}`} alt={course.name} style={{ maxWidth: '30%' }} />
    </div>
    <h3 className='card-title'>{course.name}</h3>
    <p className='card-text'>{course.description}</p>
    <div
      href='#' className='btn btn-primary'
      onClick={() => handleCourseClick(course.id)}
    >
      Ver detalles del Curso
    </div>
  </div>
</div>
</div>