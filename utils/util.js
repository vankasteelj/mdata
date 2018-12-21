module.exports = {
    inArray: (obj, arr) => {
        for (let value of arr) {
            for (let key in obj) {
                if (key == value && obj[key]) return true
            }
        }
        return false
    }
}