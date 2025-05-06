// src/App.tsx
import React from 'react';
import LoanApplication from './components/LoanApplication';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <LoanApplication />
    </div>
  );
};

export default App;
