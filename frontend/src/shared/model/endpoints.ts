export const API_ENDPOINTS = {
  // Авторизация и регистрация
  AUTH: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    CURRENT: '/user/current',
    REFRESH_ACCESS_TOKEN: '/user/refreshAccessToken',
  },

  // Канбан доски
  BOARDS: {
    GET_ALL_USER_BOARDS: '/board/getAllUserBoards',
    GET_BY_ID: '/board/getBoardById',
    CREATE: '/board/createBoard',
    UPDATE: '/board/updateBoard',
    DELETE: '/board/deleteBoard',
  },

  // Категории
  CATEGORIES: {
    GET_ALL_WITH_TASKS_BY_BOARD_ID: '/category/getAllCategoriesWithTasksByBoardId',
    CREATE: '/category/createCategory',
    UPDATE: '/category/updateCategory',
    DELETE: '/category/deleteCategory',
  },

  // Задания
  TASKS: {
    GET_ALL_BY_CATEGORY_ID: '/task/getAllTasksByCategoryId',
    CREATE: '/task/createTask',
    UPDATE: '/task/updateTask',
    DELETE: '/task/deleteTask',
  },
};