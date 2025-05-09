import { http, HttpResponse } from 'msw';
import { API_URL } from '../api/todosApi';

export const handlers = [
  http.get(API_URL, async () => {
    return HttpResponse.json([
        { id: 1, text: 'Mocked todo', completed: false }
      ])
  }),
  // Добавьте другие моки API по аналогии
];