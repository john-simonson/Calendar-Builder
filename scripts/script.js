class Class{
    constructor(Name, Type, Number, Section, Time, Days){
        this.name = Name
        this.type = Type
        this.number = Number
        this.section = Section
        this.time = Time
        this.days = Days
    }
}

var date = new Date();

$(function(){
    $("#calandarForm").hide();
    if(window.navigator.onLine == true){
        parseCalendar();
        console.log(JSON.parse(localStorage.getItem("calendarKey")).length);
    }
    else if(localStorage.getItem("calendarKey") != null){
        academicCalendar = JSON.parse(localStorage.getItem("calendarKey"));
        console.log(JSON.parse(localStorage.getItem("calendarKey")).length);
    }
    else{
        while(window.navigator.onLine == false){
            alert("Error! No Internet to build Academic Calendar please load app with an internet connection!");
        }
    }
    first();
});

function first(){
    if (localStorage.length == 1){
        console.log(localStorage.length);
        displayForm();
    }
    else{
        displayTable();
    }
}

function deleteClasses(){
    var r = confirm("Do you want to delete all classes?");
    if (r == true){
        for (i = 0; i <= localStorage.length; i++){
            if(localStorage.key(i) != "calendarKey"){
                localStorage.removeItem(localStorage.key(i));
            }
        }
    }
    console.log("deleteClasses");   
}

function minusWeek(){
    date.setDate(date.getDate() - 7);
    displayTable();
}

function minusDay(){
    date.setDate(date.getDate() - 1);
    displayTable();
}

function plusWeek(){
    date.setDate(date.getDate() + 7);
    displayTable();
}

function plusDay(){
    date.setDate(date.getDate() + 1);
    displayTable();
}

function displayForm(){
    $('#Tab').html("");
    $("#calandarForm").show();
    validator();
}

