
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
    const formItems = ["question", "answer", ["dummy", "dummy", "dummy"]]; //not a great way but it'll do for now.
    //create part to upload diagram
    //create that part with eventListener that makes a Labeled Input for the diagram_info
    //if param[diagram_info] && object.diagram.attached? Then make the object in javascript using the right class
    
    //diagamInput
    formItems.forEach( item => makeAdditionalInput(item) );

    const submitBtn = document.createElement("BUTTON");
    submitBtn.innerText = "Submit";
    submitBtn.setAttribute("id", "submitButton");
    form.appendChild(submitBtn);


    function makeAdditionalInput(item){
        if(Array.isArray(item)){
            for(let i=0; i<item.length; i++){ 
                let row = makeLabeledInput(item[i], i);

                if(i===item.length-1){
                    
                    let plusBtn = document.createElement("BUTTON");
                        //set button identifier for quick find
                        plusBtn.innerText = "+";
                        plusBtn.setAttribute("id", "addButton");
                        plusBtn.addEventListener("click", (e)=> {
                            let count = document.getElementsByName("dummies").length;
                            let btn = e.target;
                            let additionalRow = makeLabeledInput("dummy",count)
                            let dummyInputs = Object.values(document.getElementsByName("dummies"));
                            if (dummyInputs.every(input => input.value)){
                                btn.parentElement.removeChild(btn);
                                additionalRow.appendChild(btn);
                                let submitBtn = document.getElementById("submitButton");
                                form.removeChild(submitBtn);
                                form.appendChild(additionalRow);
                                form.appendChild(submitBtn);
                            }
                            else{
                                dummyInputs.forEach( input => {
                                    if(!input.value){input.placeholder = "Must have input before you can add another"}
                                })
                            }

                        });
                    row.appendChild(plusBtn);
                }
                form.appendChild(row);
            }
        }
        else {
            let row = makeLabeledInput(item);
            form.appendChild(row);
        }
    }

    function makeLabeledInput(item,number = false){
        let node = document.createElement("P");
        let inputLabel = document.createElement("LABEL");
            inputLabel.setAttribute("value", `${item}:`);
            inputLabel.setAttribute("class", "capitalize");
        let inputText = document.createElement("INPUT")
            inputText.setAttribute("type", "text");
            if(number) {
                inputLabel.innerText=`${item}-${number}: `;
                inputLabel.setAttribute("for", `${item}-${number}`); 
                inputText.setAttribute("name", `${item}-${number}`);
                inputText.setAttribute("id", `${item}-${number}`);
            }
            else { 
                inputLabel.innerText=`${item}: `;
                inputLabel.setAttribute("for", `${item}`);
                inputText.setAttribute("name", `${item}`);
                inputText.setAttribute("id", `${item}`);
    
            }
        if(item === "dummy"){ inputText.setAttribute("name", "dummies"); } // document.getElementsByName("dummies") for array of dummies
            
        node.appendChild(inputLabel);
        node.appendChild(inputText);
        return node;
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
        requiredNumber = 3 || requiredNumber;
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

//blank question -- Great for quick testing
const blank = new Question(
    "If the population of bobcats decreases, what will most likely be the long-term effect on the rabbit population?", "It will increase and then decrease.",
["It will increase, only.", "It will decrease, only.", "It will decrease and then increase."])