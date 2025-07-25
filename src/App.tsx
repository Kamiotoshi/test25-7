import React, { useState, useEffect } from 'react';

// CSS Styles
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif'
    },
    navigation: {
        maxWidth: '400px',
        margin: '0 auto 2rem auto',
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    },
    navButton: {
        flex: 1,
        padding: '12px 16px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
        backgroundColor: 'white',
        color: '#374151'
    },
    navButtonActive: {
        backgroundColor: '#3b82f6',
        color: 'white'
    },
    formContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        textAlign: 'center' as const,
        color: '#1f2937'
    },
    inputGroup: {
        marginBottom: '1rem'
    },
    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.5rem'
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box' as const
    },
    inputFocus: {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    inputError: {
        borderColor: '#ef4444'
    },
    errorMessage: {
        color: '#ef4444',
        fontSize: '0.875rem',
        marginTop: '0.25rem'
    },
    button: {
        width: '100%',
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    buttonHover: {
        backgroundColor: '#2563eb'
    },
    todoContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    addTodoContainer: {
        display: 'flex',
        marginBottom: '1rem',
        gap: '0.5rem'
    },
    addTodoInput: {
        flex: 1,
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '1rem',
        outline: 'none'
    },
    addButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem'
    },
    todoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        marginBottom: '0.5rem'
    },
    todoText: {
        flex: 1,
        color: '#1f2937'
    },
    todoTextCompleted: {
        textDecoration: 'line-through',
        color: '#6b7280'
    },
    checkbox: {
        width: '16px',
        height: '16px'
    },
    editInput: {
        flex: 1,
        padding: '0.5rem',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '1rem',
        outline: 'none'
    },
    actionButton: {
        padding: '0.25rem 0.5rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.75rem',
        margin: '0 0.125rem'
    },
    editButton: {
        backgroundColor: '#f59e0b',
        color: 'white'
    },
    saveButton: {
        backgroundColor: '#10b981',
        color: 'white'
    },
    cancelButton: {
        backgroundColor: '#6b7280',
        color: 'white'
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        color: 'white'
    },
    emptyState: {
        textAlign: 'center' as const,
        color: '#6b7280',
        padding: '2rem'
    }
};

// Types và Interfaces
interface ValidationRule {
    test: (value: string) => boolean;
    message: string;
}

interface ValidatedInputProps {
    label: string;
    type: string;
    placeholder: string;
    validationRules: ValidationRule[];
    value: string;
    onChange: (value: string) => void;
}

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

