export const dateSend = (date) => {
    let month = date.getUTCMonth() + 1; //months from 1-12
    let day = date.getUTCDate() + 1;
    let year = date.getUTCFullYear();
    return `${year}-${month}-${day}`
}
