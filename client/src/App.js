import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner></Spinner>) : (<Routes>
          <Route path='/' element={<ProtectedRoute>
            <HomePage></HomePage>
          </ProtectedRoute>}></Route>
          <Route path='/apply-doctor' element={<ProtectedRoute>
            <ApplyDoctor></ApplyDoctor>
          </ProtectedRoute>}></Route>
          <Route path='/admin/users' element={<ProtectedRoute>
            <Users></Users>
          </ProtectedRoute>}></Route>
          <Route path='/admin/doctors' element={<ProtectedRoute>
            <Doctors></Doctors>
          </ProtectedRoute>}></Route>
          <Route path='/doctor/profile/:id' element={<ProtectedRoute>
            <Profile></Profile>
          </ProtectedRoute>}></Route>
          <Route path='/doctor/book-appointment/:doctorId' element={<ProtectedRoute>
            <BookingPage></BookingPage>
          </ProtectedRoute>}></Route>
          <Route path='/notification' element={<ProtectedRoute>
            <NotificationPage></NotificationPage>
          </ProtectedRoute>}></Route>
          <Route path='/login' element={<PublicRoute> <Login></Login></PublicRoute>
          }></Route>
          <Route path='/register' element={
            <PublicRoute>
              <Register></Register>
            </PublicRoute>
          }></Route>
        </Routes>)}
      </BrowserRouter>
    </>
  );
}

export default App;
