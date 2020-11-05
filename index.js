
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

    pickDummies(requiredNumber=3){
        const dummyQuestions = [];
        //let questionPossibilities = Object.assign({}, this.dummy)
        //try making a list, to remove random questions from so that it takes less work
        let randomNum;

        while(dummyQuestions.length < requiredNumber){
            //as is this if there are the minumum of 3 dummy questions, the while loop CAN run more than 3 times to pick up the questions
            randomNum = this.getRandomDummies;
            if(!dummyQuestions.includes(this.dummy[randomNum])){ dummyQuestions << randomNum }
        }
        return dummyQuestions;
        
    }
    getRandomDummies(){
        let min = Math.ceil(1);
        let max = Math.floor(this.dummy.length);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
      }
}

