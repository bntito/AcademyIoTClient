import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUsersContext } from '../../../hooks/UserContext';

import { IoHomeOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdAppRegistration } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LuContact2 } from "react-icons/lu";
import { IoMdExit } from "react-icons/io";
import { BiBookAdd } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { FaChildren } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { CgUserList } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { TbRelationManyToMany } from "react-icons/tb";
import { IoLogInOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { TbPasswordUser } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { GiSixEyes } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";

import './menu.css';

function MenuItem({ item, closeMenu, userRole }) {
  // Estado local para controlar si los subelementos del menú están abiertos o cerrados
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar entre abrir y cerrar los subelementos del menú
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Función para manejar el clic en un subelemento del menú
  const handleClick = () => {
    closeMenu();
  };

  // Filtrar los subelementos del menú según el rol del usuario
  const filteredSubItems = item.subItems.filter(subItem =>
    subItem.roles.length === 0 || subItem.roles.includes(userRole)
  );

  return (
    <div className='menu-item'>
      <div
        onClick={handleToggle}
        className='menu-toggle'
      >
        <Link 
          to={item.route}
          className='item-icon-menu'
        >
          {item.icon}{' '}{item.title}
        </Link>
      <hr />
      </div>
      {
        isOpen && (
          <ul>
            {
              filteredSubItems.map((subItem) => (
                <li
                  key={subItem.title}
                  onClick={handleClick}
                >
                  <Link 
                    to={subItem.route}
                    className='subitem-icon-menu'
                  >
                    {subItem.icon}{subItem.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

function Menu({ closeMenu }) {
  // Obtener el contexto de usuario para determinar el rol del usuario actual
  const { usersContext } = useUsersContext();
  const userRole = usersContext.role;

  // Definición de los elementos del menú con sus subelementos y roles asociados
  const menuItems = [
    {
      icon: <IoHomeOutline />,
      title: 'Home',
      route: '/',
      subItems: [],
      roles: []
    },
    {
      icon: <SiGoogleclassroom />,
      title: 'Cursos',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addCourse', roles: [] },
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/coursesList', roles: [] },
        { icon: <RiProfileLine />, title: 'Perfil', route: '/courseProfile', roles: [] },
        { icon: <GiSixEyes />, title: 'Ver cursos', route: '/coursesView', roles: [] }
      ],
      roles: []
    },
    {
      icon: <PiStudentFill />,
      title: 'Estudiantes',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addStudent', roles: [] },
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/studentsList', roles: [] },
        { icon: <RiProfileLine />, title: 'Perfil', route: '/studentProfile', roles: [] }
      ],
      roles: []
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Profesores',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addProfessor', roles: [] },
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/professorsList', roles: [] },
        { icon: <RiProfileLine />, title: 'Perfil', route: '/professorProfile', roles: [] }
      ],
      roles: []
    },
    {
      icon: <MdOutlineAdminPanelSettings />,
      title: 'Administración',
      subItems: [
        { icon: <BsJournalBookmarkFill />, title: 'Gestión de Cursos', route: '/coursesList', roles: [] },
        { icon: <FaChildren />, title: 'Gestión de Estudiantes', route: '/studentsList', roles: [] },
        { icon: <LiaChalkboardTeacherSolid />, title: 'Gestión de Profesores', route: '/professorsList', roles: [] },
        { icon: <TbRelationManyToMany />, title: 'Estudiantes por curso', route: '/enrollmentsList', roles: [] },
        { icon: <TbRelationManyToMany />, title: 'Relación', route: '/relations', roles: [] },
        { icon: <LuContact2 />, title: 'Contactos', route: '/contactList', roles: [] },
        { icon: <TbReportMoney />, title: 'Salarios', route: '/salaries', roles: [] }
      ],
      roles: []
    },
    {
      icon: <MdAppRegistration />,
      title: 'Matrículas',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addEnrollments', roles: ['isTeacher', 'isAdmin'] },
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/enrollmentsList', roles: [] }
      ],
      roles: []
    },
    {
      icon: <MdOutlineFormatListBulleted />,
      title: 'Listados',
      subItems: [
        { icon: <FaClipboardList />, title: 'Cursos', route: '/coursesList', roles: [] },
        { icon: <CgUserList />, title: 'Estudiantes', route: '/studentsList', roles: [] },
        { icon: <FaListUl />, title: 'Profesores', route: '/professorsList', roles: [] },
        { icon: <TbRelationManyToMany />, title: 'Estudiantes por curso', route: '/enrollmentsList', roles: [] },
        { icon: <TbRelationManyToMany />, title: 'Relación', route: '/relations', roles: [] }
      ],
      roles: []
    },
    {
      icon: <FaRegUser />,
      title: 'Usuarios',
      subItems: [
        { icon: <IoLogInOutline />, title: 'Inicio Sesión', route: '/login', roles: [] },
        { icon: <BiLogOut />, title: 'Cerrar Sesión', route: '/logout', roles: [] },
        { icon: <TbPasswordUser />, title: 'Contraseñas', route: '/passwordchange', roles: [] },
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/usersList', roles: [] },
        { icon: <FaUsers />, title: 'Usuarios', route: '/addUser', roles: [] },
        { icon: <FaUserCheck />, title: 'Registrarse', route: '/signup', roles: [] }
      ],
      roles: []
    },
    {
      icon: <LuContact2 />,
      title: 'Contacto',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addContact', roles: [] },
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/contactList', roles: [] }
      ],
      roles: []
    },
    {
      icon: <IoMdExit />,
      title: 'Salir',
      route: 'https://google.com',
      subItems: [],
      roles: []
    }
  ];
  
  // Filtrar los elementos del menú según el rol del usuario
  const filteredMenuItems = menuItems.filter(item =>
    item.roles.length === 0 || item.roles.includes(userRole)
  );

  return (
    <div
      onMouseLeave={closeMenu}
      className='a-menu'
    >
      {
        filteredMenuItems.map((item) => (
          <MenuItem
            key={item.title}
            item={item}
            closeMenu={closeMenu}
            userRole={userRole}
          />
        ))
      }
    </div>
  );
}

export default Menu;