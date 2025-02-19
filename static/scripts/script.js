document.addEventListener("DOMContentLoaded", () => {
  const rangeSliderContainer = document.querySelector(".timeline-slider");
  const timelineDate = document.querySelector(".timeline-date");
  const leftDate = timelineDate.querySelector(".left-date");
  const rightDate = timelineDate.querySelector(".right-date");
  const timelineContent = document.querySelector(".timeline-content");

  const data = {
    "Июнь 1941": ["Начало ВОВ", "В войну против СССР вступают Румыния, Италия, Словакия, Финляндия и Венгрия", "Начало обороны Заполярья", "Начало Прибалтийской стратегической оборонительной операции", "Начало Белостокско-Минского сражения", "Создание Южного фронта"],
    "Июль 1941": ["Начало Ленинградской оборонительной операции", "Начало Смоленского сражения", "Создание Центрального и Резервного фронтов", "Начало Киевской оборонительной операции", "Завершение Прибалтийской стратегической оборонительной операции"],
    "Август 1941": ["Оборона Таллина", "Начало Ельнинской операции", "Начало обороны Одессы", "Начало Иранской операции"],
    "Сентябрь 1941": ["Начало Битвы за Москву", "Начало Сумско-Харьковской оборонительной операции", "Начало Донбасской оборонительной операции", "Начало блокады Ленинграда", "Завершение Ленинградской, Киевской оборонительных, Ельнинской, Иранской операций", "Завершение Смоленского сражения"],
    "Октябрь 1941": ["Начало Калининской оборонительной операции", "Начало обороны Севастополя", "Оставление Одессы", "Начало Тульской оборонительной операции", "Завершение оборон Заполярья и Одессы"],
    "Ноябрь 1941": ["Начало Тихвинской наступательной операции", "Начало Ростовской операции", "Начало Клинско-Солнечногорской операции", "Завершение Донбасской оборонительной, Сумско-Харьковской, операций"],
    "Декабрь 1941": ["Начало контрнаступления советских войск под Москвой", "Начало Керченско-Феодосийской и Калининской наступательной операций", "Завершение Тихвинской наступательной, Калининской, Клинско-Солнечногорской оборонительных, Ростовской операций"],
    "Январь 1942": ["Карельский фронт провёл Медвежьегорскую наступательную операцию", "Начало Любаньской, Торопецко-Холмской, Демянской, Ржевско-Вяземской, Болховской, Керченско-Феодосийской десантной операций", "Проведены Курско-Обоянская, Барвенковско-Лозовская операции", "Образование Крымского фронта", "Завершение Калининской наступательной операции"],
    "Февраль 1942": ["Взята в кольцо часть немецкой группы «Север»"],
    "Март 1942": ["Подписание советско-турецкого Договора о взаимном нейтралитете"],
    "Апрель 1942": ["Начало Кестеньгской операции", "Начало Мурманской операции", "Подписание пакта о нейтралитете между СССР и Японией", "Завершение Любаньской, Ржевско-Вяземской, Болховской операций"],
    "Май 1942": ["Проведена Харьковская операция", "Образование Сверо-Кавказского фронта", "Повторонное формирование Закавказского фронта", "Завершение Демянской, Керченско-Феодосийской десантной операций"],
    "Июнь 1942": ["Начало Воронежско-Ворошиловградской операции", "Подписание в Вашингтоне согласия между СССР и США о взаимной помощи во время войны и о сотрудничестве после войны"],
    "Июль 1942": ["Проведены Холм-Жирковская и Донбасской оборонительной операций", "Начало Первой Ржевско-Сычёвской, Северо-кавказской стратегической оборонительной операций", "Образование Воронежско фронта", "Приказ Народного комиссара обороны № 227 «Ни шагу назад»", "Завершение Воронежско-Ворошиловградской операции", "Завершение обороны Севастополя"],
    "Август 1942": ["Начало Синявинской операции", "Образование Юго-Восточного фронта", "В Сталинграде объявлено осадное положение", "Завершение Первой Ржевско-Сычёвской операции"],
    "Сентябрь 1942": ["Переименование Сталинградского фронта в Донской"],
    "Октябрь 1942": ["Указ об установлении полного единоначалия в армии и замене политкомиссаров заместителями командиров по политчасти", "Завершение Синявинской операции"],
    "Ноябрь 1942": ["Начало Великолукской, второй Ржевско-Сычёвской операций, операции «Уран»"],
    "Декабрь 1942": ["Проведены Среднедонская, Котельниковскую операции", "Завершение второй Ржевско-Сычёвской, Северо-кавказской стратегической оборонительной операций"],
    "Январь 1943": ["Проведена операция «Искра»", "Начало Северо-кавказской, Воронежско-Касторненской, Миллерово-Ворошиловградской, Ворошиловградской, Острогожско-Россошанской операций, операции «Кольцо»", "Завершение Великолукской наступательной операции", "Частичный прорыв блокады Ленинграда"],
    "Февраль 1943": ["Проведены Демянская, Ростовская операции", "Начало Харьковской наступательной, Малоархангельской, Севской, Краснодарской операций", "Завершение Острогожско-Россошанской, Воронежско-Касторненской, Миллерово-Ворошиловградской, Ворошиловградской, Северо-кавказской операций, операция «Кольцо»", "Расформирован Донской фронт", "Капитуляция генерал-фельдмаршала Паулюса и генерала Штрекера под Сталинградом"],
    "Март 1943": ["Проведены Старорусская, второй Ржевско-Вяземская, Харьковская оборонительная, Рыльско-Сумская операции", "Завершение Малоархангельской, Харьковской наступательной, Севской операций"],
    "Апрель 1943": ["Начало воздушных сражений на Кубани"],
    "Май 1943": ["Формирование первой польской дивизии имени Тадеуша Костюшко"],
    "Июнь 1943": ["Завершение воздушных сражений на Кубани"],
    "Июль 1943": ["Создание Степного фронта", "Сражение под Прохоровкой", "Проведена Изюм-Барвенковская операция", "Начало Курской стратегической оборонительной, Орловской стратегической наступательной, Миусской операций"],
    "Август 1943": ["Проведены Спас-Деменская, Белгородско-Харьковская операции", "Начало Смоленской, Ельнинско-Дорогобужской, Смоленско-Рославльской, Черниговско-Полтавской, Черниговско-Припятской, Сумско-Прилукской, Полтавско-Кременчугской, Донбасской операций", "Завершение Орловской стратегической наступательной, Миусской операции", "Начало битвы за Днепр"],
    "Сентябрь 1943": ["Начало Брянской, Днепровской воздушно-десантной, Нижнеднепровской, Мелитопольской, Новороссийско-Таманской операций", "Завершение Ельнинско-Дорогобужской, Черниговско-Полтавской, Черниговско-Припятской, Сумско-Прилукской, Полтавско-Кременчугской, Донбасской операций"],
    "Октябрь 1943": ["Проведены Невельская, Запорожская операции", "Начало Оршанской, Пятихатской, Днепропетровской, Керченско-Эльтигенской операций", "Завершение Смоленской, Смоленско-Рославльской, Брянской, Новороссийско-Таманской операций", "Калининской, Брянский, Центральный, Воронежсий, Степной, Юго-Западный, Южный фронты переименовы в первый и второй Прибалтийский, Белорусский, первый, второй, третий и четвёртый Украинские фронты"],
    "Ноябрь 1943": ["Проведены Гомельско-Речицкая, Киевская наступательная операции", "Начало Знаменской, Киевской оборонительной операций", "Завершение Днепровской воздушно-десантной, Пятихатской, Мелитопольской операций", "Тегеранская конференция глав правительств СССР, Великобритании и США"],
    "Декабрь 1943": ["Проведена Городокская операция", "Начало Днепровско-Карпатской, Житомирско-Бердичевской операций", "Завершение Оршанской, Киевской оборонительной, Знаменской, Днепропетровской, Нижнеднепровской, Керченско-Эльтигенской операций", "Начало массовой депортации карачаевцев и калмыков, обвинённых в сотрудничестве с гитлеровцами", "Упразднение Карачаево-Черкесской и Калмыцкой автономий"],
    "Январь 1944": ["Проведена Красносельско-Ропшинская, Калинковичско-Мозырская, Кировоградская операции", "Начало Ленинградско-Новгородоской, Новгородско-Лужской, Ровно-Луцкой, Корсунь-Шевченковской, Никопольско-Криворожской операций", "Завершение Житомирско-Бердичевской операции", "Окончательная ликвидация блокады Ленинграда"],
    "Февраль 1944": ["Проведена Рогачёвско-Жлобинская операция", "Начало Витебской операции", "Завершение Новгородско-Лужской, Ровно-Луцкой, Корсунь-Шевченковской, Никопольско-Криворожской операций", "Образование первого и втрого Белорусских фронтов"],
    "Март 1944": ["Проведена Березнеговато-Снигирёвская операции", "Начало Псковской, Поллеской, Проскуровско-Черновицкой, Уманско-Ботошанской, Одесской операций", "Завершение Ленинградско-Новгородоской, Витебской операций"],
    "Апрель 1944": ["Начало Крымской операции", "Завершение Псковской, Поллеской, Днепровско-Карпатской, Проскуровско-Черновицкой, Уманско-Ботошанской, Одесской операций", "Образование третьего Прибалтийского фронта"],
    "Май 1944": ["Завершение Крымской операции", "Высылка в Казахстан и Среднюю Азию крымских татар и ликвидация их автономии", "Расформирован четвёртый Украинский фронт"],
    "Июнь 1944": ["Проведены Витебско-Оршанская, Могилёвская, Бобруйская, Выборгская операции", "Начало Выборгско-Петрозаводской, Белорусской, Минской, Полоцкой операций"],
    "Июль 1944": ["Проведены Нарвская, Псковско-Островская, Режицко-Двинская, Вильнюсская, Белостокская операции", "Начало Свирско-Петрозаводской, Шяуляйской, Каунасской, Люблин-Брестской, Львовско-Сандомирской операций", "Завершение Минской, Полоцкой операций"],
    "Август 1944": ["Проведены Мадонская, Осовецкая, Ясско-Кишинёвская операции", "Начало Тартуской, Ломжа-Ружанской, Сероцкой, Бухарестско-Арадской операций", "Завершение Выборгско-Петрозаводской, Свирско-Петрозаводской, Белорусской, Каунасской, Люблин-Брестской, Львовско-Сандомирской операций", "Восстановление четвёртого Украинского фронта", "Выход Румынии из войны с СССР и объявление ею войны Германии"],
    "Сентябрь 1944": ["Проведены Таллинская, Болгарская операции", "Начало Прибалтийской, Моонзундской, Рижской, Восточно-Карпатской, Карпатско-Дуклинской, Карпатско-Ужгородской, Белградской операций", "Завершение Тартуской операции", "Выход Финляндии из войны с СССР, разрыв ее отношений с Германией", "Выход Болгарии из войны с СССР и объявление ею войны фашистской Германии"],
    "Октябрь 1944": ["Проведены Петсамо-Киркенесская, Мемельская, Гумбиннен-Гольдапская, Дебреценская операции", "Начало Будапештской операции", "Завершение Рижской, Восточно-Карпатской, Карпатско-Дуклинской, Карпатско-Ужгородской, Бухарестско-Арадской, Белградской операций", "Расформирован третий Прибалтийский фронт", "Распеделение зон влияния в придунайских странах Европы и на Балканах. К зоне интересов Советского Союза должны были отойти: 90% Румынии, 75% Болгарии, 50% Югославии и Венгрии, 10% Греции"],
    "Ноябрь 1944": ["Начало Ондавской, Апатин-Капошварской операций", "Завершение Прибалтийской, Моонзундской, Ломжа-Ружанской, Сероцкой операций", "Освобождение Петсамской области", "Массовая депортация месхетинцев"],
    "Декабрь 1944": ["Завершение Ондавской, Апатин-Капошварской операций", "Подписание советско-французского договора о союзе и взаимной помощи"],
    "Январь 1945": ["Проведены Инстербургско-Кёнигсбергская, Млавско-Эльбингская операции", "Начало Восточно-Прусской, Висло-Одерской, Варшавско-Познанской, Сандомирско-Силезской, Западно-Карпатской операций"],
    "Февраль 1945": ["Проведена Нижне-Силезская операция", "Начало Курляндской, Восточно-Померанской операций", "Завершение Висло-Одерской, Варшавско-Познанской, Сандомирско-Силезской, Западно-Карпатской, Будапештской операций"],
    "Март 1945": ["Проведены Верхне-Силезская, Банска-Быстрицкая, Балатонская оборонительная операции", "Начало Моравско-Остравской наступательной, Венской, Братиславско-Брновской операций"],
    "Апрель 1945": ["Начало Берлинской наступательной операции", "Завершение Восточно-Прусской, Восточно-Померанской, Венской операций", "Договор о дружбе, взаимопомощи и послевоенном сотрудничестве с Югославией", "Начало конференции ООН в Сан-Франциско при участии СССР"],
    "Май 1945": ["Проведена Пражская операция", "Завершение Курляндской, Берлинской наступательной, Моравско-Остравской операций", "Завершение Освобождения восточной части Австрии", "Победа над фашистской Германией"]
  };

  const timelineDateArray = [
    "Июнь 1941",
    "Июль 1941",
    "Август 1941",
    "Сентябрь 1941",
    "Октябрь 1941",
    "Ноябрь 1941",
    "Декабрь 1941",
    "Январь 1942",
    "Февраль 1942",
    "Март 1942",
    "Апрель 1942",
    "Май 1942",
    "Июнь 1942",
    "Июль 1942",
    "Август 1942",
    "Сентябрь 1942",
    "Октябрь 1942",
    "Ноябрь 1942",
    "Декабрь 1942",
    "Январь 1943",
    "Февраль 1943",
    "Март 1943",
    "Апрель 1943",
    "Май 1943",
    "Июнь 1943",
    "Июль 1943",
    "Август 1943",
    "Сентябрь 1943",
    "Октябрь 1943",
    "Ноябрь 1943",
    "Декабрь 1943",
    "Январь 1944",
    "Февраль 1944",
    "Март 1944",
    "Апрель 1944",
    "Май 1944",
    "Июнь 1944",
    "Июль 1944",
    "Август 1944",
    "Сентябрь 1944",
    "Октябрь 1944",
    "Ноябрь 1944",
    "Декабрь 1944",
    "Январь 1945",
    "Февраль 1945",
    "Март 1945",
    "Апрель 1945",
    "Май 1945"
  ];

  const dict = new Map();
  timelineDateArray.forEach((el) => {
    dict.set(el, data[el]);
  });

  leftDate.textContent = timelineDateArray[0];
  rightDate.textContent = timelineDateArray[47];

  const createTimelineCard = function (el) {
    let randImage = Math.floor(1 + Math.random() * (10 + 1 - 1));
    let randText = Math.floor(1 + Math.random() * (4 + 1 - 1));
    const timelineCard = document.createElement("a");
    timelineCard.className = "timeline-card";
    timelineCard.dataset.date = el[0];
    timelineCard.dataset.index = timelineDateArray.indexOf(el[0]);
    // timelineCard.href = "#";
    // timelineCard.style.width = `${15+randText*5}%`;

    const timelineDivImage = document.createElement("div");

    const timelineImage = document.createElement("img");
    timelineImage.src = `static/images/bg${randImage}.jpg`;
    timelineDivImage.appendChild(timelineImage);
    timelineCard.appendChild(timelineDivImage);

    const timelineDescription = document.createElement("span");
    timelineDescription.className = "timeline-card-description";
    timelineDescription.innerHTML = el[0] + "<br><br>" + el[1].join("<br>");
    timelineCard.appendChild(timelineDescription);

    const timelineLink = document.createElement("span");
    timelineLink.className = "timeline-card-link";
    timelineLink.textContent = "";
    timelineCard.appendChild(timelineLink);

    timelineContent.appendChild(timelineCard);
  };

  dict.entries().forEach((el) => {
    createTimelineCard(el);
  });

  const inputSlider = (value, userInteraction) => {
    let left = parseInt(value[0] - 1);
    let right = parseInt(value[1] - 1);
    leftDate.textContent = timelineDateArray[left];
    rightDate.textContent = timelineDateArray[right];
    console.log(left, right);
    document.querySelectorAll(".timeline-card").forEach((el) => {
      if (el.dataset.index < left || el.dataset.index > right) {
        // el.classList.add("hidden");
        requestAnimationFrame(() => {
          el.classList.add("hidden");
        });
      } else {
        el.classList.remove("hidden");
      }
    });
  };

  const rangeSliderElement = rangeSlider(rangeSliderContainer, {
    step: "any",
    min: 1,
    max: 48,
    value: [1, 48],
    onInput: inputSlider,
  });

  document.addEventListener("scroll", (e) => {
    console.log(e, e.timeStamp);
  });

  let children = document.querySelectorAll(".width-text");
  for (const child of children) {
    const k = child.computedStyleMap().get("font-size").value / child.getBoundingClientRect().width;

    let observer = new ResizeObserver((mutations) => {
      const containerWidth = mutations[0].contentRect.width;
      console.log(containerWidth);
      child.style.fontSize = k * containerWidth + "px";
      child.style.lineHeight = k * containerWidth + "px";
    });

    observer.observe(document.querySelector(".header-title"));
  }
});

let link = document.querySelector(".to_test")

function close_window(evt) {
  if (evt.target.classList.contains("outer") || evt.target.classList.contains("close")) {
    document.querySelector('.outer').style = "display: none";  
    document.body.style = "overflow: auto";
  } 
}

document.querySelector('.close').addEventListener("click", close_window);
document.querySelector('.outer').addEventListener("click", close_window);

link.addEventListener("click", (evt) => {
  evt.preventDefault();
  let left_date = document.querySelector(".left-date");
  let right_date = document.querySelector(".right-date");
  if (left_date.textContent != right_date.textContent) {
    location.href = link.href + `?left_date=${left_date.textContent}&right_date=${right_date.textContent}`;
  }
  else {
    document.querySelector('.outer').style = "display: flex";
    document.body.style = "overflow: hidden";
  }
});

