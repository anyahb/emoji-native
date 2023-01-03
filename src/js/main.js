let emojiList = []
let emojiListFirst10 = []
const input = document.querySelector(".emoji__input")
input.addEventListener("input", function(event){
    console.warn('event', event)
    const value = event.target.value // event - какой-то объект, в котором хранится target (это то, на чем произошел ивэнт), а value - это ключ внутри таргета, в котором находится значение, которое пользователь ввёл
    createList(value, emojiList)
})

const drawElements = (arr, container) => {
    // мы передаем массив arr (параметр) по которому проходимся циклом и вставляем потом emojiItem в container (параметр)
    arr.forEach(item => {
        const emojiItem = document.createElement('div')
        emojiItem.classList.add('emoji__item')
        emojiItem.textContent = `${item.symbol} ` //ubrala ${item.title}
        container.append(emojiItem)
    })
}

function createList(val,arr){
    const emojiContainer = document.querySelector('.emoji__container')
    const formContainer = document.querySelector('.form__container')
    emojiContainer.innerHTML = '' //clear the container
    formContainer.innerHTML = '' //clear the container

    if(val === ''){
        drawElements(emojiListFirst10, formContainer)
    } else {
        const filteredArr = [] // [{title: '', symbol: ''},{},{}]
        arr.forEach(item => {
            const keywords = item.keywords.toLowerCase()
            const value = val.toLowerCase()

            if(keywords.indexOf(value) > -1){ //indexOf работает так, что если он что-то нашел, то он показывает индекс, а если не нашел, то он показывает -1
                filteredArr.push(item)
                // console.log(newArr)
            }
        })
        drawElements(filteredArr, formContainer)
    }

}

function getEmojis(){
    fetch("http://localhost:3000/emojies")
        .then(data => {
            return data.json()
        })
        .then((response) => {
            emojiList = response
            // const massiv = [222]
            // const choto = massiv.splice(0,10,222) // 1,2,3,4,5

            emojiListFirst10 = emojiList.slice(0,10)

            const emojiContainer = document.createElement("div")
            emojiContainer.classList.add("emoji__container")

            drawElements(emojiListFirst10, emojiContainer)

            document.body.append(emojiContainer)
        })
}

getEmojis()

// 1. Сделать красиво, можно для мобилки стили придумать
// 2. Задачки на вынос функции
// 3. Сделать проект погода.


