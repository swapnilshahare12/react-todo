import React, { Component } from 'react';
import deleteIcon from './assets/delete.png';
import pencilIcon from './assets/pencil.png';

export default class TodoList extends Component {
  state = {
    todos: [],
    value: '',
    editingId: null,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleAddTodo = (event) => {
    event.preventDefault();
    if (this.state.value.trim()) {
      const newTodo = { id: Date.now(), name: this.state.value };
      this.setState((prevState) => ({
        todos: [...prevState.todos, newTodo],
        value: '',
      }));
    }
  };

  handleDeleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  handleEditTodo = (event, todoId) => {
    event.preventDefault();
    const newValue = event.target.todoValue.value.trim();
    if (newValue) {
      this.setState((prevState) => ({
        todos: prevState.todos.map((todo) =>
          todo.id === todoId ? { ...todo, name: newValue } : todo
        ),
        editingId: null,
      }));
    }
  };

  render() {
    const { todos, value, editingId } = this.state;

    return (
      <div>
        <form onSubmit={this.handleAddTodo}>
          <input
            type='text'
            placeholder='Type your task'
            value={value}
            onChange={this.handleChange}
          />
          <button type='submit'>+ADD TASK</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <form onSubmit={(e) => this.handleEditTodo(e, todo.id)}>
                  <input
                    type='text'
                    name='todoValue'
                    defaultValue={todo.name}
                  />
                  <button type='submit'>UPDATE</button>
                </form>
              ) : (
                <div>
                  <span>{todo.name}</span>
                  <button onClick={() => this.setState({ editingId: todo.id })}>
                    <img src={pencilIcon} alt='edit' id='pencilicon'/>
                  </button>
                  <button onClick={() => this.handleDeleteTodo(todo.id)}>
                    <img src={deleteIcon} alt='delete' id='deleteicon'/>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
