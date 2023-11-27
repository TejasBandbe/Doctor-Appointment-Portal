export const constants = {
    MOBILE_NO: "+91 9823629901",
    EMAIL_ID: "medbookingpro@gmail.com",
    LOCATION: "Ratnagiri, India",
    WEBSITE: "https://medbookingpro.netlify.app",
    APP_NAME: "MedBookingPro",
    ADDR_LINE_1: "B-201 Arihant Mall,",
    ADDR_LINE_2: "Opp. ST stand, Ratnagiri - 415612"
}

export function createurl(path){
    return 'https://tejas65backends.cyclic.app/api/bookings' + path;
}

export function log(message){
    console.log(message);
}