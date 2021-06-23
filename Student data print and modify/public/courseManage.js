
myCourse = []

function showCourses() {
    document.querySelector("#errors").innerHTML = ""
    axios.get("http://localhost:3000/courses")
        .then((response)=> {
            myCourse = response.data
            C_createTable(myCourse)
        })
        .catch((error)=> {
            console.log("Error in fetching courses!!!", error)
            document.getElementById("courseTable").innerHTML= ""
        })
}

function C_createTable(myCourse) {
    var table = document.createElement('table')
    table.setAttribute('id', 'courseTable')

    C_createHeaders(table)

    myCourse.forEach((myCourse, index)=> {
        tr = table.insertRow(-1)
        C_addData(tr, myCourse)
        C_addButtons(tr, index)
    })

    C_addEmptyRow(table)

    var div = document.getElementById('container')
    div.innerHTML = ""
    div.appendChild(table)
}

function C_createHeaders(table) {
    var tr = table.insertRow(-1)
    var col = ["ID", "Course ID", "Course Name", "Credits", "Study Year", "Teacher"]
    col.forEach((val)=> {
        var th = document.createElement('th')
        th.innerHTML = val
        tr.appendChild(th)    
    })
}

function C_addData(tr, myCourse) {
    var tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myCourse["_id"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myCourse["id"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myCourse["course_name"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myCourse["credits"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myCourse["study_year"]

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = myCourse["teacher"]
}

function C_addButtons(tr, index) {
    td = document.createElement('label')

    tr.appendChild(td)
    var lblCancel = document.createElement('label')
    lblCancel.innerHTML = "X"
    lblCancel.setAttribute('onclick', 'C_Cancel(this)')
    lblCancel.setAttribute('style', 'display:none;')
    lblCancel.setAttribute('title', 'Cancel')
    lblCancel.setAttribute('id', 'lbl' + index)
    td.appendChild(lblCancel)


    tr.appendChild(td);
    var btSave = document.createElement('input');
    
    btSave.setAttribute('type', 'button');      
    btSave.setAttribute('value', 'Save');
    btSave.setAttribute('id', 'Save' + index);
    btSave.setAttribute('style', 'display:none;');
    btSave.setAttribute('onclick', 'C_Save(this)');       
    td.appendChild(btSave);


    tr.appendChild(td);
    var btUpdate = document.createElement('input');
    
    btUpdate.setAttribute('type', 'button');    
    btUpdate.setAttribute('value', 'Update');
    btUpdate.setAttribute('id', 'Edit' + index);
    btUpdate.setAttribute('style', 'background-color:#44CCEB;');
    btUpdate.setAttribute('onclick', 'C_Update(this)');   
    td.appendChild(btUpdate);


    td = document.createElement('th');
    tr.appendChild(td);
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    
    btDelete.setAttribute('value', 'Delete');
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', 'C_Delete(this)');   
    td.appendChild(btDelete);
}

function C_addEmptyRow(table) {
    tr = table.insertRow(-1);        

    var newCell = tr.insertCell(-1);  

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

    var newCell = tr.insertCell(-1);
    var tBox = document.createElement('input');          
    tBox.setAttribute('type', 'text');
    tBox.setAttribute('value', '');
    newCell.appendChild(tBox);

    //Dropdown list poist tästä korvataan textboxil
    var newCell = tr.insertCell(-1);
    var tBox = document.createElement('input');          
    tBox.setAttribute('type', 'text');
    tBox.setAttribute('value', '');
    newCell.appendChild(tBox);

    td = document.createElement('td');
    tr.appendChild(td);

    var newCell = tr.insertCell(-1);
    var btNew = document.createElement('input');
    btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
    btNew.setAttribute('value', 'Create');
    btNew.setAttribute('id', 'New');
    btNew.setAttribute('style', 'background-color:#207DD1;');
    btNew.setAttribute('onclick', 'C_CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btNew);
}

C_Cancel = function (oButton) {

    oButton.setAttribute('style', 'display:none; float:none;');

    var activeRow = oButton.parentNode.parentNode.rowIndex;

    var btSave = document.getElementById('Save' + (activeRow - 1));
    btSave.setAttribute('style', 'display:none;');

    var btUpdate = document.getElementById('Edit' + (activeRow - 1));
    btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

    var tab = document.getElementById('courseTable').rows[activeRow];

    var tab = document.getElementById('courseTable').rows[activeRow];
    var td = tab.getElementsByTagName("td")[1].innerHTML = myCourse[(activeRow - 1)]["id"];
    var td = tab.getElementsByTagName("td")[2].innerHTML = myCourse[(activeRow - 1)]["course_name"];
    var td = tab.getElementsByTagName("td")[3].innerHTML = myCourse[(activeRow - 1)]["credits"];
    var td = tab.getElementsByTagName("td")[4].innerHTML = myCourse[(activeRow - 1)]["study_year"];
    var td = tab.getElementsByTagName("td")[5].innerHTML = myCourse[(activeRow - 1)]["teacher"];  
}

function C_Update(oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    console.log("Active row = " + activeRow)
    var tab = document.getElementById('courseTable').rows[activeRow];

     
    for (i = 1; i <= 5; i++) {
        var td = tab.getElementsByTagName("td")[i]
        var ele = document.createElement('input')    
        ele.setAttribute('type', 'text');
        ele.setAttribute('value', td.innerText)
        td.innerText = '';
        td.appendChild(ele)
    }

    var lblCancel = document.getElementById('lbl' + (activeRow - 1))
    lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;')

    var btSave = document.getElementById('Save' + (activeRow - 1))
    btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;')


    oButton.setAttribute('style', 'display:none;')
}

C_Delete = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('courseTable').rows[activeRow]
    
    var td = tab.getElementsByTagName("td")[1]
    var id = td.innerHTML
    console.log("ID = ", id)

    axios.delete('http://localhost:3000/courses/' + id)
            .then(function (response) {
                console.log(response.data)
                console.log("Response = ", response.status)
                showCourses()   
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("error in deleting the course", error)
            });
 
}

C_Save = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('courseTable').rows[activeRow];
    
    var td = tab.getElementsByTagName("td")[0];
    
    var td = tab.getElementsByTagName("td")[1];
    var cID = td.childNodes[0].value;
        var id_ = td.childNodes[0].value
        console.log("ID = ", id_)
    
    var td = tab.getElementsByTagName("td")[2];
    var cName = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[3];
    var cCred = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[4];
    var cYear = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[5];
    var cTeach = td.childNodes[0].value;

    var course = {
        id: cID ,
        course_name: cName, 
        credits: cCred, 
        study_year: cYear,
        teacher: cTeach
    }

    console.log("Course = ", course)
    console.log("URL = " + 'http://localhost:3000/courses/' + id_)
    axios.put('http://localhost:3000/courses/' + id_, course)
            .then(function (response) {
                console.log("Response = ", response.status)
                showCourses()   
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("Error: " + error)
            });   
}

C_CreateNew = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('courseTable').rows[activeRow];
    
    var td = tab.getElementsByTagName("td")[0];
        var id_ = td.innerHTML
        console.log("ID = ", id_)
    
    var td = tab.getElementsByTagName("td")[1];
    var cID = td.childNodes[0].value;
    
    var td = tab.getElementsByTagName("td")[2];
    var cName = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[3];
    var cCred = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[4];
    var cYear = td.childNodes[0].value;

    var td = tab.getElementsByTagName("td")[5];
    var cTeach = td.childNodes[0].value;

    var course = {
        id: cID ,
        course_name: cName, 
        credits: cCred, 
        study_year: cYear,
        teacher: cTeach
    }

    console.log("Course = ", course)
    console.log("URL = " + 'http://localhost:3000/courses/' + id_)
    
    axios.post('http://localhost:3000/courses/', course)
            .then(function (response) {
                console.log("Response = ", response.status)
                showCourses()   
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("Error: " + error)
            });   
}