// Câu 3: ValidatedInput Component
const ValidatedInput: React.FC<ValidatedInputProps> = ({
                                                           label,
                                                           type,
                                                           placeholder,
                                                           validationRules,
                                                           value,
                                                           onChange
                                                       }) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);

    useEffect(() => {
        if (touched) {
            const newErrors: string[] = [];
            validationRules.forEach((rule: ValidationRule) => {
                if (!rule.test(value)) {
                    newErrors.push(rule.message);
                }
            });
            setErrors(newErrors);
        }
    }, [value, validationRules, touched]);

    const handleBlur = (): void => {
        setTouched(true);
        setFocused(false);
    };

    const handleFocus = (): void => {
        setFocused(true);
    };

    const inputStyle = {
        ...styles.input,
        ...(focused ? styles.inputFocus : {}),
        ...(errors.length > 0 && touched ? styles.inputError : {})
    };

    return (
        <div style={styles.inputGroup}>
            <label style={styles.label}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                style={inputStyle}
            />
            {errors.length > 0 && touched && (
                <div>
                    {errors.map((error: string, index: number) => (
                        <p key={index} style={styles.errorMessage}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

// Component Form đăng ký tài khoản
const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [buttonHover, setButtonHover] = useState<boolean>(false);

    // Validation rules
    const usernameRules: ValidationRule[] = [
        { test: (value: string) => value.length >= 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự' },
        { test: (value: string) => /^[a-zA-Z0-9_]+$/.test(value), message: 'Tên đăng nhập chỉ chứa chữ cái, số và dấu gạch dưới' }
    ];

    const emailRules: ValidationRule[] = [
        { test: (value: string) => value.length > 0, message: 'Email không được để trống' },
        { test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Email không hợp lệ' }
    ];

    const passwordRules: ValidationRule[] = [
        { test: (value: string) => value.length >= 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { test: (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value), message: 'Mật khẩu phải chứa chữ hoa, chữ thường và số' }
    ];

    const confirmPasswordRules: ValidationRule[] = [
        { test: (value: string) => value === formData.password, message: 'Mật khẩu xác nhận không khớp' }
    ];

    const updateField = (field: keyof typeof formData) => (value: string): void => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (): void => {
        alert('Đăng ký thành công! (Demo)');
    };

    const buttonStyle = {
        ...styles.button,
        ...(buttonHover ? styles.buttonHover : {})
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.title}>Đăng ký tài khoản</h2>

            <ValidatedInput
                label="Tên đăng nhập"
                type="text"
                placeholder="Nhập tên đăng nhập"
                validationRules={usernameRules}
                value={formData.username}
                onChange={updateField('username')}
            />

            <ValidatedInput
                label="Email"
                type="email"
                placeholder="Nhập email"
                validationRules={emailRules}
                value={formData.email}
                onChange={updateField('email')}
            />

            <ValidatedInput
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                validationRules={passwordRules}
                value={formData.password}
                onChange={updateField('password')}
            />

            <ValidatedInput
                label="Xác nhận mật khẩu"
                type="password"
                placeholder="Nhập lại mật khẩu"
                validationRules={confirmPasswordRules}
                value={formData.confirmPassword}
                onChange={updateField('confirmPassword')}
            />

            <button
                onClick={handleSubmit}
                style={buttonStyle}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
            >
                Đăng ký
            </button>
        </div>
    );
};

// Câu 4: TodoList Component
const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    const addTodo = (): void => {
        if (inputValue.trim() !== '') {
            const newTodo: TodoItem = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false
            };
            setTodos(prev => [...prev, newTodo]);
            setInputValue('');
        }
    };

    const deleteTodo = (id: number): void => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const startEdit = (id: number, text: string): void => {
        setIsEditing(id);
        setEditValue(text);
    };

    const saveEdit = (id: number): void => {
        if (editValue.trim() !== '') {
            setTodos(prev => prev.map(todo =>
                todo.id === id ? { ...todo, text: editValue.trim() } : todo
            ));
        }
        setIsEditing(null);
        setEditValue('');
    };

    const cancelEdit = (): void => {
        setIsEditing(null);
        setEditValue('');
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

    const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number): void => {
        if (e.key === 'Enter') {
            saveEdit(id);
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    return (
        <div style={styles.todoContainer}>
            <h2 style={styles.title}>Todo List</h2>

            {/* Add new todo */}
            <div style={styles.addTodoContainer}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Thêm công việc mới..."
                    style={styles.addTodoInput}
                />
                <button
                    onClick={addTodo}
                    style={styles.addButton}
                >
                    Thêm
                </button>
            </div>

            {/* Todo list */}
            <div>
                {todos.length === 0 ? (
                    <p style={styles.emptyState}>Chưa có công việc nào</p>
                ) : (
                    todos.map((todo: TodoItem) => (
                        <div key={todo.id} style={styles.todoItem}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                style={styles.checkbox}
                            />

                            {isEditing === todo.id ? (
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
                                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleEditKeyPress(e, todo.id)}
                                    style={styles.editInput}
                                    autoFocus
                                />
                            ) : (
                                <span style={todo.completed ? {...styles.todoText, ...styles.todoTextCompleted} : styles.todoText}>
                  {todo.text}
                </span>
                            )}

                            <div>
                                {isEditing === todo.id ? (
                                    <>
                                        <button
                                            onClick={() => saveEdit(todo.id)}
                                            style={{...styles.actionButton, ...styles.saveButton}}
                                        >
                                            Lưu
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            style={{...styles.actionButton, ...styles.cancelButton}}
                                        >
                                            Hủy
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => startEdit(todo.id, todo.text)}
                                            style={{...styles.actionButton, ...styles.editButton}}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            style={{...styles.actionButton, ...styles.deleteButton}}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Main App Component
const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<'registration' | 'todolist'>('registration');

    return (
        <div style={styles.container}>
            {/* Navigation */}
            <div style={styles.navigation}>
                <button
                    onClick={() => setCurrentView('registration')}
                    style={{
                        ...styles.navButton,
                        ...(currentView === 'registration' ? styles.navButtonActive : {})
                    }}
                >
                    Câu 1: Form đăng ký
                </button>
                <button
                    onClick={() => setCurrentView('todolist')}
                    style={{
                        ...styles.navButton,
                        ...(currentView === 'todolist' ? styles.navButtonActive : {})
                    }}
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