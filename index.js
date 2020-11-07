
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
    document.body.appendChild(div);

    const form = document.createElement("FORM");
          form.id="add-question-form"
          form.class = "add-question-form";
    document.body.appendChild(form);
    const formItems = ["question", "answer", "dummy"] //not a great way but it'll do for now.
    //create part to upload diagram
    //create that part with eventListener that makes a Labeled Input for the diagram_info
    //if param[diagram_info] && object.diagram.attached? Then make the object in javascript using the right class
    
    //diagamInput
    formItems.forEach( item => makeLabeledInput(item));

    const submitBtn = document.createElement("BUTTON");
    submitBtn.innerText = "Submit";
    form.appendChild(submitBtn);

    function makeLabeledInput(item){
        if(item != "dummy"){
            let node = document.createElement("P");
            let inputLabel = document.createElement("LABEL");
                inputLabel.setAttribute("value", `${item}:`);
                inputLabel.innerText=`${item}: `;
                inputLabel.setAttribute("class", "capitalize");
                inputLabel.setAttribute("for", `${item}`)
                
            let inputText = document.createElement("INPUT")
                inputText.setAttribute("name", `${item}`);
                inputText.setAttribute("id", `${item}`);
                inputText.setAttribute("type", "text");
                
            node.appendChild(inputLabel);
            node.appendChild(inputText);
            form.appendChild(node);
        }
        if(item==="dummy"){
            for(let i=1; i<=3; i++){
                
                let node = document.createElement("P");
                let inputLabel = document.createElement("LABEL");
                    inputLabel.setAttribute("value", `${item}-${i}:`);
                    inputLabel.innerText=`${item}-${i}: `;
                    inputLabel.setAttribute("class", "capitalize");
                    inputLabel.setAttribute("for", `${item}-${i}`)
                    
                let inputText = document.createElement("INPUT")
                    inputText.setAttribute("name", `${item}-${i}`);
                    inputText.setAttribute("id", `${item}-${i}`);
                    inputText.setAttribute("type", "text");

                    node.appendChild(inputLabel);
                    node.appendChild(inputText);
                if(i===3){
                    let plusBtn = document.createElement("BUTTON");
                        plusBtn.innerText = "+";
                    node.appendChild(plusBtn);
                }
                form.appendChild(node);
            }

        }
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
        if(requiredNumber > questionPool.length){ return console.log(`Not enough questions to fulfil ${requiredNumber} questions`);} //make a throw and catch exception
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