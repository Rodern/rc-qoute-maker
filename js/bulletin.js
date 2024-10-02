let bulletin = {
    id: makeId(),
    bulletin: BulletinDefualts
}

function makeId(){
    return Date.now()
}

let bulletinPreview = $('.bulletin-preview')
let print_header = $('#print_header')
let print_topic = $('#print_topic')
let print_date = $('#print_date')
let print_week_name = $('#print_week_name')
let print_verse = $('#print_verse')
let print_quotation = $('#print_quotation')
let print_body = $('#print_body')
let print_points = $('#print_points')
let print_footer = $('#print_footer')

let bt_header = $('#bt_header')
let bt_topic = $('#bt_topic')
let bt_date = $('#bt_date')
let bt_week_number = $('#bt_week_number')
let bt_week_name = $('#bt_week_name')
let bt_verse = $('#bt_verse')
let bt_verse_name = $('#bt_verse_name')
let select_version = $('#select_version')
let bt_body = $('#bt_body')
let bt_point = $('#bt_point')
let bt_point_add_btn = $('#bt_add_point')
let p_list = $('.p-list')



$(document).ready(function () {
    let bulletinId = getBId(location.href)
    if(bulletinId != '' && bulletinId != null) {
        bulletin = Bulletins.find(x => x.id == bulletinId)
        console.log(bulletin)
        if(bulletin == undefined || bulletin == null) {
            bulletin = {
                id: makeId(),
                bulletin: BulletinDefualts
            }
        }
    } else {
    }
    try {
        loadBulletins()
    } catch (error) {
        console.log(error)
    }
    renderBulletin()
    loadBulletinInputValues()
});

function getBId(path) {
    const url = new URL(path);
    const searchParams = url.searchParams;

    const bId = searchParams.get('bId');
    return bId
}

bt_header.keyup(readBulletinInputValues)
bt_topic.keyup(readBulletinInputValues)
bt_date.keyup(readBulletinInputValues)
bt_date.change(readBulletinInputValues)
bt_week_name.keyup(readBulletinInputValues)
bt_week_number.keyup(readBulletinInputValues)
bt_verse.keyup(readBulletinInputValues)
bt_verse_name.keyup(readBulletinInputValues)
select_version.change(readBulletinInputValues)
bt_body.keyup(readBulletinInputValues)

function readBulletinInputValues(){
    try {
        bulletin.bulletin.header = bt_header.html().trim()
    } catch (error) {
        bulletin.bulletin.topic = bt_topic.html().trim()
    }
    try {
        bulletin.bulletin.topic = bt_topic.html().trim()
    } catch (error) {

    }
    try {
        bulletin.bulletin.date = bt_date.val().trim()
    } catch (error) {
        
    }
    try {
        bulletin.bulletin.weekName = bt_week_name.val().trim()
    } catch (error) {
        
    }
    try {
        bulletin.bulletin.weekNumber = bt_week_number.val().trim()
    } catch (error) {
        
    }
    try {
        bulletin.bulletin.text = bt_verse.html().trim()
    } catch (error) {
        
    }
    try {
        bulletin.bulletin.textName = bt_verse_name.val().trim()
    } catch (error) {
        
    }
    try {
        bulletin.bulletin.body = bt_body.html().trim()
    } catch (error) {
        
    }

    bulletin.bulletin.bibleVersion = select_version.val().trim()

    renderBulletin()
}

bt_point_add_btn.click(() => {
    let point = bt_point.html().trim(), points = '', p = ''
    if (point == null || point == '') {
        alert("Error: Point is empty!")
        return
    }
    bulletin.bulletin.prayerPoints.push(point)
    bulletin.bulletin.prayerPoints.forEach(element => {
        points = points.concat(`<li>${element}</li>`)
    })
    print_points.html(points)

    p = `
        <div class="pl-p" id="point_${bulletin.bulletin.prayerPoints.length + 1}">
            ${point}
            <button class="btn" id="del_p_${bulletin.bulletin.prayerPoints.length + 1}">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z"></path>
                </svg>
            </button>
        </div>`
    $(p).appendTo(p_list)
    initDeletePoint()
    bt_point.html("")
})

function initDeletePoint(){
    $('.pl-p .btn').click((e) => {
        let target = e.target.closest('.pl-p')
        let i = 0
        bulletin.bulletin.prayerPoints.forEach(point => {
            if (point == target.innerText) {
                bulletin.bulletin.prayerPoints.splice(i, 1)
                $(target).remove()
            }
            i += 1
        });
        renderBulletin()
    })
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
}
function formatDate(date = new Date()) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join('-')
}

