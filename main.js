document.getElementById("saveBtn").addEventListener('click', function () {
    console.log('click');

    let subject = document.getElementById('Subject');
    let code = document.getElementById('Code');

    if (subject.value == "" && code.value == "") {
        console.log("0");
    }
    else {

        let SubCode = {
            Subject: subject.value,
            Code: code.value
        }

        let MeetingId = localStorage.getItem('MeetingId');
        let meetObj;
        if (MeetingId == null) {
            meetObj = [];
        }
        else {
            meetObj = JSON.parse(MeetingId)
        }

        meetObj.push(SubCode)
        localStorage.setItem("MeetingId", JSON.stringify(meetObj))

        subject.value = "";
        code.value = "";

        let sectionAdd = document.getElementById('SectionAdd')
        sectionAdd.classList.remove('animate__bounceOutRight', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__bounceOutLeft')
        sectionAdd.classList.add('animate__bounceOutRight');
        setTimeout(function () {
            sectionAdd.setAttribute("hidden", true);

            let container = document.getElementById('Container')
            container.removeAttribute("hidden")
            container.classList.remove('animate__bounceOutRight', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__bounceOutLeft')
            container.classList.add('animate__bounceInLeft');
            showCodes();

        }, 500)

        console.log(meetObj);

    }



})

function showCodes() {

    let MeetingId = localStorage.getItem('MeetingId');

    if (MeetingId == null) {
        MeetingId = [];
    }
    else {
        MeetingId = JSON.parse(MeetingId);
    }

    let html = "";

    MeetingId.forEach(function (element, index) {
        console.log(index);
        console.log(element['Subject']);

        html += ` 
        <div id="ActionBox${index}" style="display: flex;">
            <div class="text-box selection ">
                <p><span id="">${element['Subject']}</span> </p>
                <p class="" id="Code${index}">${element['Code']}</p>

                <div class = "tooltip">
                    <span class="tooltiptext">Copied !</span>
                    <button id="${index}" class="btn">
                    <i class="far fa-copy" style="color: white;"></i>
                    </button>
                </div>
            </div>
            <div id="DeleteBox${index}" class="trash-box">
                <i id="Delete${index}" class="far fa-trash-alt trash"></i>
            </div>
        </div>
      
        `;

    });
    document.getElementById('main').innerHTML = html;


    for (let index = 0; index < MeetingId.length; index++) {

        // Copy Code
        document.getElementById(index).addEventListener("click", function () {

            let text = document.getElementById('Code' + index)

            // This class is used to write text on clipboard
            navigator.clipboard.writeText(text.innerText);


        })

        // Trash Show event
        document.getElementById("ActionBox" + index).addEventListener("mouseenter", function () {
            document.getElementById("DeleteBox" + [index]).style.display = "flex";
        })
        document.getElementById("ActionBox" + index).addEventListener("mouseleave", function () {
            document.getElementById("DeleteBox" + [index]).style.display = "none";
        })

        // Delete Event
        document.getElementById("Delete" + index).addEventListener("click", function () {

            let arr = [];
            let codeData = localStorage.getItem("MeetingId");
            arr = JSON.parse(codeData)
            arr.splice(index, 1)
            localStorage.setItem("MeetingId", JSON.stringify(arr))
            console.log(this.id);
            console.log(arr);
            showCodes();

        })


    }

}

showCodes();

document.getElementById('AddBtn').addEventListener("click", function () {

    let container = document.getElementById('Container')
    container.classList.remove('animate__bounceOutRight', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__bounceOutLeft')
    container.classList.add('animate__animated', 'animate__bounceOutRight');

    setTimeout(function () {
        container.setAttribute("hidden", true);
        let sectionAdd = document.getElementById('SectionAdd')
        sectionAdd.classList.remove('animate__bounceOutRight', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__bounceOutLeft')
        sectionAdd.removeAttribute("hidden")
        sectionAdd.classList.add('animate__animated', 'animate__bounceInLeft');
    }, 500)


});


// Back Button Link

document.getElementById('BackBtn').addEventListener("click", function () {

    let sectionAdd = document.getElementById('SectionAdd')
    sectionAdd.classList.remove('animate__bounceOutRight', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__bounceOutLeft')
    sectionAdd.classList.add('animate__bounceOutLeft');
    setTimeout(function () {
        sectionAdd.setAttribute("hidden", true);

        let container = document.getElementById('Container')
        container.removeAttribute("hidden")
        container.classList.remove('animate__bounceOutRight', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__bounceOutLeft')
        container.classList.add('animate__bounceInRight');
        showCodes();

    }, 500)

});

