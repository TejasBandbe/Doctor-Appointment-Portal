export const constants = {
    MOBILE_NO: "YOUR_PHONE_NUMBER",
    EMAIL_ID: "YOUR_EMAIL_ID",
    LOCATION: "YOUR_LOCATION",
    WEBSITE: "YOUR_WEBSITE_NAME",
    APP_NAME: "MedBookingPro",
    ADDR_LINE_1: "ADDRESS_LINE_1",
    ADDR_LINE_2: "ADDRESS_LINE_2"
}

export function createurl(path){
    return 'http://localhost:9999/api/bookings' + path;
}

export function log(message){
    console.log(message);
}