import React, { useState } from 'react';
import '../styles/TodoList.css';
import {ButtonWithLoading, LoadingBar} from "./loading";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
                                               todo,
                                               onToggleComplete,
                                               onDelete,
                                               onEdit
                                           }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(todo.text);
    const [loading, setLoading] = useState(false);
    const [barLoading, setBarLoading] = useState(false);

    const startEdit = (): void => {
        setIsEditing(true);
        setEditValue(todo.text);
    };

    const saveEdit = (): void => {
        if (editValue.trim() !== '') {
            onEdit(todo.id, editValue.trim());
        }
        setLoading(true);
        setBarLoading(true);
        setTimeout(() => {
            setLoading(false);
            setBarLoading(false);
            alert("Đã sửa thành công!");
            setIsEditing(false);
        }, 2000);

    };

    const cancelEdit = (): void => {
        setIsEditing(false);
        setEditValue(todo.text);
    };

    const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    return (
        <>
            <LoadingBar isLoading={barLoading} />
            <div className="todo-item">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleComplete(todo.id)}
                    className="checkbox"
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        className="edit-input"
                        autoFocus
                    />
                ) : (
                    <span className={`todo-text ${todo.completed ? 'todo-text-completed' : ''}`}>
                    {todo.text}
                </span>
                )}

                <div className="action-buttons">
                    {isEditing ? (
                        <>
                            <ButtonWithLoading
                                onClick={saveEdit}
                                loading={loading}
                                className="action-button save-button"
                            >
                                Lưu
                            </ButtonWithLoading>
                            <button
                                onClick={cancelEdit}
                                className="action-button cancel-button"
                            >
                                Hủy
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={startEdit}
                                className="action-button edit-button"
                            >
                                Sửa
                            </button>
                            <button
                                onClick={() => onDelete(todo.id)}
                                className="action-button delete-button"
                            >
                                Xóa
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>

    );
};

export default TodoItem;