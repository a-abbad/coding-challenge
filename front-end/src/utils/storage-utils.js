export function setData(key, values) {
    localStorage.setItem(key, values);
}

export function getData(key) {
    return localStorage.getItem(key);
}

export function removeData(key) {
    localStorage.removeItem(key);
}