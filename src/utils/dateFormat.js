export const dateFormat = (x) => {
    const date = new Date(x);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
};