///  Modern JavaScript tutorial  ///

// При создании примитивного значения типа 5 мы получаем число, когда мы хотим получить доступ к свойства создаётся временный ОБЪЕКТ-обёртка
// с использованием встроенного конструктора  number, предоставит методы.

// 8.1 Прототипное наследование

// Прототипное наследование — это возможность языка, которая помогает  создать новый объект на оснвое другого.
// В JavaScript объекты имеют специальное скрытое свойство [[Prototype]] (так оно названо в спецификации),
// которое либо равно null, либо ссылается на другой объект. Этот объект называется «прототип»
// Когда мы хотим прочитать свойство из object, а оно отсутствует, JavaScript автоматически берёт его из прототипа.
//  В программировании такой механизм называется «прототипным наследованием».
//   Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
//   Обратите внимание, что __proto__ — не то же самое, что [[Prototype]]. Это геттер/сеттер для него.
//   let animal = {
//     eats: true
//   };
//   let rabbit = {
//     jumps: true
//   };
//   rabbit.__proto__ = animal; // (*)
//   // теперь мы можем найти оба свойства в rabbit:
//   alert( rabbit.eats ); // true (**)
//   alert( rabbit.jumps ); // true
//   Здесь строка (*) устанавливает animal как прототип для rabbit.
//   Затем, когда alert пытается прочитать свойство rabbit.eats (**), его нет в rabbit,
//   поэтому JavaScript следует по ссылке [[Prototype]] и находит его в animal (смотрите снизу вверх):
//   Здесь мы можем сказать, что "animal является прототипом rabbit" или "rabbit прототипно наследует от animal".

//   Есть  два ограничения:
// Ссылки не могут идти по кругу. JavaScript выдаст ошибку, если мы попытаемся назначить __proto__ по кругу.
// Значение __proto__ может быть объектом или null. Другие типы игнорируются.
// Это вполне очевидно, но всё же: может быть только один [[Prototype]]. Объект не может наследоваться от двух других объектов.

// Операция записи не использует прототип
// Прототип используется только для чтения свойств.
// Операции записи/удаления работают напрямую с объектом.
// Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером. То есть, это, фактически, вызов функции.

// Операция записи не использует прототип НЕ ПРОЙДЕНО НЕ ПРОЙДЕНО НЕ ПРОЙДЕНО

// Значение «this»
// Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.

// Цикл for…in
// Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта.
// Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи встроенного метода obj.hasOwnProperty(key)
// : он возвращает true, если у obj есть собственное, не унаследованное, свойство с именем key.
// Почти все остальные методы получения ключей/значений игнорируют унаследованные свойства
// Почти все остальные методы, получающие ключи/значения, такие как Object.keys, Object.values и другие – игнорируют унаследованные свойства.
// Они учитывают только свойства самого объекта, не его прототипа.

// Итого
// В JavaScript все объекты имеют скрытое свойство [[Prototype]], которое является либо другим объектом, либо null.
// Мы можем использовать obj.__proto__ для доступа к нему (исторически обусловленный геттер/сеттер,
//      есть другие способы, которые скоро будут рассмотрены).
// Объект, на который ссылается [[Prototype]], называется «прототипом».
// Если мы хотим прочитать свойство obj или вызвать метод, которого не существует у obj, тогда JavaScript попытается найти его в прототипе.
// Операции записи/удаления работают непосредственно с объектом, они не используют прототип (если это обычное свойство, а не сеттер).
// Если мы вызываем obj.method(), а метод при этом взят из прототипа, то this всё равно ссылается на obj.
// Таким образом, методы всегда работают с текущим объектом, даже если они наследуются.
// Цикл for..in перебирает как свои, так и унаследованные свойства. Остальные методы получения ключей/значений
// работают только с собственными свойствами объекта.

// 8.2 F.prototype

// Как мы помним, новые объекты могут быть созданы с помощью функции-конструктора new F().
// Если в F.prototype содержится объект, оператор new устанавливает его в качестве [[Prototype]] для нового объекта.
// Обратите внимание, что F.prototype означает обычное свойство с именем "prototype" для F.
// Это ещё не «прототип объекта», а обычное свойство F с таким именем.
// Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее:
// "При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]".

// F.prototype по умолчанию, свойство constructor
// У каждой функции по умолчанию уже есть свойство "prototype".
// По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
// самое важное о свойстве "constructor" это то, что…
// …JavaScript сам по себе не гарантирует правильное значение свойства "constructor".
// Итого
// В этой главе мы кратко описали способ задания [[Prototype]] для объектов, создаваемых с
// помощью функции-конструктора. Позже мы рассмотрим, как можно использовать эту возможность.
// Всё достаточно просто. Выделим основные моменты:
// Свойство F.prototype (не путать с [[Prototype]]) устанавливает[[Prototype]] для новых объектов при вызове new F().
// Значение F.prototype должно быть либо объектом, либо null. Другие значения не будут работать.
// Свойство "prototype" является особым, только когда оно назначено функции-конструктору, которая вызывается оператором new.
// В обычных объектах prototype не является чем-то особенным:
// let user = {
//   name: "John",
//   prototype: "Bla-bla" // никакой магии нет - обычное свойство
// };
// По умолчанию все функции имеют F.prototype = { constructor: F }, поэтому мы можем получить конструктор объекта через свойство "constructor".

