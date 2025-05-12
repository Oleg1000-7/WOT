let test = document.querySelector('.test');

new Sortable(test, {
    animation: 500,
    ghostClass: 'element-choosen'
});

console.log(window.location)
const searchParams = new URLSearchParams(window.location.search);
for (const param of searchParams) {
    console.log(param);
}
console.log(searchParams);

let xhr = new XMLHttpRequest();
let data = {}
let months = [
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
let facts = [];
let test_facts = [];
let length = 0;

xhr.open('GET', '/api/v2/events');
xhr.send();
xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
        for (let i = 0; i < months.length; i ++){
            data[months[i]] = []
        };

        res = JSON.parse(xhr.response)["events"];

        for (let i = 0; i < res.length; i++){
            data[months[res[i]["month_number"]]].push(res[i]["event_description"])
        };
        console.log(data);
        createTestElements();
    }
}

function createTestElements() {
    for (let i = 0; i < 48; ++i){
        facts.push(data[months[i]]);
    }

    if (searchParams.size != 0){
        document.querySelector('.header-test').innerHTML = `${document.querySelector('.header-test').innerHTML + searchParams.get("left_date")} - ${searchParams.get("right_date")}.`;
        for (let i = months.indexOf(searchParams.get("left_date")); i < months.indexOf(searchParams.get("right_date")) + 1; ++i){
            for (let j = 0; j < facts[i].length; ++j){
                test_facts.push(facts[i][j]);
                length++;
            }
        }
    }
    else{
        document.querySelector('.header-test').innerHTML = `${document.querySelector('.header-test').innerHTML}Июнь 1941 - Май 1945.`;
        for (let i = 0; i < facts.length; ++i){
            for (let j = 0; j < facts[i].length; ++j){
                test_facts.push(facts[i][j]);
                length++;
            }
        }
    }

    for (let i = 0; i < length; ++i){
        let r = Math.floor(Math.random() * (length - i)) + i;
        let fact_ = test_facts[r];
        test_facts[r] = test_facts[i];
        test_facts[i] = fact_;
    }


    for (let i = 0; i < length; ++i){
        let month = document.createElement("li");
        let fact = document.createElement("p");
        fact.innerHTML = test_facts[i];
        month.appendChild(fact);
        test.appendChild(month);
    }
}

function check(evt) {
    let ans = test.querySelectorAll("p");
    let indexes_ans = [];
    for (let i = 0; i < length; ++i){
        for (let j = 0; j < facts.length; ++j){
            for (let k = 0; k < facts[j].length; ++k){
                if (ans[i].innerHTML == facts[j][k]){
                    indexes_ans.push(j)
                }
            }
        }
    }
    let right_indexes_ans = indexes_ans.slice();
    right_indexes_ans.sort(function(a, b) {
        return a - b;
    });
    document.querySelector('.outer').style = "display: flex";
    let right_answers_count = 0;
    for (let i = 0; i < length; ++i){
        if (indexes_ans[i] == right_indexes_ans[i]){
            test.childNodes[i].style = "background-color: #0F0";
            right_answers_count++
        }
        else{
            test.childNodes[i].style = "background-color: #F00";
        }
    }
    if (right_indexes_ans.join() === indexes_ans.join()){
        console.log("МОЛОДЕЦ!!!!!!!!!!!!!!!!");
        document.querySelector('.result').innerHTML = "Правильно!<br>Молодец!";
    }
    else{
        console.log("НЕПРАВИЛЬНО, ПОПРОБУЙ ЕЩЁ!");
        document.querySelector('.result').innerHTML = "Неправильно!<br>Попробуй ещё!";
    }

    xhr.open('POST', '/check_res');
    xhr.setRequestHeader('Content-Type', 'application/json');
    if(searchParams.size != 0) {
        xhr.send(JSON.stringify({"percent" : right_answers_count / length * 100, "left_date" : searchParams.get("left_date"), "right_date" : searchParams.get("right_date")}));
    }
    else {
        xhr.send(JSON.stringify({"percent" : right_answers_count / length * 100, "left_date" : 'Июнь 1941', "right_date" : "Май 1945"}));
    }
}

document.querySelector(".confirm").addEventListener("click", check);
document.querySelector(".save").addEventListener("click", (evt) => {
    document.querySelector('.outer').style = "display: none";
    for (let i = 0; i < length; ++i){
        test.childNodes[i].style = "background-color: transparent";
    }
});
document.querySelector(".outer").addEventListener("click", (evt) => {
    if (evt.target.classList.contains("outer")){
        document.querySelector('.outer').style = "display: none";
        for (let i = 0; i < length; ++i){
            test.childNodes[i].style = "background-color: transparent";
        }
    }
});
