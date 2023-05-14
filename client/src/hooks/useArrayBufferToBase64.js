export const useArrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

export const useBase64 = (arrayBuffer, type) => {
    const str = useArrayBufferToBase64(arrayBuffer)
    const index = str.indexOf("/", 10);
    return `data:${type};base64,${str.slice(index)}`
}