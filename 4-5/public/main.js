// simple id generation
function generateId() {
    return (Math.random() * Date.now()).toString()
}

// main page part
export class FrameStorage {
    constructor(frame) {
        this.frame = frame
        this.actions = []

        window.addEventListener('message', e => {
            if (e.data.id) {
                const action = this.actions.find(action => action.data.id === e.data.id)

                if (action && action.callback) action.callback(e.data)
            }
        })
    }

    send(cb, type, key, value = '') {
        const action = {
            type,
            key,
            value,
            id: generateId()
        }

        this.actions.push({data: action, callback: cb})
        this.frame.contentWindow.postMessage(action, '*')
    }

    write(cb, key, value) {
        this.send(cb, 'write', key, value)
    }

    read(cb, key) {
        this.send(cb, 'read', key)
    }

    delete(cb, key) {
        this.send(cb, 'delete', key)
    }
}

// iframe part
export function localStorageHandler(data) {
    function send(data) {
        window.parent.postMessage(data, '*')
    }

    switch (data.type) {
        case 'write':
            try {
                localStorage.setItem(data.key, data.value)
                send({...data, status: 'done'})
            } catch(e) {
                send({...data, status: 'error'})
            }
            break
        case 'read':
            try {
                data.value = localStorage.getItem(data.key)

                if (!data.value) throw new Error('No value in storage')

                send({...data, status: 'done'})
            } catch(e) {
                send({...data, status: 'error'})
            }
            break
        case 'delete':
            try {
                localStorage.removeItem(data.key)
                send({...data, status: 'done'})
            } catch(e) {
                send({...data, status: 'error'})
            }
            break
        default:
            send({...data, status: 'error'})
    }
}