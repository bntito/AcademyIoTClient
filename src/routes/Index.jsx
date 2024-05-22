import Home from '../components/_commons-components/home/Home';
import AddCourse from '../components/_specifics-compoents/courses/AddCourse';
import Course from '../components/_specifics-compoents/courses/Course';
import ListCourse from '../components/_specifics-compoents/courses/ListCourse';
import ProfileCourse from '../components/_specifics-compoents/courses/ProfileCourse';
import ViewCourse from '../components/_specifics-compoents/courses/ViewCourse';
import ViewCourses from '../components/_specifics-compoents/courses/ViewCourses';
import AddProfessor from '../components/_specifics-compoents/professors/AddProfessor';
import Professor from '../components/_specifics-compoents/professors/Professor';
import ListProfessor from '../components/_specifics-compoents/professors/ListProfessor';
import ProfileProfessor from '../components/_specifics-compoents/professors/ProfileProfessor';
import AddStudent from '../components/_specifics-compoents/students/AddStudent';
import Student from '../components/_specifics-compoents/students/Student';
import ListStudent from '../components/_specifics-compoents/students/ListStudent';
import ProfileStudent from '../components/_specifics-compoents/students/ProfileStudent';
import AddEnrollment from '../components/_specifics-compoents/enrollments/AddEnrollment';
import Enrollments from '../components/_specifics-compoents/enrollments/Enrollments';
import ListEnrollments from '../components/_specifics-compoents/enrollments/ListEnrollments';
import Login from '../components/_specifics-compoents/user//Login';
import Logout from '../components/_specifics-compoents/user/Logout';
import PasswordChange from '../components/_specifics-compoents/user/PasswordChange';
import ListUser from '../components/_specifics-compoents/user/ListUser';
import AddUser from '../components/_specifics-compoents/user/AddUser';
import AddContact from '../components/_specifics-compoents/contacts/AddContact';
import Contact from '../components/_specifics-compoents/contacts/Contact';
import ListContact from '../components/_specifics-compoents/contacts/ListContact';

const routes = [
  { 
    path: '/',
    element: <Home />
  },
  { 
    path: '/addCourse',
    element: <AddCourse />
  },
  { 
    path: '/course',
    element: <Course />
  },
  { 
    path: '/coursesList',
    element: <ListCourse />
  },
  { 
    path: '/courseProfile',
    element: <ProfileCourse />
  },
  { 
    path: '/courseView/:id',
    element: <ViewCourse />
  },
  { 
    path: '/coursesView',
    element: <ViewCourses />
  },
  { 
    path: '/addProfessor',
    element: <AddProfessor />
  },
  { 
    path: '/professor',
    element: <Professor />
  },
  { 
    path: '/professorsList',
    element: <ListProfessor />
  },
  { 
    path: '/professorProfile',
    element: <ProfileProfessor />
  },
  { 
    path: '/addEnrollments',
    element: <AddEnrollment />
  },
  { 
    path: '/enrollments',
    element: <Enrollments />
  },
  { 
    path: '/enrollmentsList',
    element: <ListEnrollments />
  },
  { 
    path: '/addStudent',
    element: <AddStudent />
  },
  { 
    path: '/student',
    element: <Student />
  },
  { 
    path: '/studentsList',
    element: <ListStudent />
  },
  { 
    path: '/studentProfile',
    element: <ProfileStudent />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/passwordchange',
    element: <PasswordChange />
  },
  {
    path: '/usersList',
    element: <ListUser />
  },  
  {
    path: '/addUser',
    element: <AddUser />
  },
  {
    path: '/addContact',
    element: <AddContact />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/contactList',
    element: <ListContact />
  }
];

export default routes;