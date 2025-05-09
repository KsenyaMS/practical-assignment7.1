describe("Добавление задачи", () => {
  it("Пользователь открывает приложение", () => {
    cy.visit("/");
  });
  it("Пользователь вводит название задачи и нажимает 'Добавить'", () => {
    cy.visit("/");
    cy.get('[data-testid="todo-input"]').type("Задача для тестирования");
    cy.get('[data-testid="add-button"]').click();
    cy.contains("Задача для тестирования").should("be.visible");
  });
});

describe("Удаление задачи", () => {
  it("Пользователь удаляет задачу", () => {
    cy.visit("/");
    cy.get('[data-testid="todo-input"]').type("Новая задача");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="delete-3"]').click();
    cy.contains("Новая задача").should('not.exist');
  });
});

describe("Фильтрация задач", () => {

  it("Пользователь переключает на табу 'all'", () => {
    cy.visit("/");
    cy.get('[data-testid="todo-input"]').type("Новая задача1");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').type("Новая задача2");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').type("Новая задача3");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="toggle-5"]').click();

    cy.get('[data-testid="filter-all"]').click();
    cy.contains("Новая задача1").should("be.visible");
    cy.contains("Новая задача2").should("be.visible");
    cy.contains("Новая задача3").should("be.visible");
  });

  it("Пользователь переключает на табу 'active'", () => {
    cy.visit("/");
    cy.get('[data-testid="todo-input"]').type("Новая задача1");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').type("Новая задача2");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').type("Новая задача3");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="toggle-5"]').click();

    cy.get('[data-testid="filter-active"]').click();
    cy.contains("Новая задача1").should("be.visible");
    cy.contains("Новая задача2").should("be.visible");
    cy.contains("Новая задача3").should('not.exist');
  });

  it("Пользователь переключает на табу 'completed'", () => {
    cy.visit("/");
    cy.get('[data-testid="todo-input"]').type("Новая задача1");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').type("Новая задача2");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="todo-input"]').type("Новая задача3");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="toggle-5"]').click();

    cy.get('[data-testid="filter-completed"]').click();
    cy.contains("Новая задача1").should('not.exist');
    cy.contains("Новая задача2").should('not.exist');
    cy.contains("Новая задача3").should("be.visible");
  });
});