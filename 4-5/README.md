# 4/5
Как посмотреть:
 - скачать
 - установить зависимости ( `npm i` )
 - запустить ( `node index` )
 - открыть [http://localhost:3001](http://localhost:3001)
 - открыть консоль

## API
Весь основной код в файле `/public/main.js`

| api | описание  |
|--|--|
| `FrameStorage(frame)` | класс, принимает iframe, возвращает экземпляр привязанный к iframe |
| `frameStorage.write(callback | null, key, value)` | метод, производит запись в localStorage ifame. Аргументы: 1) callback или null - вызывается после записи, получает объект со свойствами status ('done' или 'error'), id, key, value, type ('write', 'read' или 'delete'), 2) key - ключ для localStorage, 3) value - значение для localStorage|
| `frameStorage.read(callback | null, key)` | аналогично методу write |
| `frameStorage.delete(callback | null, key)` | аналогично методу write |
| `localStorageHandler(data)` | функция, вызывается на стороне iframe, принимает event.data из onmessage события |
