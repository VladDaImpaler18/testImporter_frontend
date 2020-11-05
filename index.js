
document.addEventListener("DOMContentLoaded", () => {
    
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        //send data as POST to backend controller
        //data is all the input forms with proper labels and 
        // a correct amount of dummy answers

    })
})

// End of Dom Loaded

function loadForm(){
    const div = document.createElement("DIV");
          div.class = "formContainer";
        //same as div.setAttribute('id', "formContainer");

    const form = document.createElement("FORM");
          form.class = "add-question-form";

}

// classes

class Question {
    constructor(question, answer, dummy=[], diagram_info=nil){
        this.question = question;
        this.answer = answer;
        this.diagram_info = diagram_info;
        this.dummy = dummy;
    }

    pickDummies(number=3){

    }
}

