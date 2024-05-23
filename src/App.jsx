import AcademyApp from './AcademyApp';

function App() {
  console.log('Api URL:', import.meta.env.VITE_REACT_APP_SERVER_HOST);
  return (
    <>
    <AcademyApp />
    </>
  );
}

export default App;