function loadBulletinInputValues() {
    bt_header.html(bulletin.bulletin.header)
    bt_topic.html(bulletin.bulletin.topic)
    bt_date.val(formatDate(new Date(bulletin.bulletin.date)))
    bt_week_number.val(bulletin.bulletin.weekNumber)
    bt_week_name.val(bulletin.bulletin.weekName)
    bt_verse.html(bulletin.bulletin.text)
    bt_verse_name.val(bulletin.bulletin.textName)
    select_version.val(bulletin.bulletin.bibleVersion)
    //.html(`${bulletin.bulletin.textName} (${bulletin.bulletin.bibleVersion})`)
    bt_body.html(bulletin.bulletin.body)

    let points = ''
    bulletin.bulletin.prayerPoints.forEach(element => {
        points = points.concat(`<li><p>${element}</p></li>`)
        let p = `
        <div class="pl-p" id="point_${bulletin.bulletin.prayerPoints.length + 1}">
            ${element}
            <button class="btn" id="del_p_${bulletin.bulletin.prayerPoints.length + 1}">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z"></path>
                </svg>
            </button>
        </div>`
        $(p).appendTo(p_list)
    })
    print_points.html(points)
    initDeletePoint()

    let versions = [
        "NKJV",
        "KJV",
        "NIV",
        "ESV",
        "NLT",
        "MSG",
        "NASB",
        "AMP"
    ]
    version_options = ''
    versions.forEach(element => {
        version_options = version_options.concat(`<option value="${element}">${element}</option>`)
    })
    select_version.html(version_options)
}


function renderBulletin() {
    bulletinPreview.attr("bt-id", bulletin.id);
    print_header.html(bulletin.bulletin.header)
    print_topic.html(bulletin.bulletin.topic)
    print_date.html(new Date(bulletin.bulletin.date).toDateString())
    print_week_name.html(`Week ${bulletin.bulletin.weekNumber}: ${bulletin.bulletin.weekName}`)
    print_verse.html(`"${bulletin.bulletin.text}"`)
    print_quotation.html(`${bulletin.bulletin.textName} (${bulletin.bulletin.bibleVersion})`)
    print_body.html(bulletin.bulletin.body)

    let points = ''
    bulletin.bulletin.prayerPoints.forEach(element => {
        points = points.concat(`<li>${element}</li>`)
    })
    print_points.html(points)
    
    $('#edit_bulletin').attr('href', `${location.origin}/index.html?bId=${bulletin.id}`)
    $('#download').on('click', (e) => {
        e.preventDefault()
        /* html2canvas(bulletinPreview, {
            onrendered: function(canvas) {
                var imageData = canvas.toDataURL('image/png')
                base64ToImage(imageData)
                console.log(bulletinPreview)
                var newData = imageData.replace(/^data:image\/png;base64/, 'data:image/jpg') // 'data:application/octet-stream')
                $('#download').attr('download', `${bulletin.bulletin.topic.replace(' ', '_')}-${bulletin.id}.jpg`).attr('href', newData)
            }
        }) */
        html2canvas(document.querySelector('.bulletin-preview')).then(function (canvas) {
            //document.body.appendChild(canvas);
            var imageData = canvas.toDataURL('image/jpg')
            //base64ToImage(imageData)
            //console.log(bulletinPreview)
            var newData = imageData.replace(/^data:image\/png/, /* 'data:image/jpg') //  */'data:application/octet-stream')
            download(`${bulletin.bulletin.topic.replace(' ', '_')}-${bulletin.id}.jpg`, newData)
            //$('#download').attr('download', `${bulletin.bulletin.topic.replace(' ', '_')}-${bulletin.id}.jpg`).attr('href', newData)
        });
    })
}

function base64ToImage(base64String) {
    let image = new Image();
    image.src = /* 'data:image/png;base64,' +  */base64String;
    document.body.appendChild(image);
}

function download(file, text) {
    //creating an invisible element
    let element = document.createElement('a');
    element.setAttribute('href', text);
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}


function autoClickDownload(){
    //$('#download').click()
}

$('#save_bulletin').click(()=>{
    if (bulletin.bulletin.header == null || bulletin.bulletin.header == '') {
        alert("Error: Header is empty!")
        return
    }
    if (bulletin.bulletin.topic == null || bulletin.bulletin.topic == '') {
        alert("Error: Topic is empty!")
        return
    }
    if (bulletin.bulletin.weekNumber == null || bulletin.bulletin.weekNumber == '') {
        alert("Error: Week number is empty!")
        return
    }
    if (bulletin.bulletin.weekName == null || bulletin.bulletin.weekName == '') {
        alert("Error: Week name is empty!")
        return
    }
    if (bulletin.bulletin.text == null || bulletin.bulletin.text == '') {
        alert("Error: Verse is empty!")
        return
    }
    if (bulletin.bulletin.textName == null || bulletin.bulletin.textName == '') {
        alert("Error: Quotation is empty!")
        return
    }
    if (bulletin.bulletin.body == null || bulletin.bulletin.body == '') {
        alert("Error: Body is empty!")
        return
    }
    if (bulletin.bulletin.prayerPoints.length < 1) {
        alert("Error: There are no prayer points!")
        return
    }
    if(bulletin.id < 1) {
        bulletin.id = makeId()
    }
    let i = 0
    //if (Bulletins.length > 0) {
        Bulletins.forEach(b => {
            if (b.id == bulletin.id) {
                Bulletins.splice(i, 1)
                //Bulletins.push(bulletin)
            }
            i += 1
        })
        Bulletins.push(bulletin)
    
    console.log(Bulletins)
    localStorage.setItem(BulletinsKey, toJsonString(Bulletins))
    Bulletins = toJsonObject(localStorage.getItem(BulletinsKey))
    location.href = `${location.origin}/bulletin.html?bId=${bulletin.id}`
})

