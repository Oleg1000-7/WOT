document.addEventListener("DOMContentLoaded", () => {
  const rangeSliderContainer = document.querySelector(".timeline-slider");
  const timelineDate = document.querySelector(".timeline-date");
  const leftDate = timelineDate.querySelector(".left-date");
  const rightDate = timelineDate.querySelector(".right-date");
  const timelineContent = document.querySelector(".timeline-content");

  let xhr = new XMLHttpRequest();
  let data = []
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

  xhr.open('GET', '/api/v2/events');
  xhr.send();

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      data = JSON.parse(xhr.response)["events"];
      data.forEach((el) => {
        if (dict.has(timelineDateArray[el["month_number"]])) {
          dict.set(timelineDateArray[el["month_number"]], dict.get(timelineDateArray[el["month_number"]]).concat(el["event_description"]));
        }
        else {
          dict.set(timelineDateArray[el["month_number"]], [el["event_description"]]);
        }
      });

      dict.entries().forEach((el) => {
        createTimelineCard(el);
      });
    }
  }

  leftDate.textContent = timelineDateArray[0];
  rightDate.textContent = timelineDateArray[47];

  const createTimelineCard = function (el) {
    n = timelineDateArray.indexOf(el[0])
    let randImage = Math.floor(1 + Math.random() * (10 + 1 - 1));
    const timelineCard = document.createElement("a");
    timelineCard.href = `/date/${n}`
    timelineCard.className = "timeline-card";
    timelineCard.dataset.date = el[0];
    timelineCard.dataset.index = n;

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

  const inputSlider = (value, userInteraction) => {
    let left = parseInt(value[0] - 1);
    let right = parseInt(value[1] - 1);
    leftDate.textContent = timelineDateArray[left];
    rightDate.textContent = timelineDateArray[right];
    document.querySelectorAll(".timeline-card").forEach((el) => {
      if (el.dataset.index < left || el.dataset.index > right) {
        requestAnimationFrame(() => {
          el.classList.add("hidden");
        });
      } else {
        el.classList.remove("hidden");
      }
    });
  };

  rangeSlider(rangeSliderContainer, {
    step: "any",
    min: 1,
    max: 48,
    value: [1, 48],
    onInput: inputSlider,
  });


  let children = document.querySelectorAll(".width-text");
  for (const child of children) {
    const k = child.computedStyleMap().get("font-size").value / child.getBoundingClientRect().width;

    let observer = new ResizeObserver((mutations) => {
      const containerWidth = mutations[0].contentRect.width;
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

