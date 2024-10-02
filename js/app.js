let bodyText = `
Hi this a *test wirk*
asfkljs  _sldjfk;sa_

«dfdfdf»hlfhasdlsajjl aslfjsd «dfdfdf»

`

function formatText(command, value = null) {
    document.execCommand(command, false, value);
    try{
        readBulletinInputValues()
    }
    catch(error){
        
    }
}



let bulletin_header = ""
let bulletin_body = ""
let bulletin_footer = ""

/* function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.innerHTML.trim();
    if (message) {
        const messageContainer = document.createElement('div');
        messageContainer.innerHTML = message;
        document.querySelector('.messages').appendChild(messageContainer);
        messageInput.innerHTML = '';
    }
} */

$(document).ready(()=>{
    try {
        let headerInput = $('#b_header')
        let phoneInput = $('#b_phone')
        let emailInput = $('#b_email')
        headerInput.html(BulletinDefualts.header)
        phoneInput.val(BulletinDefualts.phoneNumber)
        emailInput.val(BulletinDefualts.email)
        $('#select_color').change(function (e) { 
            e.preventDefault();
            formatText('foreColor', $('#select_color').val())
        });
        //document.querySelector('#select_color').addEventListener('change', (e)=>{console.log(e)})
    } catch (error) {
        //alert(error)
    }
})

$('#save_config').click(() => {
    let headerInput = $('#b_header')
    let phoneInput = $('#b_phone')
    let emailInput = $('#b_email')

    if (headerInput.html().trim() == null || headerInput.html().trim() == "") {
        alert("Error: Header is empty!")
        return;
    }
    if (phoneInput.val() == null || phoneInput.val() == "") {
        alert("Error: Phone is empty!")
        return;
    }
    if (emailInput.val() == null || emailInput.val() == "") {
        alert("Error: Email is empty!")
        return;
    }
    BulletinDefualts.header = headerInput.html()
    BulletinDefualts.phoneNumber = phoneInput.val()
    BulletinDefualts.email = emailInput.val()
    localStorage.setItem(BulletinDefualtsKey, toJsonString(BulletinDefualts))
    alert("Saved")
    location.reload()
})