print_footer.html(readyFooter(BulletinDefualts));
function readyFooter(bulletinDefualts){
    return `For testimonies or more inquiries contact us via
                <nav class="bf-links">
                    <a href="sms:${bulletinDefualts.phoneNumber};body=" class="bf-link" target="_blank" title="SMS">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                            <path
                                d="M 15.5 5 C 13.205 5 11.18725 6.199 10.03125 8 L 33.5 8 C 37.636 8 41 11.364 41 15.5 L 41 31.96875 C 42.801 30.81175 44 28.795 44 26.5 L 44 15.5 C 44 9.71 39.29 5 33.5 5 L 15.5 5 z M 10.5 10 C 6.9280619 10 4 12.928062 4 16.5 L 4 30.462891 C 4 34.034829 6.9280619 36.962891 10.5 36.962891 L 11 36.962891 L 11 41.498047 C 11 43.449299 13.392719 44.667807 14.970703 43.519531 L 23.988281 36.962891 L 32.5 36.962891 C 36.071938 36.962891 39 34.034829 39 30.462891 L 39 16.5 C 39 12.928062 36.071938 10 32.5 10 L 10.5 10 z M 10.5 13 L 32.5 13 C 34.450062 13 36 14.549938 36 16.5 L 36 30.462891 C 36 32.412953 34.450062 33.962891 32.5 33.962891 L 23.5 33.962891 A 1.50015 1.50015 0 0 0 22.617188 34.248047 L 14 40.515625 L 14 35.462891 A 1.50015 1.50015 0 0 0 12.5 33.962891 L 10.5 33.962891 C 8.5499381 33.962891 7 32.412953 7 30.462891 L 7 16.5 C 7 14.549938 8.5499381 13 10.5 13 z M 15.5 21.962891 C 14.672 21.962891 14 22.634891 14 23.462891 C 14 24.290891 14.672 24.962891 15.5 24.962891 C 16.328 24.962891 17 24.290891 17 23.462891 C 17 22.634891 16.328 21.962891 15.5 21.962891 z M 21.5 21.962891 C 20.672 21.962891 20 22.634891 20 23.462891 C 20 24.290891 20.672 24.962891 21.5 24.962891 C 22.328 24.962891 23 24.290891 23 23.462891 C 23 22.634891 22.328 21.962891 21.5 21.962891 z M 27.5 21.962891 C 26.672 21.962891 26 22.634891 26 23.462891 C 26 24.290891 26.672 24.962891 27.5 24.962891 C 28.328 24.962891 29 24.290891 29 23.462891 C 29 22.634891 28.328 21.962891 27.5 21.962891 z">
                            </path>
                        </svg>
                        ${bulletinDefualts.phoneNumber}
                    </a>
                    <a href="whatsapp://send?abid=${bulletinDefualts.phoneNumber}&text=" class="bf-link" target="_blank" title="WhatsApp">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z">
                            </path>
                        </svg>
                        ${bulletinDefualts.phoneNumber}
                    </a>
                    <a href="mailto:upperchamber20@gmail.com" class="bf-link" target="_blank" title="Email">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M17,21h3c1.65,0,3-1.35,3-3V9.92l-6,4.68V21z M19.5,3c-0.79,0-1.54,0.26-2.16,0.74L17,4.01v8.06l6-4.69V6.5	C23,4.57,21.43,3,19.5,3z M9,5.57v8.06l3,2.34l3-2.34V5.57l-3,2.34L9,5.57z M1,18c0,1.65,1.35,3,3,3h3v-6.4L1,9.92V18z M4.5,3	C2.57,3,1,4.57,1,6.5v0.88l6,4.69V4.01L6.66,3.74C6.04,3.26,5.29,3,4.5,3z">
                            </path>
                        </svg>
                        ${bulletinDefualts.email}
                    </a>
                </nav>`
}

let bulletins_list = $('.bulletins')

function loadBulletins(){
    Bulletins.forEach(element => {
        let b = `
        <a class="b-item" href="bulletin.html?bId=${element.id}" title="" id="${element.id}">
            <div>${element.bulletin.topic}</div>
            <button class="btn" id="del_b_${element.id}">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
                    <path
                        d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z">
                    </path>
                </svg>
            </button>
        </a>`
        $(b).appendTo(bulletins_list)
    });
    initBulletin()
}

function initBulletin() {
    $('.b-item .btn').click((e) => {
        e.preventDefault()
        let target = e.target.closest('.b-item')
        let i = 0
        Bulletins.forEach(element => {
            if (element.id == target.id) {
                Bulletins.splice(i, 1)
                $(target).remove()
            }
            i += 1
        }); 

        localStorage.setItem(BulletinsKey, toJsonString(Bulletins))
        Bulletins = toJsonObject(localStorage.getItem(BulletinsKey))
    })
}