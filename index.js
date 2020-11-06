
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

    const form = document.createElement("FORM");
          form.class = "add-question-form";
    
    const formItems = ["question", "answer", "dummy"]
    //create part to upload diagram
    //create that part with eventListener that makes a Labeled Input for the diagram_info
    //if param[diagram_info] && object.diagram.attached? Then make the object in javascript using the right class
    
    
    
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
   
}

// classes

class Question {
    constructor(question, answer, dummy=[]){
        this.question = question;
        this.answer = answer;
        this.dummy = dummy;
    }

    pickDummies(requiredNumber){
        requiredNumber = requiredNumber || 3;
        const chosenQuestions = [];
        let questionPool =  [...this.dummy]
        if(requiredNumber > questionPool.length){break;} //make a throw and catch exception
        //try making a list, to remove random questions from so that it takes less work.
        //can combine splice with indexOf to remove random items
        const pickRandomly = (array) => {
            return array[array.length * Math.random() << 0];
        };
        while(chosenQuestions.length < requiredNumber){
            const randomQ = pickRandomly(questionPool);
            questionPool.splice(questionPool.indexOf(randomQ),1);
            chosenQuestions.push(randomQ);
            console.log(`chosen length = ${chosenQuestions.length}`);
            console.log(`original array = ${this.dummy.length}`);
        }
        return chosenQuestions;
        
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

//blank question -- do i even need it!? -- Great for quick testing
const blank = new Question(
    "If the population of bobcats decreases, what will most likely be the long-term effect on the rabbit population?", "It will increase and then decrease.",
["It will increase, only.", "It will decrease, only.", "It will decrease and then increase."])