const form = document.getElementById('main_form')

// return array of objects {query: value}
function getQueryParams() {
    if (!document.location.search) return []

    const query = document.location.search.substring(1).split('&')

    return query.map(pair => {
        const arrayPair = pair.split('=')

        return {[arrayPair[0]]: decodeURIComponent(arrayPair[1])}
    })
}
let queryParams = getQueryParams()

// fill form fields
function formFill(form) {
    // const queryParams = getQueryParams()

    queryParams.forEach(query => {
        Array.from(form.elements).forEach(element => {
    
            if (element.type === 'radio' || element.type === 'checkbox') {
                if (element.value === query[element.name]) element.checked = true
            }
    
            if (element.type === 'select-multiple') {
                Array.from(element.options).forEach(option => {
                    if (option.value === query[element.name]) option.selected = true
                })
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    formFill(form)
})

function changeHandler(e) {
    const { origin, pathname } = document.location
    const { type, name, value, checked, options } = e.target
    
    if (name === 'sale') return

    switch (type) {
        case 'radio':
            let isUpdated = false

            // in radio input must be one selected item
            queryParams.forEach(param => {
                if (param[name] !== undefined) {
                    param[name] = value

                    isUpdated = true
                }
            })

            // select if not selected before
            if (!isUpdated) {
                queryParams.push({[name]: value})
            }

            break
        case 'checkbox':
            if (checked) {
                queryParams.push({[name]: value})
            } else {
                queryParams = queryParams.filter(param => param[name] !== value)
            }

            break
        case 'select-multiple':
            const selected = []

            // collect selected items
            Array.from(options).forEach(option => {
                if (option.selected) selected.push(option.value)
            })

            // remove all selected before items
            queryParams = queryParams.filter(param => param[name] === undefined)
            // add new selected items
            selected.forEach(selectedValue => queryParams.push({[name]: selectedValue}))
    }

    // convert query objects to array ['key=pair', ...]
    const queries = queryParams.map(param => {
        const key = Object.keys(param)[0]
        return key + '=' + encodeURIComponent(param[key])
    })

    const queryLink = origin + pathname + '?' + queries.join('&')
    console.log(queryLink)
}

form.addEventListener('change', changeHandler)