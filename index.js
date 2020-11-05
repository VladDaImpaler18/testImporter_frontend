
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
    
    const keys = ["question", "answer", "dummy"]
    
    
    
    
          makeLabeledInput = (k) => {
    let node = document.createElement("P");
    let inputLabel = document.createElement("LABEL");
        inputLabel.setAttribute("value", `${k}:`);
        inputLabel.innerText=`${k}: `;
        inputLabel.setAttribute("class", "capitalize");
        inputLabel.setAttribute("for", `${k}`)
        
    let inputText = document.createElement("INPUT")
        inputText.setAttribute("name", `${k}`);
        inputText.setAttribute("id", `${k}`);
        inputText.setAttribute("type", "text");
    
    node.appendChild(inputLabel);
    node.appendChild(inputText);

    return document.body.appendChild(node);
    }
     // Create an input element for emailID 
     // var EID = document.createElement("input"); 
     // EID.setAttribute("type", "text"); 
     // EID.setAttribute("name", "emailID"); 
     // EID.setAttribute("placeholder", "E-Mail ID"); 
  

    
}

// classes

class Question {
    constructor(question, answer, dummy=[]){
        this.question = question;
        this.answer = answer;
        this.dummy = dummy;
    }

    pickDummies(requiredNumber=3){
        const dummyQuestions = [];
        //let questionPossibilities = Object.assign({}, this.dummy)
        //try making a list, to remove random questions from so that it takes less work.
        //can combine splice with indexOf to remove random items
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
class QuestionWithDiagram extends Question{
    constructor(question, answer, dummy=[], diagram_info=false){
        super(question);
        super(answer);
        super(dummy);
        this.diagram_info = diagram_info;
    }
}

//blank question -- do i even need it!?
const blank = new Question(
    "If the population of bobcats decreases, what will most likely be the long-term effect on the rabbit population?", "It will increase and then decrease.",
["It will increase, only.", "It will decrease, only.", "It will decrease and then increase."])