# Приложение "Список Собеседований"

## Описание

Этот проект - это Vue.js приложение, разработанное для помощи пользователям в отслеживании процесса прохождения собеседований. Он позволяет добавлять новые возможности для собеседований, отслеживать прогресс на различных этапах, записывать результаты (предложение о работе или отказ) и просматривать статистику по результатам собеседований. Приложение использует Firebase для аутентификации и хранения данных, а Pinia для управления состоянием. PrimeVue используется в качестве UI-библиотеки.

## Функциональность

- **Аутентификация:** Пользователи могут создавать учетные записи и входить в систему, используя Firebase Authentication.

- **CRUD-операции для собеседований:**

  - Пользователи могут добавлять новые записи о собеседованиях с подробностями, такими как название компании, ссылка на вакансию, контактная информация HR и диапазон заработной платы.
  - Пользователи могут просматривать список всех своих собеседований.
  - Пользователи могут редактировать существующие записи о собеседованиях, чтобы обновить сведения или добавить/изменить этапы собеседования.
  - Пользователи могут удалять записи о собеседованиях.

- **Отслеживание этапов собеседования:** Пользователи могут добавлять и отслеживать несколько этапов для каждого собеседования, включая название этапа, дату и описание.

- **Запись результата:** Пользователи могут записывать результат собеседования как "Предложение о работе" или "Отказ".

- **Статистика:** Приложение предоставляет визуальное представление результатов собеседований, показывая количество предложений о работе, отказов и собеседований в процессе.

- **Фильтрация:** Список собеседований можно фильтровать по результату собеседования (Предложение о работе/Отказ).

## Технологии

- **Vue.js:** Прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов.
- **Vue Router:** Официальный роутер для Vue.js.
- **Pinia:** Интуитивно понятное, типобезопасное и гибкое хранилище для Vue.
- **Firebase:** Комплексная платформа для создания веб- и мобильных приложений. Предоставляет:
  - **Authentication:** Для регистрации и входа пользователей.
  - **Firestore:** NoSQL база данных документов для хранения данных о собеседованиях.
- **PrimeVue:** Библиотека UI-компонентов для Vue.js, предоставляющая богатый набор готовых компонентов.
- **Vite:** Инструмент сборки, целью которого является обеспечение более быстрой и простой разработки современных веб-проектов.
- **Typescript**: Надстройка над JavaScript, которая в основном предоставляет статическую типизацию, классы и интерфейсы.
- **uuid**: Библиотека для генерации уникальных идентификаторов.
- **Vercel**: Для развертывания.

## Структура проекта

```bash
├── .vscode # Файлы конфигурации VS Code
├── node_modules # Зависимости Node.js
├── public # Общедоступные ресурсы (например, favicon)
├── src # Каталог исходного кода
│ ├── assets # CSS и другие ресурсы
│ │ └── main.css # Глобальные стили
│ ├── components # Переиспользуемые Vue-компоненты
│ │ └── AppHeader.vue # Компонент заголовка приложения
│ ├── router # Конфигурация Vue Router
│ │ └── index.ts # Конфигурация роутера
│ ├── stores # Хранилище Pinia
│ │ └── user.ts # Хранилище пользователя
│ ├── views # Vue-компоненты для разных страниц
│ │ ├── PageAuth.vue # Страница аутентификации
│ │ ├── PageHome.vue # Домашняя страница (добавить собеседование)
│ │ ├── PageInterview.vue # Страница деталей собеседования
│ │ ├── PageList.vue # Страница списка собеседований
│ │ └── PageStatistic.vue # Страница статистики
│ ├── App.vue # Корневой компонент
│ ├── components.d.ts # Определение типов глобальных компонентов
│ ├── interfaces.ts # Интерфейсы TypeScript
│ ├── main.ts # Точка входа приложения
│ ├── shims-vue.d.ts # Определения типов Vue
│ └── vite-env.d.ts # Определения типов среды Vite
├── .gitignore # Указывает Git, какие файлы игнорировать
├── index.html # Точка входа HTML
├── package-lock.json # Записывает точные версии зависимостей
├── package.json # Метаданные проекта и зависимости
├── README.md # Описание проекта и инструкции
├── tsconfig.app.json # Конфигурация TypeScript для приложения
├── tsconfig.json # Конфигурация TypeScript
├── tsconfig.node.json # Конфигурация TypeScript для Node.js
└── vite.config.ts # Файл конфигурации Vite
```

## Компоненты

1. **AppHeader.vue**
   Компонент заголовка, который отображает элементы меню в зависимости от статуса аутентификации пользователя. Он использует `vue-router` для навигации и `firebase/auth` для функции выхода из системы. Элементы меню зависят от того, вошел ли пользователь в систему или нет.

2. **PageAuth.vue**
   Этот компонент обрабатывает аутентификацию пользователя (вход/регистрацию) с помощью Firebase. Использует `primevue/usetoast` для отображения сообщений об ошибках.

3. **PageHome.vue**
   Позволяет пользователям добавлять новые записи о собеседованиях. Использует `firebase/firestore` для хранения данных и генерирует уникальные идентификаторы с помощью `uuid`. `primevue/usetoast` используется для отображения сообщений об успехе/ошибке.

4. **PageInterview.vue**
   Отображает подробности об одном собеседовании и позволяет пользователям редактировать информацию и добавлять/удалять этапы собеседования. Использует `firebase/firestore` для получения и обновления данных о собеседовании. Обработка дат для этапов выполняется с использованием `Timestamp` из Firebase.

5. **PageList.vue**
   Отображает список всех собеседований с возможностью фильтрации по результату собеседования (Предложение о работе/Отказ). Использует `firebase/firestore` для получения и удаления данных. Также использует `primevue/useconfirm` для подтверждения действий по удалению.

6. **PageStatistic.vue**
   Представляет круговую диаграмму, визуализирующую результаты собеседований (Предложение, Отказ, В процессе). Использует `firebase/firestore` для получения данных и `chart.js` для создания диаграммы.

## Инструкции по настройке

1.  **Клонируйте репозиторий:**

```bash
git clone <repository_url>
```

2.  **Установите зависимости:**

```bash
npm install
```

3.  **Настройте Firebase:**

- Создайте проект Firebase в консоли Firebase ([https://console.firebase.google.com/](https://console.firebase.google.com/)).
- Включите аутентификацию и Firestore в своем проекте Firebase.
- Замените заполнитель конфигурации Firebase в `src/main.ts` конфигурацией вашего проекта:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

4.  **Запустите приложение:**

```bash
npm run dev
```

Это запустит сервер разработки и откроет приложение в вашем браузере.

## Развертывание

Проект включает файл `vercel.json` для легкого развертывания на Vercel. Вы также можете развернуть его на других платформах, но вам может потребоваться изменить конфигурацию.
