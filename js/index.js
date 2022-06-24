// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22},
  {"kind": "Тестовый фрукт не видимый", "color": "желтый"},
  {"kind": "Тестовый фрукт видимый", "color": "желтый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = [];

// Создан метод получения базовой версии модели с фруктами.
const getData = () => fruits = JSON.parse(fruitsJSON);

getData();


/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  // Производим очистку контента
  fruitsList.innerText = '';

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    // При помощи дестректуризации объекта получим его параметры kind, color и weight в виде констант.
    const {kind = '', color = '', weight = ''} = fruits[i];

    // Добавлена проверка пораметров, если какой-либо из параметров не будет передан, то данных фрукт будет игнорироваться.
    // К примеру в базовый JSON добавлены 2 тестовых фрукта, фрукт с индексом 5 не будет выводиться в системе, а 6 будет.
    if (kind && color && weight) {

      // Создадим корневой элемент li и присвоим ему соответствующие классы. 
      // Класс цвета зависит от цвета фрукта.
      const fruitLiItem = document.createElement('li');
      fruitLiItem.classList.add('fruit__item');
      fruitLiItem.classList.add(getColorClass(color));

      // Создадим контейнер ИНФО для отображения информации по фрукту.
      const fruitInfoBlock = document.createElement('div');
      fruitInfoBlock.classList.add('fruit__info');

      // Создадим контейнер с индексом фрукта в массиве, и добавим его в контейнер ИНФО.
      const fruitIndexDiv = document.createElement('div');
      fruitIndexDiv.appendChild(document.createTextNode(`index: ${i}`));
      fruitInfoBlock.appendChild(fruitIndexDiv);

      // Создадим контейнер с данными по названию фрукта, и добавим его в контейнер ИНФО.
      const fruitKindDiv = document.createElement('div');
      fruitKindDiv.appendChild(document.createTextNode(`kind: ${kind}`));
      fruitInfoBlock.appendChild(fruitKindDiv);

      // Создадим контейнер с данными по цвету фрукта, и добавим его в контейнер ИНФО.
      const fruitColorDiv = document.createElement('div');
      fruitColorDiv.appendChild(document.createTextNode(`color: ${color}`));
      fruitInfoBlock.appendChild(fruitColorDiv);

      // Создадим контейнер с данными по весу фрукта, и добавим его в контейнер ИНФО.
      const fruitweightDiv = document.createElement('div');
      fruitweightDiv.appendChild(document.createTextNode(`weight (кг): ${weight}`));
      fruitInfoBlock.appendChild(fruitweightDiv);

      // Добавляем созданный Инфо контейнер в контейнер li
      fruitLiItem.appendChild(fruitInfoBlock);

      // Добавляем созданный li контейнер на страницу.
      fruitsList.appendChild(fruitLiItem);
      
    }
  }
};

