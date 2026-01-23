import React, { useState } from "react";

// Simple ToDoアプリ
export default function App() {
    // todosの状態
    const [todos, setTodos] = useState([]);

    // 入力欄の状態
    const [input, setInput] = useState("");

    // フォーム送信時の処理
    function handleSubmit(e) {
        e.preventDefault();

        const trimmed = input.trim();
        if (trimmed === "") {
            return;
        }

        // 新しいToDoを作成
        const newToDo = {
            id: Date.now(), // 簡易的な一意ID
            text: trimmed,
            completed: false
        };

        // 先頭に追加
        setTodos([newToDo, ...todos]);

        // 入力欄をクリア
        setInput("");
    }

        // 完了状態の切り替え
        function toggledToDo(id) {
            setTodos(
                todos.map(todo =>
                    todo.id === id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            );
        }

        // ToDoの削除
        function deleteTodo(id) {
            setTodos(todos.filter(todo => todo.id !== id));
        }

        return(
            <div>
                {/* 新規 ToDo 入力フォーム */}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="What needs to be done?"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
                {/* ToDoリスト */}
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <div>
                                {/* 完了チェックボックス */}
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggledToDo(todo.id)}
                                />

                                {/* ToDoテキスト */}
                                <label
                                    style={{
                                        textDecorationLine: todo.completed
                                            ? "line-through"
                                            : "none"
                                    }}
                                >{todo.text}
                                </label>

                                {/* 削除ボタン */}
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        marginLeft: "8px"
                                    }}
                                    >
                                    ❌
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
}
