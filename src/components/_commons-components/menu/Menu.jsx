import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

import './menu.css';

function MenuItem({ item, closeMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    closeMenu();
  };

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
              item.subItems.map((subItem) => (
                <li
                  key={subItem.title}
                  onClick={handleClick}
                >
                  <Link 
                    to={subItem.route}
                    className='item-icon-menu'
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
}

function Menu({ closeMenu }) {
  const menuItems = [
    {
      icon: <IoHomeOutline />,
      title: 'Home',
      route: '/',
      subItems: []
    },
    {
      icon: <SiGoogleclassroom />,
      title: 'Cursos',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addCourse'},
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/coursesList'},
        { icon: <RiProfileLine />, title: 'Perfil', route: '/courseProfile'},
        { icon: <GiSixEyes />, title: 'Ver cursos', route: '/coursesView'}
      ]
    },
    {
      icon: <PiStudentFill />,
      title: 'Estudiantes',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addStudent'},
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/studentsList'},
        { icon: <RiProfileLine />, title: 'Perfil', route: '/studentProfile'}
      ]
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Profesores',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addProfessor'},
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/professorsList'},
        { icon: <RiProfileLine />, title: 'Perfil', route: '/professorProfile'}
      ]
    },
    {
      icon: <MdOutlineAdminPanelSettings />,
      title: 'Administración',
      subItems: [
        { icon: <BsJournalBookmarkFill />, title: 'Gestión de Cursos', route: '/coursesList'},
        { icon: <FaChildren />, title: 'Gestión de Estudiantes', route: '/studentsList'},
        { icon: <LiaChalkboardTeacherSolid />, title: 'Gestión de Profesores', route: '/professorsList'},
        { icon: <LuContact2 />, title: 'Contacto', route: '/'}
      ]
    },
    {
      icon: <MdAppRegistration />,
      title: 'Matrículas',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addEnrollments'},
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/enrollmentsList'}
      ]
    },
    {
      icon: <MdOutlineFormatListBulleted />,
      title: 'Listados',
      subItems: [
        { icon: <FaClipboardList />, title: 'Cursos', route: '/coursesList'},
        { icon: <CgUserList />, title: 'Estudiantes', route: '/studentsList'},
        { icon: <FaListUl />, title: 'Profesores', route: '/professorsList'},
        { icon: <TbRelationManyToMany />, title: 'Estudiantes por curso', route: '/enrollmentsList'}
      ]
    },
    {
      icon: <FaRegUser />,
      title: 'Usuarios',
      subItems: [
        { icon: <IoLogInOutline />, title: 'Inicio Sesión', route: '/login'},
        { icon: <BiLogOut />, title: 'Cerrar Sesión', route: '/logout'},
        { icon: <TbPasswordUser />, title: 'Contraseñas', route: '/passwordchange'},
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/usersList'},
        { icon: <FaUsers />, title: 'Usuarios', route: '/addUser'}
      ]
    },
    {
      icon: <LuContact2 />,
      title: 'Contacto',
      subItems: [
        { icon: <BiBookAdd />, title: 'Registro', route: '/addContact'},
        { icon: <MdOutlineFormatListBulleted />, title: 'Listado', route: '/contactList'}
      ]
    },
    {
      icon: <IoMdExit />,
      title: 'Salir',
      route: 'https://google.com',
      subItems: []
    }
  ]
  
  return (
    <div
      onMouseLeave={closeMenu}
      className='a-menu'
    >
      {
        menuItems.map((item) => (
          <MenuItem
            key={item.title}
            item={item}
            closeMenu={closeMenu}
          />
        ))
      }
    </div>
  );
}

export default Menu;