import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import TodoList from './components/TodoList';
import '../src/styles/App.css';
import useScrollToTop from "../src/types/use-scroll-to-top";

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<'registration' | 'todolist'>('registration');
    useScrollToTop();
    return (
        <div className="app-container">
            {/* Navigation */}
            <div className="navigation">
                <button
                    onClick={() => setCurrentView('registration')}
                    className={`nav-button ${currentView === 'registration' ? 'nav-button-active' : ''}`}
                >
                    Câu 1: Form đăng ký
                </button>
                <button
                    onClick={() => setCurrentView('todolist')}
                    className={`nav-button ${currentView === 'todolist' ? 'nav-button-active' : ''}`}
                >
                    Câu 2: Todo List
                </button>
            </div>

            {/* Content */}
            {currentView === 'registration' && <RegistrationForm />}
            {currentView === 'todolist' && <TodoList />}
        </div>
    );
};

export default App;