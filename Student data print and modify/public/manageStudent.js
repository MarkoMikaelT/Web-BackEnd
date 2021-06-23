
var myStudent = []
var studentC = []
var gender = ['Male', 'Female'];

function showAllStudents() {
    document.querySelector("#errors").innerHTML = ""
    axios.get("http://localhost:3000/students")
        .then((response)=> {
            myStudent = response.data
            createTable(myStudent)
        })
        .catch((error)=> {
            console.log("Error in fetching students!", error)
            document.getElementById("studentTable").innerHTML = ""
        })
}

function createTable(myStudent) {
    var table = document.createElement('table')
    table.setAttribute('id', 'studentTable')
    createHeaders(table)

    myStudent.forEach((myStudent, index)=> {
        tr = table.insertRow(-1)
        addData(tr, myStudent)
        addButtons(tr, index)
    })

    addEmptyRow(table)

    var div = document.getElementById('container')
    div.innerHTML = ""
    div.appendChild(table)
}

function createHeaders(table) {
    var tr = table.insertRow(-1)
    var col = ["ID", "Student Number", "First name", "Last name", "Email", "Gender", "Attended Course"]
    col.forEach((val)=> {
        var th = document.createElement('th')
        th.innerHTML = val
        tr.appendChild(th)
    })
}

