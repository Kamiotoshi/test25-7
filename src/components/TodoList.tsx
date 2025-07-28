import React, { useState } from 'react';
import TodoItem, { Todo } from './TodoItem';
import '../styles/TodoList.css';
import {ButtonWithLoading, LoadingBar} from "./loading";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [barLoading, setBarLoading] = useState(false);

    const addTodo = (): void => {
        if (inputValue.trim() !== '') {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false
            };
            setLoading(true);
            setBarLoading(true);
            setTimeout(() => {
                setLoading(false);
                setBarLoading(false);
                alert("Đã đăng ký thành công!");
                setTodos(prev => [...prev, newTodo]);
                setInputValue('');
            }, 2000);

        }
    };

    const deleteTodo = (id: number): void => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const editTodo = (id: number, newText: string): void => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    const toggleComplete = (id: number): void => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <>
            <LoadingBar isLoading={barLoading} />
            <div className="todo-container">
                <h2 className="title">Todo List</h2>

                {/* Add new todo */}
                <div className="add-todo-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Thêm công việc mới..."
                        className="add-todo-input"
                    />
                    <ButtonWithLoading
                        onClick={addTodo}
                        loading={loading}
                        className="add-button"
                    >
                        Thêm
                    </ButtonWithLoading>
                </div>

                {/* Todo list */}
                <div className="todo-list">
                    {todos.length === 0 ? (
                        <p className="empty-state">Chưa có công việc nào</p>
                    ) : (
                        todos.map((todo: Todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggleComplete={toggleComplete}
                                onDelete={deleteTodo}
                                onEdit={editTodo}
                            />
                        ))
                    )}
                </div>
            </div>
        </>

    );
};

export default TodoList;