const button = document.getElementById('main_button')

class Requests {
    constructor(links = [], callback = () => {}) {
        this.links = links
        this.callback = callback
        this._ready = 0
        this.data = []

        this.links.forEach(link => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', link, true)
            xhr.send()

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return
                if (xhr.status !== 200) throw new Error(xhr.statusText)

                this.data.push(xhr.responseText)
                console.log(link, 'Получен')
                this.ready()
            }
        })
    }

    ready() {
        this._ready++

        if (this._ready === this.links.length) {
            console.log('Все ответы получены!')

            this.callback(this.data)
        }
    }
}

function callback(data) {
    console.log('Данные:', data)
}

button.addEventListener('click', () => {
    new Requests(['req1', 'req2'], callback)
})