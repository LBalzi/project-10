import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Update from './components/Update';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="wrap">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id/update" element={<Update />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;