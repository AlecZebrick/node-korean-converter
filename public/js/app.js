const numberForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

numberForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const number = search.value

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('/number?number=' + number).then((response) => {
        response.json().then((data) => {
           if (data.error) {
            messageOne.textContent = data.error
           } else {
            messageTwo.textContent = data.english
            messageOne.textContent = data.korean
           }
        })
    })
    
})
