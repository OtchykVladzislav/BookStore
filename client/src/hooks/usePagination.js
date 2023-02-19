export const usePagination = (arr, number, items) => {
    let array = [];
    let startElement = (number - 1) * items;
    (number * items) > arr.length ? array = arr.slice(startElement) : array = arr.slice(startElement, startElement + items)
    return array
}