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
        let questionPool =  [...this.dummy];
        if(requiredNumber > questionPool.length){ return console.log(`Not enough questions to fulfil ${requiredNumber} questions`);} //make a throw and catch exception
        const pickRandomly = (array) => {
            return array[array.length * Math.random() << 0];
        };
        while(chosenQuestions.length < requiredNumber){
            const randomQ = pickRandomly(questionPool); // => "this answer is a dummy answer."
            const pickedQ = questionPool.splice(questionPool.indexOf(randomQ),1); //finds index of the above result, and splices 1 out, returning the one removed
            chosenQuestions.push(randomQ);
        }
        return chosenQuestions;
        
    }
    
    renderLabels(form){
        Object.keys(this).forEach( (p)=> { //this generates the labels for input fields
            if(typeof this[p] === typeof []){//if an array
                if(this[p].length > 0){ this[p].forEach(dummyQ => { form.appendChild(createField(p, dummyQ)); }) }
                else{ 
                    form.appendChild(createField(p));
                    form.appendChild(createField(p));
                    form.appendChild(createField(p)); 
                }
            }
            else{
                if(p==="category"){
                    const category = document.createElement("DIV");
                        category.setAttribute("class", "autocomplete");
                        category.setAttribute("style", "width:300px;");

                    const categoryInput = document.createElement("INPUT");
                        categoryInput.setAttribute("id", "category");
                        categoryInput.setAttribute("type", "text");
                        categoryInput.setAttribute("name", "category");
                        categoryInput.setAttribute("placeholder", "Category");
                        categoryInput.value = this[p] || null;
                    
                    category.appendChild(categoryInput);
                    form.prepend(category);
                    autocomplete(document.getElementById("category"), Category.all);
                }
                else{ form.appendChild(createField(p,this[p] || null)); }
             }
        });
        appendPlusButtonToDummies(form);

        function appendPlusButtonToDummies(form){
            let plusBtn = document.createElement("BUTTON");
                plusBtn.innerText = "+";
                plusBtn.setAttribute("id", "addButton");
                plusBtn.addEventListener("click", (e) =>{
                    let btn = e.target;
                    let additionalRow = createField("dummy");
                    let dummyInputs = Object.values(document.getElementsByName("dummies"));
                    if (dummyInputs.every(input => input.value)){
                        additionalRow.appendChild(btn);
                        const diagram_info = document.getElementById("diagram_info").parentElement
                        form.insertBefore(additionalRow, diagram_info);
                        let buttonBin = document.getElementById("buttonBin");
                        buttonBin.parentElement.appendChild(buttonBin);
                    }
                    else{
                        dummyInputs.forEach( input =>{
                            if(!input.value){ input.placeholder = "Must have input before you can add another"; }
                        })
                    }
                });
            const lastIndex = document.getElementsByName("dummies").length-1;
            let lastDummy = document.getElementsByName("dummies")[lastIndex];
            lastDummy.parentElement.appendChild(plusBtn);
        }

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
                if(value){ inputText.placeholder = value; }
                inputText.value=value;
            if(label === "dummy"){ inputText.setAttribute("name", "dummies"); }
            node.appendChild(inputLabel);
            node.appendChild(inputText);
            return node;
        }
    }

    static import(questionObjs,category){ //[{}, {}, {}]
        questionObjs.forEach(elementObj => {
            Question.create(elementObj,category);
        });
    }

    static create(questionObj, category){
            if(typeof questionObj.category != typeof ""){questionObj.category = category;}
            const q = new Question(questionObj.question, questionObj.answer, questionObj.dummy, questionObj.category||category); 
            //if(questionObj.category){q.category = category;} //put this back if i broke something
            if(questionObj.diagram_info){ q.diagram_info = questionObj.diagram_info }
            Question.all.push(q);
            return q;
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
        let result = Question.all.find( question => question[key].toLowerCase() === inquery );
        return result;
    }
}

Question.all = [];
//test & blank question -- Great for quick testing, neither implemented into Question.all
const tester = new Question("If the population of bobcats decreases, what will most likely be the long-term effect on the rabbit population?", "It will increase and then decrease.",
["It will increase, only.", "It will decrease, only.", "It will decrease and then increase."],"Biology", false);

const blank = new Question;