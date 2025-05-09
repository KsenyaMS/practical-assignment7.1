import { render, screen, waitFor } from '@testing-library/react';
import TodoList from './TodoList';
import Filter from './Filter';
import * as api from '../api/todosApi';
import { server } from '../mocks/servers';
import App from '../App';
import userEvent from '@testing-library/user-event';

const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Список задач корректно отображает переданные задачи", async () => {
    render(<App />);

    await waitFor(() => {
        expect(screen.getByText('Mocked todo'));
    });
});

describe("Изменение статуса задачи", () => {
    it("Для варианта отображения списка all", async () => {
        render(<App />);

        await waitFor(async () => {
            expect(screen.getByTestId('filter-all')).toHaveClass('active');

            await userEvent.click(screen.getByTestId("toggle-1"));
            expect(screen.getByText('Mocked todo'));
        });
    });

    it("Для варианта отображения списка active", async () => {
        render(<App />);

        await waitFor(async () => {
            await userEvent.click(screen.getByTestId('filter-active'));
            expect(screen.getByTestId('filter-active')).toHaveClass('active');

            await userEvent.click(screen.getByTestId("toggle-1"));
            expect(screen.getByText('No todos found'));
        });
    });

    it("Для варианта отображения списка completed", async () => {
        render(<App />);

        await waitFor(async () => {
            await userEvent.click(screen.getByTestId('filter-all'));
            await waitFor(async () => {
                await userEvent.click(screen.getByTestId("toggle-1"));
                await userEvent.click(screen.getByTestId('filter-completed'));
                expect(screen.getByTestId('filter-completed')).toHaveClass('active');

                await waitFor(async () => {
                    await userEvent.click(screen.getByTestId("toggle-1"));
                    expect(screen.getByText('No todos found'));
                });
            });
        });
    });
});

test("При загрузке страницы, задачи подгружаются с API", async () => {
    api.getTodos = jest.fn().mockResolvedValue([
        { id: 1, text: 'Mocked todo123', completed: false }
    ]);

    render(<App />);

    await waitFor(() => {
        expect(screen.getByText('Mocked todo123'));
    });
});

test("Добавление новой задачи отправляет запрос к API", async () => {
    api.addTodo = jest.fn().mockResolvedValue({ id: 2, text: 'Новая задача321', completed: false });

    render(<App />);

    await waitFor(async () => {
        await userEvent.type(screen.getByTestId("todo-input"), "Новая задача321");
        await userEvent.click(screen.getByTestId("add-button"));


        waitFor(() => {
            expect(api.addTodo).toHaveBeenCalledWith("Новая задача321");
            expect(screen.getByText('Новая задача321'));
        })
    });
});