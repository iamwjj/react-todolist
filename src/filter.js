export default {
    all(todos) {
        return todos
    },
    active(todos) {
        return todos.filter(item => {
            return !item.completed
        })
    },
    completed(todos) {
        return todos.filter(item => {
            return item.completed
        })
    }
}