function addData(tr, myStudent) {
    var tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myStudent["_id"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myStudent["student_number"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myStudent["first_name"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myStudent["last_name"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myStudent["email"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myStudent["gender"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myStudent["atCourse"]
}

function addButtons(tr, index) {
    td = document.createElement('label')

    tr.appendChild(td)
    var lblCancel = document.createElement('label')
    lblCancel.innerHTML = "X"
    lblCancel.setAttribute('onclick', 'Cancel(this)')
    lblCancel.setAttribute('style', 'display:none;')
    lblCancel.setAttribute('title', 'Cancel')
    lblCancel.setAttribute('id', 'lbl' + index)
    td.appendChild(lblCancel)

    // *** SAVE.
    tr.appendChild(td);
    var btSave = document.createElement('input');
    
    btSave.setAttribute('type', 'button');      
    btSave.setAttribute('value', 'Save');
    btSave.setAttribute('id', 'Save' + index);
    btSave.setAttribute('style', 'display:none;');
    btSave.setAttribute('onclick', 'Save(this)');       
    td.appendChild(btSave);
    
    // *** UPDATE.
    tr.appendChild(td);
    var btUpdate = document.createElement('input');
    
    btUpdate.setAttribute('type', 'button');    
    btUpdate.setAttribute('value', 'Update');
    btUpdate.setAttribute('id', 'Edit' + index);
    btUpdate.setAttribute('style', 'background-color:#44CCEB;');
    btUpdate.setAttribute('onclick', 'Update(this)');   
    td.appendChild(btUpdate);
    
    // *** DELETE.
    td = document.createElement('th');
    tr.appendChild(td);
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    
    btDelete.setAttribute('value', 'Delete');
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', 'Delete(this)');   
    td.appendChild(btDelete);
}

function addEmptyRow(table) {
    tr = table.insertRow(-1);           // CREATE THE LAST ROW.

    var newCell = tr.insertCell(-1);  // EMPTY CELL FIRST 

    // CREATE AND ADD A TEXTBOX.
    var newCell = tr.insertCell(-1);
    var tBox = document.createElement('input');          
    tBox.setAttribute('type', 'text');
    tBox.setAttribute('value', '');
    newCell.appendChild(tBox);

    // CREATE AND ADD A TEXTBOX.
    var newCell = tr.insertCell(-1);
    var tBox = document.createElement('input');          
    tBox.setAttribute('type', 'text');
    tBox.setAttribute('value', '');
    newCell.appendChild(tBox);

    var newCell = tr.insertCell(-1);
    var tBox = document.createElement('input');          
    tBox.setAttribute('type', 'text');
    tBox.setAttribute('value', '');
    newCell.appendChild(tBox);

    var newCell = tr.insertCell(-1);
    var tBox = document.createElement('input');          
    tBox.setAttribute('type', 'text');
    tBox.setAttribute('value', '');
    newCell.appendChild(tBox);

    // CREATE AND ADD A DROPDOWN LIST.
    newCell = tr.insertCell(-1);
    var select = document.createElement('select');      
    select.innerHTML = '<option value=""></option>';
    gender.forEach(function(gender_name) {
        select.innerHTML +=
            '<option value="' + gender_name + '">' + gender_name + '</option>';
    })
    newCell.appendChild(select);

    var newCell = tr.insertCell(-1);
    var Cselect = document.createElement('select')
    axios.get('http://localhost:3000/courses/')
        .then((response)=> {
            studentC = response.data
            //console.log(studentC)
            studentC.forEach((id)=> {
                Cselect.innerHTML +=
                '<option value="' + id.course_name + '">' + id.course_name + '</option>'
            })
        })
        .catch((error)=> {
            console.log("Error in Courses", error)
        })
    newCell.appendChild(Cselect)
        


    td = document.createElement('td');
    tr.appendChild(td);

    var newCell = tr.insertCell(-1);
    var btNew = document.createElement('input');
    btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
    btNew.setAttribute('value', 'Create');
    btNew.setAttribute('id', 'New');
    btNew.setAttribute('style', 'background-color:#207DD1;');
    btNew.setAttribute('onclick', 'CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btNew);
}

Cancel = function (oButton) {

    // HIDE THIS BUTTON.
    oButton.setAttribute('style', 'display:none; float:none;');

    var activeRow = oButton.parentNode.parentNode.rowIndex;

    // HIDE THE SAVE BUTTON.
    var btSave = document.getElementById('Save' + (activeRow - 1));
    btSave.setAttribute('style', 'display:none;');

    // SHOW THE UPDATE BUTTON AGAIN.
    var btUpdate = document.getElementById('Edit' + (activeRow - 1));
    btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

    // Fetch the old data back to the table
    var tab = document.getElementById('studentTable').rows[activeRow];

    // Fetch the old data back to the table
    var tab = document.getElementById('studentTable').rows[activeRow];
    var td = tab.getElementsByTagName("td")[1].innerHTML = myStudent[(activeRow - 1)]["student_number"];
    var td = tab.getElementsByTagName("td")[2].innerHTML = myStudent[(activeRow - 1)]["first_name"];
    var td = tab.getElementsByTagName("td")[3].innerHTML = myStudent[(activeRow - 1)]["last_name"];
    var td = tab.getElementsByTagName("td")[4].innerHTML = myStudent[(activeRow - 1)]["email"];
    var td = tab.getElementsByTagName("td")[5].innerHTML = myStudent[(activeRow - 1)]["gender"];
    var td = tab.getElementsByTagName("td")[6].innerHTML = myStudent[(activeRow - 1)]["atCourse"] 
}

// EDIT DATA.
function Update(oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    console.log("Active row = " + activeRow)
    var tab = document.getElementById('studentTable').rows[activeRow];
    console.log(tab)

    S_atCourse = ", " + tab.getElementsByTagName("td")[6].innerHTML //<=====

    // First cell [0] is for id and this is not edited        
    for (i = 1; i <= 6; i++) {
        // SHOW A DROPDOWN LIST WITH A LIST OF GENDERS.
        if (i == 5) {
            var td = tab.getElementsByTagName("td")[i];
            var ele = document.createElement('select');      // DROPDOWN LIST.
            ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
            for (k = 0; k < gender.length; k++) {
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + gender[k] + '">' + gender[k] + '</option>';
            }
            td.innerText = '';
            td.appendChild(ele);
        }
        else if(i == 6) {
            var td = tab.getElementsByTagName("td")[i];
            var ele = document.createElement('select');
             // ele.setAttribute("multiple", "Select1")     
            ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
            axios.get('http://localhost:3000/courses/')
                .then((response)=> {
                studentC = response.data
                for (k = 0; k < studentC.length; k++) {
                     ele.innerHTML = ele.innerHTML +
                        '<option value="' + studentC[k].course_name + '">' + studentC[k].course_name + '</option>';
                }
            })
            .catch((error)=> {
                console.log("Error in courses", error)
            })
            td.innerText = '';
            td.appendChild(ele);
        }
        else {
            var td = tab.getElementsByTagName("td")[i];
            var ele = document.createElement('input');    // TEXTBOX.
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', td.innerText);
            td.innerText = '';
            td.appendChild(ele);
        }
    }

    var lblCancel = document.getElementById('lbl' + (activeRow - 1));
    lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

    var btSave = document.getElementById('Save' + (activeRow - 1));
    btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

    // HIDE THIS BUTTON.
    oButton.setAttribute('style', 'display:none;');
};


// DELETE DATA.
Delete = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('studentTable').rows[activeRow];
    
    var td = tab.getElementsByTagName("td")[1];
    var id = td.innerHTML;
    console.log("ID = ", id)

    axios.delete('http://localhost:3000/students/' + id)
            .then(function (response) {
                //console.log(response.data)
                console.log("Response = ", response.status)
                showAllStudents()   
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("error in deleting the student", error)
            }); 

};

// SAVE DATA.
Save = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('studentTable').rows[activeRow];

    var td = tab.getElementsByTagName("td")[0];
    
    var td = tab.getElementsByTagName("td")[1];
    var student_number = td.childNodes[0].value;
    var id = td.childNodes[0].value
    console.log("ID = ", id)
    
    var td = tab.getElementsByTagName("td")[2];
    var first_name = td.childNodes[0].value;
    //console.log("ID = ", td)

    var td = tab.getElementsByTagName("td")[3];
    var last_name = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[4];
    var email = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[5];
    var gender = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[6];
    var NewCourse = td.childNodes[0].value;
    
    

    var student = {
        student_number: student_number,
        first_name: first_name, 
        last_name: last_name, 
        email: email,
        gender: gender,
        atCourse: [] //Miten saisi monta ??
    }

    
    if(NewCourse != S_atCourse) {
        console.log("MITÖEÖEÖE")
        student.atCourse.push(NewCourse)
    }

    student.atCourse = NewCourse.concat(S_atCourse)

    console.log(student.atCourse)

    //VÄhän köykänen mut toimii jotenki :)


    //UPDATE pitää olla student_number johon päivittää???!!!!

    console.log("Student = ", student)
    console.log("URL = " + 'http://localhost:3000/students/' + id)
    axios.put('http://localhost:3000/students/' + id, student)
            .then(function (response) {
                console.log(response.data)
                console.log("Response = ", response.status)
                showAllStudents()   
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("Error: " + error)
            });   
}

// CREATE NEW.
CreateNew = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('studentTable').rows[activeRow];

    var td = tab.getElementsByTagName("td")[0];
    var id = td.innerHTML;
    console.log("ID = ", id)
    
    var td = tab.getElementsByTagName("td")[1];
    var student_number = td.childNodes[0].value;
    
    var td = tab.getElementsByTagName("td")[2];
    var first_name = td.childNodes[0].value;
    //console.log("ID = ", td)

    var td = tab.getElementsByTagName("td")[3];
    var last_name = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[4];
    var email = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[5];
    var gender = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[6];
    var atCourse = td.childNodes[0].value;

    var student = {
        student_number: student_number,
        first_name: first_name, 
        last_name: last_name, 
        email: email,
        gender: gender,
        atCourse: atCourse
    }

    axios.post('http://localhost:3000/students/', student)
            .then(function (response) {
                console.log("Response = ", response.status)
                showAllStudents()   
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("error in saving the student", error)
            }); 
}