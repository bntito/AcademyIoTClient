import Home from '../components/_commons-components/home/Home';
import AddCourse from '../components/_specifics-components/courses/AddCourse';
import Course from '../components/_specifics-components/courses/Course';
import ListCourse from '../components/_specifics-components/courses/ListCourse';
import ProfileCourse from '../components/_specifics-components/courses/ProfileCourse';
import ViewCourse from '../components/_specifics-components/courses/ViewCourse';
import ViewCourses from '../components/_specifics-components/courses/ViewCourses';
import AddProfessor from '../components/_specifics-components/professors/AddProfessor';
import Professor from '../components/_specifics-components/professors/Professor';
import ListProfessor from '../components/_specifics-components/professors/ListProfessor';
import ProfileProfessor from '../components/_specifics-components/professors/ProfileProfessor';
import AddStudent from '../components/_specifics-components/students/AddStudent';
import Student from '../components/_specifics-components/students/Student';
import ListStudent from '../components/_specifics-components/students/ListStudent';
import ProfileStudent from '../components/_specifics-components/students/ProfileStudent';
import AddEnrollment from '../components/_specifics-components/enrollments/AddEnrollment';
import Enrollments from '../components/_specifics-components/enrollments/Enrollments';
import ListEnrollments from '../components/_specifics-components/enrollments/ListEnrollments';
import Login from '../components/_specifics-components/user//Login';
import Logout from '../components/_specifics-components/user/Logout';
import PasswordChange from '../components/_specifics-components/user/PasswordChange';
import ListUser from '../components/_specifics-components/user/ListUser';
import AddUser from '../components/_specifics-components/user/AddUser';
import AddContact from '../components/_specifics-components/contacts/AddContact';
import Contact from '../components/_specifics-components/contacts/Contact';
import ListContact from '../components/_specifics-components/contacts/ListContact';
import Relations from '../components/_specifics-components/relations/Relations';
import Signup from '../components/_specifics-components/user/signup/Signup';
import UserCompleteFromEmail from '../components/_specifics-components/user/signup/UserCompleteFromEmail';
import UserCompleteFromGoogle from '../components/_specifics-components/user/signup/UserCompleteFromGoogle';

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
    path: '/relations',
    element: <Relations />
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
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/completefromemail',
    element: <UserCompleteFromEmail />
  },
  {
    path: '/completefromgoogle',
    element: <UserCompleteFromGoogle />
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