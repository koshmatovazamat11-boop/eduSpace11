# EduSpace — GitHub Pages Ready

Адаптивный демонстрационный образовательный сайт на HTML, CSS и JavaScript.

## Публикация на GitHub Pages

1. Создай **Public** репозиторий на GitHub.
2. Скачай и распакуй ZIP.
3. Открой распакованную папку и выдели **все файлы внутри неё**.
4. В репозитории нажми **Add file → Upload files** и перетащи туда выделенные файлы.
5. Убедись, что `index.html`, `style.css` и `app.js` видны прямо на главной странице репозитория (не внутри вложенной папки).
6. Нажми **Commit changes**.
7. Открой **Settings → Pages**.
8. Выбери **Deploy from a branch**, branch `main`, folder `/(root)`, затем **Save**.
9. Открой адрес сайта, который появится в Settings → Pages. Дождись завершения публикации в **Actions**.

## Структура

```text
repository-root/
├── index.html
├── style.css
├── app.js
├── README.md
├── USER_FLOW.md
├── USABILITY_HEURISTICS.md
└── LICENSE-NOTE.txt
```

## Важно

В ZIP файлы лежат прямо в корне архива. Не загружай в GitHub сам ZIP и не помещай содержимое во вложенную папку. Главный файл называется строго `index.html`. CSS и JavaScript подключены относительными путями `./style.css` и `./app.js`, поэтому работают и на GitHub Pages с адресом вида `username.github.io/repository/`.

Это front-end демо: имя профиля, задачи, заметки и тема сохраняются в `localStorage` текущего браузера. Настоящая регистрация, защищённая авторизация, серверная база данных и синхронизация между устройствами не реализованы.
