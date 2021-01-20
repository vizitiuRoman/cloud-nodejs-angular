export function getFileName(name: string): string {
    return name.split('.').reverse().splice(1).join('.');
}

export function getFileExtension(name: string): string {
    return name.split('.').reverse()[0];
}