function displayTable(){
    var tmpTxt;
    let testString = date.toLocaleDateString('en', { weekday: 'long' });
    $("#calandarForm").hide();
    $('#Tab').html("");
    if($("#Tab").html() == ""){
        $('#Tab').append('<center><p>' + date.toLocaleString('default', {month:'long'}) + ' ' + date.getDate() + ', ' + date.getFullYear() + '</p></center>');
        $('#Tab').append('<button onclick="deleteClasses()" class="form-group btn btn-light col-sm-3">Delete All Classes</button>');
        $('#Tab').append('<div><center><button onclick="minusWeek()" class="form-group btn btn-light col-sm-3"> -1 week </button><button onclick="minusDay()" class="form-group btn btn-light col-sm-3"> -1 day </button><button onclick="plusDay()" class="form-group btn btn-light col-sm-3"> +1 day </button><button onclick="plusWeek()" class="form-group btn btn-light col-sm-3"> +1 week </button></center></div>');
        if(localStorage.length != 1){
            var classArray = [];
            var content = "<center><table><tr><th>Class Name</th><th>Class Type</th><th>Class Number</th><th>Section Number</th><th>Start Time</th></tr>"
            for (i = 0; i <= localStorage.length; i++){
                if(localStorage.key(i) != "calendarKey"){
                    classArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
            console.log((JSON.parse(localStorage.getItem("calendarKey")))[2][0])
            console.log(date.toLocaleString('default', {month:'long'}) + " " + date.getDate());
            for(i=2; i < (JSON.parse(localStorage.getItem("calendarKey")).length); i++){
                if((JSON.parse(localStorage.getItem("calendarKey")))[i][0] == date.toLocaleString('default', {month:'long'}) + " " + date.getDate()){
                    tmpTxt = JSON.parse(localStorage.getItem("calendarKey"))[i][1];
                    tmpTxt = tmpTxt.replace(/\\n/g," ");
                    $('#Tab').append("<center><b><p id='tmpTxt'>" + tmpTxt + "</p></b></center>");
                    console.log(tmpTxt);
                    if((JSON.parse(localStorage.getItem("calendarKey"))[i][2]) == true){
                        testString = "Made Up Day";
                    }
                    if((JSON.parse(localStorage.getItem("calendarKey"))[i][3]) == true){
                        testString = "Monday";
                    }
                }
            }

            for(i = 0; i < (localStorage.length - 1); i++){
                if(JSON.parse(localStorage.getItem(classArray[i].name)).days.includes(testString)){
                    content += "<tr>"
                    content += "<td>" + JSON.parse(localStorage.getItem(classArray[i].name)).name + "</td>";
                    content += "<td>" + JSON.parse(localStorage.getItem(classArray[i].name)).type + "</td>";
                    content += "<td>" + JSON.parse(localStorage.getItem(classArray[i].name)).number + "</td>";
                    content += "<td>" + JSON.parse(localStorage.getItem(classArray[i].name)).section + "</td>";
                    content += "<td>" + JSON.parse(localStorage.getItem(classArray[i].name)).time + "</td>";
                    content += "</tr>"
                }
            }
            content += "</table></center>";
            $('#Tab').append(content);
        }
        else{
            alert("No Classes Found.")
        }
    }
}

function validator(){
    jQuery.validator.addMethod("contains",
        function (value, element, param) {
        var contains = false;
        for (i = 0; i < param.length; i++) {
            if (!(value.includes(param[i]))) {
                contains = true;
            }
        }
        return this.optional(element) || contains;
    },"Error! Reserved Word.");
    $("#calandarForm").validate({
        rules: {
            className: {
                required: true,
                contains: "calendarKey"
            },
            classType: {
                required: true
            },
            classNumber: {
                required: true
            },
            sectionNumber: {
                required: true
            },
            startTime: {
                required: true
            }
        },
        messages: {
            className: "Please Enter a Value.",
            classType: "Please Enter a Value.",
            classNumber: "Please Enter a Value.",
            sectionNumber: "Please Enter a Value.",
            startTime: "Please Enter a Value."
        },
        submitHandler: function() {
            var obj = createTable();
            localStorage.setItem(obj.name, JSON.stringify(obj));
            console.log(JSON.parse(localStorage.getItem(obj.name)));
            alert("Class Added!");
        }
    });
}


function createTable(){
    $('#Tab').html(" ");
    let class_name = $('#className').val();
    let class_type = $('#classType').find('option:selected').text();
    let class_number = $('#classNumber').val();
    let section_number = $('#sectionNumber').val();
    let start_time = $('#startTime').val();
    var days = [];

    if ($('#classDaysMon').is(":checked"))
    {
        days.push("Monday");
    }

    if ($('#classDaysTues').is(":checked"))
    {
        days.push("Tuesday");
    }

    if ($('#classDaysWed').is(":checked"))
    {
        days.push("Wednesday");
    }

    if ($('#classDaysThurs').is(":checked"))
    {
        days.push("Thursday");
    }

    if ($('#classDaysFri').is(":checked"))
    {
        days.push("Friday");
    }

    if ($('#classDaysSat ').is(":checked"))
    {
        days.push("Saturday");
    }

    return (new Class(class_name, class_type, class_number, section_number, start_time, days));
}

function parseCalendar(){
    var url = "https://www.uml.edu/registrar/calendars/2021-fall-undergrad.aspx";
    $.get('https://api.allorigins.win/get?url=' + encodeURIComponent(url) + '&callback=?', function(data){
        var tmp = document.getElementById("txt").innerHTML;
        document.getElementById("txt").innerHTML += "inserting" + data;
        var stack = [];

        $("table > tbody > tr").each(function () {
            stack.push([$(this).find('th').eq(0).text(), $(this).find('td').eq(0).text(), closedFlag($(this).find('td').eq(0).text()), mondayFlag($(this).find('td').eq(0).text())]);

        });
        document.getElementById("txt").innerHTML = tmp;
        console.log(stack);
        localStorage.setItem("calendarKey", JSON.stringify(stack))
        console.log(stack)
        return stack
        
    });
}

function closedFlag(theString){
    if (theString.includes("university closed")) {
        return true
    }
    return false
}

function mondayFlag(theString){
    if (theString.includes("Monday Class Schedule") || theString.includes("Monday class schedule")){
        return true
    }
    return false
}

function createForm(){
    $('#Tab').html(" ");
}

function load() {
    console.log("Page load finished");
}