// 8.3 Встроенные прототипы

// Object.prototype;
// краткая нотация obj = {} – это то же самое, что и obj = new Object(), где Object – встроенная функция-конструктор
// для объектов с собственным свойством prototype, которое ссылается на огромный объект с методом toString и другими.

// Другие встроенные прототипы
// Примитивы
// Самое сложное происходит со строками, числами и булевыми значениями.
// Как мы помним, они не объекты. Но если мы попытаемся получить доступ к их свойствам, то тогда будет создан временный
// объект-обёртка с использованием встроенных конструкторов String, Number и Boolean, который предоставит методы и после этого исчезнет.
// Значения null и undefined не имеют объектов-обёрток

// Изменение встроенных прототипов
// Встроенные прототипы можно изменять. Например, если добавить метод к String.prototype, метод становится доступен для всех строк:
// String.prototype.show = function() {
//   alert(this);
// };
// "BOOM!".show(); // BOOM! Это плохая идея.
// Важно:
// Прототипы глобальны, поэтому очень легко могут возникнуть конфликты.
// Если две библиотеки добавляют метод String.prototype.show, то одна из них перепишет метод другой.
// Так что, в общем, изменение встроенных прототипов считается плохой идеей.
// Так что, в общем, изменение встроенных прототипов считается плохой идеей.
// В современном программировании есть только один случай, в котором одобряется изменение встроенных прототипов. Это создание полифилов.
// Полифил – это термин, который означает эмуляцию метода, который существует в спецификации JavaScript,
// но ещё не поддерживается текущим движком JavaScript.
// Заимствование у прототипов
// Итого
// Все встроенные объекты следуют одному шаблону:
// Методы хранятся в прототипах (Array.prototype, Object.prototype, Date.prototype и т.д.).
// Сами объекты хранят только данные (элементы массивов, свойства объектов, даты).
// Примитивы также хранят свои методы в прототипах объектов-обёрток: Number.prototype, String.prototype,
// Boolean.prototype. Только у значений undefined и null нет объектов-обёрток.
// Встроенные прототипы могут быть изменены или дополнены новыми методами. Но не рекомендуется менять их.
// Единственная допустимая причина – это добавление нового метода из стандарта, который ещё не поддерживается движком JavaScript.

// 8.4 Методы прототипов, объекты без свойства __proto__

// Современные методы это:
// Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto,
//  и необязательными дескрипторами свойств descriptors.
// Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
// Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.
// let animal = {
//     eats: true
//   };
//   // создаём новый объект с прототипом animal
//   let rabbit = Object.create(animal);
//   alert(rabbit.eats); // true
//   alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit
//   Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}

//   "Простейший" объект

//   Итого
// Современные способы установки и прямого доступа к прототипу это:

// Object.create(proto[, descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto
// (может быть null), и необязательными дескрипторами свойств.
// Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj (то же самое, что и геттер __proto__).
// Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto (то же самое, что и сеттер __proto__).
// Встроенный геттер/сеттер __proto__ не безопасен, если мы хотим использовать созданные
// пользователями ключи в объекте. Как минимум потому, что пользователь может ввести "__proto__"
// как ключ, от чего может возникнуть ошибка. Если повезёт – последствия будут лёгкими, но, вообще говоря, они непредсказуемы.
// Так что мы можем использовать либо Object.create(null) для создания «простейшего» объекта, либо использовать коллекцию Map.
// Кроме этого, Object.create даёт нам лёгкий способ создать поверхностную копию объекта со всеми дескрипторами:
// let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
// Мы также ясно увидели, что __proto__ – это геттер/сеттер для свойства [[Prototype]], и находится он в Object.prototype, как и другие методы.
// Мы можем создавать объекты без прототипов с помощью Object.create(null). Такие объекты можно
//  использовать как «чистые словари», у них нет проблем с использованием строки "__proto__" в качестве ключа.
// Ещё методы:
// Object.keys(obj) / Object.values(obj) / Object.entries(obj) – возвращают массив всех
// перечисляемых собственных строковых ключей/значений/пар ключ-значение.
// Object.getOwnPropertySymbols(obj) – возвращает массив всех собственных символьных ключей.
// Object.getOwnPropertyNames(obj) – возвращает массив всех собственных строковых ключей.
// Reflect.ownKeys(obj) – возвращает массив всех собственных ключей.
// obj.hasOwnProperty(key): возвращает true, если у obj есть собственное (не унаследованное) свойство с именем key.
// Все методы, которые возвращают свойства объектов (такие как Object.keys и другие), возвращают
// «собственные» свойства. Если мы хотим получить и унаследованные, можно воспользоваться циклом for..in.
