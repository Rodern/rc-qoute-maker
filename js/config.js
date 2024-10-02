const IsConfigkey = "IsConfig", 
BulletinsKey = "Bullettins",
 BulletinDefualtsKey = "BulletinDefualts"

let BulletinDefualts = {
    header: "Teach us to number our days",
    topic: "",
    text: "",
    textName: "",
    bibleVersion: "NKJV",
    date: new Date(),
    weekNumber: 1,
    weekName: "",
    body: "",
    prayerPoints: [],
    phoneNumber: "677657735",
    email: "upperchamber20@gmail.com"
}

let Bulletins = []

if(!localStorage.getItem(IsConfigkey)){
    console.log("Not configured")
    localStorage.setItem(BulletinDefualtsKey, toJsonString(BulletinDefualts))
    localStorage.setItem(BulletinsKey, toJsonString(Bulletins))
    localStorage.setItem(IsConfigkey, true)
    console.log("Done configuring")
}
else {
    BulletinDefualts = toJsonObject(localStorage.getItem(BulletinDefualtsKey))
    Bulletins = toJsonObject(localStorage.getItem(BulletinsKey))
    console.log("IsConfigured: " + localStorage.getItem(IsConfigkey))
}

function toJsonString(object){
    return JSON.stringify(object)
}
function toJsonObject(string){
    return JSON.parse(string)
}