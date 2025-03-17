
# Kanban-board(ToDo)

## Описание

Это веб-приложение представляет собой Kanban доску, предназначенную для управления задачами и проектами. Оно позволяет пользователям организовывать свою работу с помощью визуального интерфейса, который упрощает отслеживание и управление задачами.

## Основные функции

### 1. Создание аккаунта
Пользователи могут зарегистрироваться и создать свой собственный аккаунт. Это позволяет сохранять данные о досках, категориях и задачах, а также обеспечивает доступ к личным настройкам и возможности управления своими проектами.

### 2. Создание досок
После регистрации пользователи могут создавать различные доски для организации своих проектов. Каждая доска может быть настроена в соответствии с потребностями пользователя и может содержать множество категорий и задач.

### 3. Добавление категорий
Внутри каждой доски пользователи могут добавлять категории. Эти категории помогают структурировать задачи и организовать их по определенным темам или этапам. Например, категории могут представлять различные стадии проекта, такие как "Запланировано", "В процессе" и "Завершено".

### 4. Создание заданий
В каждой категории пользователи могут создавать задания. Каждое задание содержит название, тип работы, описание, сроки выполнения, которые помогут пользователю эффективно управлять своим временем и задачами. Задания могут быть перетаскиваемыми между категориями, что позволяет легко менять их статус.

## Технологический стек
- **Frontend**:<br>
  [![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.design/)<br>
  [![Vite][shields-vite-domain]](https://vitejs.dev/)<br>
  [![Sass][shields-sass-domain]](https://sass-scss.ru/)<br>
  [![React][shields-react-domain]](https://react.dev/)<br>
  [![TypeScript][shields-typescript-domain]](https://www.typescriptlang.org/)<br>
  [![React Router][shields-react-router-domain]](https://reactrouter.com/)<br>
  [![Redux Toolkit][shields-redux-domain]](https://redux-toolkit.js.org/)<br>
  [![React-dnd][shields-react-dnd-domain]](https://react-dnd.github.io/react-dnd/about)<br>
  [![Ant Design][shields-antd-domain]](https://ant.design/)<br>




[shields-react-router-domain]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[shields-typescript-domain]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=
[shields-vite-domain]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[shields-react-domain]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[shields-redux-domain]: https://img.shields.io/badge/redux_toolkit-%2320232a.svg?style=for-the-badge&logo=redux&logoColor=%764abc
[shields-sass-domain]: https://img.shields.io/badge/sass-F2F2F2?style=for-the-badge&logo=sass
[shields-react-dnd-domain]: https://img.shields.io/badge/React_DnD-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white
[shields-antd-domain]: https://img.shields.io/badge/Ant_Design-%230E1F3D.svg?style=for-the-badge&logo=antd&logoColor=white

- **Backend**:<br>
  [![Node.js][shields-node-domain]](https://nodejs.org/)<br>
  [![Express][shields-express-domain]](https://expressjs.com/)<br>
  [![Prisma][shields-prisma-domain]](https://www.prisma.io/)<br>
  [![SQLite][shields-sqlite-domain]](https://www.sqlite.org/)

[shields-node-domain]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[shields-express-domain]: https://img.shields.io/badge/Express-404D59?style=for-the-badge&logo=express&logoColor=white
[shields-prisma-domain]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[shields-sqlite-domain]: https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white

## Запуск проекта локально
1. Установите все необходимые зависимости
   Выполните команду:
```bash
npm run install-all
```
2. Настройте переменные окружения
```
Измените файл в папке backend с именем .example.env на .env.
```
3. Запустите проект
   Выполните команду:
```bash
npm run dev
```