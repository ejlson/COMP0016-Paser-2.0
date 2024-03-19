import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* import components */
import Navbar from './components/Navbar';

/* import pages */
import FileManager from './pages/FileManager';
import Chat from './pages/Chat';

/* import assets */
import background_2 from './assets/background_2.png';
import background_3 from './assets/background_3.png';



function App() {

  const appStyle = {
    backgroundImage: `url(${background_3})`,
    backgroundSize: 'cover', // Cover the entire page
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Do not repeat the image
  };

  return (
    <div className='App flex-1 overflow-auto'>

      <div 
        className='h-screen p-2 flex flex-row overflow-hidden'
        style={appStyle}
      >
        
        <div className='flex-grow'>
          <BrowserRouter >   
              <Navbar>
                <Routes>
                  <Route path='/' element={<Chat />} />
                  <Route path='/filemanager' element={<FileManager />} />
                </Routes>
              </Navbar>
          </BrowserRouter>
        </div>
      </div>

    </div>

    );
}

      export default App;