const getColorClass = (color) => {
  switch (color) {
    case 'фиолетовый':
      result = 'fruit_violet';
      break;
    case 'зеленый':
      result = 'fruit_green';
      break;
    case 'розово-красный':
      result = 'fruit_carmazin';
      break;
    case 'желтый':
      result = 'fruit_yellow';
      break;
    case 'светло-коричневый':
      result = 'fruit_lightbrown';
      break;
    default:
      result = 'fruit_green';
      break;
  }
  return result;
}

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const etalon = fruits;

  // По мере исполнения цикла, элдлементы из массива fruits удаляются. так что массив в скором будет равен длине 0.
  while (fruits.length > 0) {
    // Получаем рандомный фрукт.
    const fruit = fruits[getRandomInt(0, fruits.length - 1)];
    // Добавляем наш рандомный фреукт к результативному массиву.
    result.push(fruit);
    // Перезаписываем массив fruits с вычетом полученного фрукта.
    // В теории нужен просто класс для описания данной структуры данных, и там реализовать метод сравнения.
    // На данный момент если название фрукта присутствует в массиве в нескольких экземплярах, то они все будет удалены.
    // Так же к данному объекту можно добавить UID для унификации данного елемента.
    fruits = fruits.filter(item => item['kind'] !== fruit['kind']);
  }

  // Переменная - флаг, позволяющая отследить изменен ли массив за последнюю итерацию перемешивания
  let isArrayNotChange = true;

  // Пробегаем массив, если натыкаемся на несовпадения в массиве, то опускаем флаг и выходим из массива.
  for (let i = 0; i < etalon.length; i++) {
    if (isArrayNotChange && etalon[i].kind !== result[i].kind) isArrayNotChange = false;
    if (!isArrayNotChange) break;
  }

  // Если после проверки флаг еще поднят, то выдаем сообщение пользователю в виде alert сообщения.
  if (isArrayNotChange) {
    alert('При операции перемешивания фруктов, массив не изменил своего состояния и расположения.<br>Поптробуйте перемешать массив повторно...');
  }

  // Записываем результат в массив fruits
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  // Получаем актуальные данные из JSON
  getData();

  // Получаем значения из инпутов MIN и MAX
  const minUserWeight = document.querySelector('.minweight__input').value,
        maxUserWeight = document.querySelector('.maxweight__input').value;

  // зададим границы минимума и максимума, если пользователь ни чего не ввел, то определим свои значения.
  const min = minUserWeight ? minUserWeight : 0;                    // Думал изначально использовать Number.MIN_VALUE, но это тут лишнее :-)
  const max = maxUserWeight ? maxUserWeight : Number.MAX_VALUE;     // То же лишнее, но пусть уж будет.

  fruits = fruits.filter((fruit) => {
    return +fruit.weight >= min && +fruit.weight <= max 
  });

};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// Проверяем равенстро строк в нижнем регистре. Так как при сравнении строк сравниваются номера символов, 
// номера символов в верхнем регистре отличаются от номеров нижнем регистре.
const comparationColor = (a, b) => {
  if (a.color.toLowerCase() !== b.color.toLowerCase())
    return a.color.toLowerCase() > b.color.toLowerCase();
  else
    return a.kind.toLowerCase() > b.kind.toLowerCase();
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // Получаем длину массива.
    const len = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < len - 1; i++) {
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < len - 1 - i; j++) {
        // сравнение эелеметонов цвета.
        if (comparation(arr[j], arr[j + 1])) {
          // меняем местаси элементы.
          const tmp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = tmp;
        }
        // Если текущий элемент не больше следующего, то пропускаем ход.
      }
    }
  }, 

  quickSort(arr, comparation) {

    // Метод помогающий поменять местами элементы массива.
    function swap(items, firstIndex, secondIndex) {
      const tmp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = tmp;
    }

    // Метод позволяющий выполнить итерацию проверки Пивота, Грыницы и Текущего елемента.
    function partition(items, left, right) {
      let pivot = items[Math.floor((right + left) / 2)];
      let i = left;
      let j = right;

      while (i <= j) {
          while (comparationColor(pivot, items[i])) {
              i++;
          }
          while (comparationColor(items[j], pivot)) {
              j--;
          }
          if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
          }
      }
      return i;
    }

    // реукурсивная функция для быстрой сортировки массива.
    function qs (items, left, right) {
      let index;

      if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        
        if (left < index - 1) {
          qs(items, left, index - 1);
        } 
        if (index < right) {
          qs(items, index, right);
        }
      }
    }

    qs(arr);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {

  sortTimeLabel.textContent = 'sorting...';

  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // получим данные из инпутов.
  const kind = kindInput.value,
        color = colorInput.value,
        weight = weightInput.value;

  // Проверим данные, если данных нет, то выведем сообщение alert
  if (!kind || !color || !weight) {
    alert('Для добавления фрукта в массив фруктов необходимо заполнить поля названия, цвета и веса для добавляемого фрукта.');
  } else {
    // В противном случае добавим новый фрукт в конец списка.
    fruits.push({
      "kind": kind,
      "color": color,
      "weight":weight
    });
    // Так же добавим изменения в исходный JSON (эмитация отправки на сервер)
    // При обновлении страницы с кешем, все изменения конечно же будут отменены.
    fruitsJSON = JSON.stringify(fruits);
    display();
  }
});
