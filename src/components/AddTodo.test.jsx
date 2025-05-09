import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from './AddTodo';

describe('AddTodo', () => {

    const mockOnSubmit = jest.fn();

    it('Инпут заполняется данными', async () => {
        render(
            <AddTodo
                onAdd={mockOnSubmit}
            />
        );

        await userEvent.type(screen.getByTestId("todo-input"), "Новая задача");

        expect(screen.getByTestId("todo-input")).toHaveValue("Новая задача");
    });

    it('Форма отправляется с корректными данными', async () => {
        render(
            <AddTodo
                onAdd={mockOnSubmit}
            />
        );

        await userEvent.type(screen.getByTestId("todo-input"), "Новая задача");
        await userEvent.click(screen.getByTestId("add-button"));

        expect(mockOnSubmit).toHaveBeenCalledWith("Новая задача");
    });

    it('Инпут очищается после отправки формы', async () => {
        render(
            <AddTodo
                onAdd={mockOnSubmit}
            />
        );

        await userEvent.type(screen.getByTestId("todo-input"), "Новая задача");
        await userEvent.click(screen.getByTestId("add-button"));

        expect(screen.getByTestId("todo-input")).not.toHaveValue();
    });
});