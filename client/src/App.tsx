// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import type { User } from './types/types';

// const App: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);

//   const handleLogin = (authData: { user: User; token: string }) => {
//     setUser(authData.user);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={
//           user ? <Home /> : <Navigate to="/login" replace />
//         } />
//         <Route path="/login" element={
//           user ? <Navigate to="/" replace /> : <Home />
//         } />
//       {/* </Routes> */}
//        </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;