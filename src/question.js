class Question {
    constructor(question, answer, dummy=[], category, diagram_info=false){
        this.question = question;
        this.answer = answer;
        this.dummy = dummy;
        this.category = category;
        this.diagram_info = diagram_info;
    }

    pickDummies(requiredNumber = 3){
        const chosenQuestions = [];
        let questionPool =  [...this.dummy]
        if(requiredNumber > questionPool.length){ return console.log(`Not enough questions to fulfil ${requiredNumber} questions`);} //make a throw and catch exception
        const pickRandomly = (array) => {
            return array[array.length * Math.random() << 0];
        };
        while(chosenQuestions.length < requiredNumber){
            const randomQ = pickRandomly(questionPool); // => "this answer is a dummy answer."
            const pickedQ = questionPool.splice(questionPool.indexOf(randomQ),1); //finds index of the above result, and splices 1 out, returning the one removed
            chosenQuestions.push(randomQ);
            console.log(`chosen length = ${chosenQuestions.length}`);
            console.log(`original array = ${this.dummy.length}`);
        }
        return chosenQuestions;
        
    }
    renderLabels(form){
        Object.keys(this).forEach( (p)=> { //this generates the labels for input fields
            if(typeof this[p] === typeof []){//if an array
                console.log(`we got dummies here. p = ${p}`);
                if(this[p].length > 0){ this[p].forEach(dummyQ => { form.appendChild(createField(p, dummyQ)); }) }
                else{ 
                    form.appendChild(createField(p));
                    form.appendChild(createField(p));
                    form.appendChild(createField(p)); 
                }
            }
            else{
                console.log("we aint dummies");
                form.appendChild(createField(p,this[p] || null));
             }
        });


        function createField(label, value=null){
            let node = document.createElement("P");
            let inputLabel = document.createElement("LABEL");
                inputLabel.setAttribute("value", `${value}:`);
                inputLabel.setAttribute("class", "capitalize");
                inputLabel.innerText=label;
            let inputText = document.createElement("INPUT")
                inputText.setAttribute("type", "text");
                inputText.setAttribute("name", label);
                inputText.setAttribute("id", label);
                inputText.value=value;
            if(label === "dummy"){ inputText.setAttribute("name", "dummies"); }
            node.appendChild(inputLabel);
            node.appendChild(inputText);
            return node;
        }
    }

    static import(questionObjs,category){ //[{}, {}, {}]
        questionObjs.forEach(elementObj => {
            if(elementObj.question){
                    const q = new Question(elementObj.question, elementObj.answer, elementObj.dummy, elementObj.diagram_info); 
                    if(category){q.category = category;}
                    Question.all.push(q);
                    return q;
            }
        });
    }

    
    static fetch(url,id){
        //url = http://localhost:3000
        if(id){ 
            fetch(`${url}/questions/${id}`)
            .then(response => response.json())
            .then(newQuestionObjs => Question.import(newQuestionObjs)); //returns an array that contains the objects
            }
        else {
            fetch(`${url}/questions`)
            .then(response => response.json())
            .then(newQuestionObjs => Question.import(newQuestionObjs)); //returns an array that contains the objects
            }
        
        }
    
    static find_by(key, inquery){ //probably doesn't matter on case sensitivity, will be all auto-inputted
        key = key.toLowerCase();
        inquery = inquery.toLowerCase();
        let result = Question.all.filter( question => question[key].toLowerCase() === inquery );
        if(result.length === 1){ result = result[0]; } //if it finds a single thing it returns it instead of array
        if(result.length === 0){ return false; }
        else{ return result; }
    }
}

Question.all = []
//blank question -- Great for quick testing
const blank = new Question(
    "If the population of bobcats decreases, what will most likely be the long-term effect on the rabbit population?", "It will increase and then decrease.",
["It will increase, only.", "It will decrease, only.", "It will decrease and then increase."],false);
      blank.category = "Biology";