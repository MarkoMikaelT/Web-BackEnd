
function chooseTag() {
    var hashTag = window.location.hash
     console.log("Hash = ", window.location.hash);
     switch(hashTag)
     {
         case "#/students": 
         console.log("Show Students")
            showAllStudents();
            break;
         case "#/courses": 
            console.log("Show Courses")
            showCourses();
            break;
        
        default: 
     }
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("Hello")
        chooseTag()
});
    window.onhashchange = ()=> { 
       chooseTag()
}
