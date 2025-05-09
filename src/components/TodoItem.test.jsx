import { render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import userEvent from '@testing-library/user-event';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('Чекбокс в положении true, если cmpleted=true', () => {
    render(
      <TodoItem
        todo={{ ...mockTodo, completed: true }}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('Вызывает onToggle при клике на чекбокс', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    await userEvent.click(screen.getByTestId("toggle-1"));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('Вызывает onDelete при клике на кнопку Delete', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    await userEvent.click(screen.getByTestId("delete-1"));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});