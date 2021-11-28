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
    first();
});

function first(){
    if (localStorage.length == 0){
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
        localStorage.clear();
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
    $("#calandarForm").hide();
    $('#Tab').html("");
    if($("#Tab").html() == ""){
        $('#Tab').append('<center><p>' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + '</p></center>');
        $('#Tab').append('<button onclick="deleteClasses()" class="form-group btn btn-light col-sm-3">Delete All Classes</button>');
        $('#Tab').append('<div><center><button onclick="minusWeek()" class="form-group btn btn-light col-sm-3"> -1 week </button><button onclick="minusDay()" class="form-group btn btn-light col-sm-3"> -1 day </button><button onclick="plusDay()" class="form-group btn btn-light col-sm-3"> +1 day </button><button onclick="plusWeek()" class="form-group btn btn-light col-sm-3"> +1 week </button></center></div>');
        if(localStorage.length != 0){
            var classArray = [];
            var content = "<center><table><tr><th>Class Name</th><th>Class Type</th><th>Class Number</th><th>Section Number</th><th>Start Time</th></tr>"
            for (i = 0; i <= localStorage.length; i++){
                classArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
            console.log(JSON.parse(localStorage.getItem(classArray[0].name)).type);
            for (var key in localStorage){
                console.log(key)
            }
            for(i = 0; i < localStorage.length; i++){
                if(JSON.parse(localStorage.getItem(classArray[i].name)).days.includes(date.toLocaleDateString('en', {weekday:'long'}))){
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
    $("#calandarForm").validate({
        rules: {
            className: {
                required: true
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

function createForm(){
    $('#Tab').html(" ");
}

function load() {
    console.log("Page load finished");
}
