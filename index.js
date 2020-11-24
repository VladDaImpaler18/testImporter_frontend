const URL = "http://localhost:3000";
//fetch data create objects

//categories
Category.fetch(URL);
//questions -- no longer need to do this questions are populated through Category
//Question.fetch(URL);


document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) =>{
        //if user clicks on category do something
        if(e.target.name === "categories"){
            let filteredCategory = e.target.getAttribute("value");
            let listOfQuestions = document.getElementById("questionsList").childNodes
            listOfQuestions.forEach( p => { 
                if(filteredCategory != "All" && p.getAttribute("name") != filteredCategory){p.style.display = "none";}//hides questions UNLESS All is selected
                else{p.style.display = "";}//shows
            })
        }
        //if user clicks on question, show page (and editable parts) appear
        if(e.target.parentElement.id === "questionsList"){
            let chosenQuestion = e.target.innerHTML;
            qChoiceObj = Question.find_by("question", chosenQuestion);
            loadEditPage(qChoiceObj);
        }
        
        //if user clicks ANYWHERE ELSE, nothing happens. When user clicks this specific spot, things happen
        if(e.target != document.querySelector(".dropbtn")){
            let dropdowns = document.getElementsByClassName("dropdown-content");
            for(let i = 0; i < dropdowns.length; i++){
                const openDropdown = dropdowns[i];
                if(openDropdown.classList.contains('show')) { openDropdown.classList.remove('show'); }

            }
        }
    });

    document.addEventListener("submit", (e) => {
        e.preventDefault();
        if(e.submitter === document.getElementById("submitButton")) {
            let form = e.target;
            let params = formToParams(form);
            let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(params)
            };
        fetch("http://localhost:3000/questions", configObj)
            .then(response => response.json())
            .then(obj=>console.log(obj))
            .catch(error=> {
                alert("Error in send");
                console.log(error.message);
            });

        }
    });
});
// End of Dom Loaded
// Load selector
function clear(){
    document.body.innerHTML="";
    console.log("Cleared");
}

function loadQuestionList() //KISS will only do Question for now. It shows all the questions with a dropdown at top, dropdown filters questions
{
    clear();
    //create dropdown with categories at top to filter default: all
    const dropdownNode = document.createElement("DIV");
          dropdownNode.setAttribute("class", "dropdown");
    
    const btn = document.createElement("BUTTON");
          btn.innerText = "Category Filter";
          btn.setAttribute("class", "dropbtn");
          btn.addEventListener("click", (e) => document.getElementById("myDropdown").classList.toggle("show"));
    
    const dropdownContent = document.createElement("DIV");
          dropdownContent.setAttribute("id", "myDropdown");
          dropdownContent.setAttribute("class", "dropdown-content");
    
    //create content for div, links

    dropdownNode.appendChild(btn);
    dropdownNode.appendChild(dropdownContent);
    document.body.appendChild(dropdownNode);
    
    let filterNone = document.createElement("A");
        filterNone.setAttribute("href","#");
        filterNone.setAttribute("name", "categories");
        filterNone.setAttribute("value", "All");
        filterNone.innerText = "Show All";
    dropdownContent.appendChild(filterNone);

    //show all questions || Show filtered results
    Category.all.forEach( category => {
        let c = document.createElement("A");
        c.setAttribute("href","#");
        c.setAttribute("name", "categories");
        c.setAttribute("value", category);
        c.innerText = category;
        dropdownContent.appendChild(c)
    });

    //div that is results
    let questionDiv = document.createElement("DIV");
        questionDiv.setAttribute("id", "questionsList");
    Question.all.forEach( question => {
        let q = document.createElement("P");
        q.setAttribute("name", question.category);
        q.innerText = question.question;
        questionDiv.appendChild(q);
    })
    document.body.appendChild(questionDiv);

}

//Form class?
function formToParams(form_element){
    const params = {};
    const dummies = [];
    let inputFields = form_element.querySelectorAll("input");
    inputFields.forEach( element => { 
        if(element.value){ 
            if(element.name === "dummies") { return dummies.push(element.value); }
            else { return params[element.name] = element.value; }
        }
    });
    params["dummy"] = dummies;
    return params;
}

function loadForm(questionObj){
    clear();
    
    const form = document.createElement("FORM");
          
          form.id="add-question-form";
          form.setAttribute("autocomplete", "off");
    document.body.appendChild(form);

    //diagamInput stuff
    //create that part with eventListener that makes a Labeled Input for the diagram_info
    questionObj.renderLabels(form)

    const submitBtn = document.createElement("BUTTON");
    submitBtn.innerText = "Submit";
    submitBtn.setAttribute("id", "submitButton");
    form.appendChild(submitBtn);
    //add submit button IF new obj
    //if editing, default is 'OK', if things change turn it to "save" and add a "cancel" button

    //input fields will have the values
    //OKAY button on bottom
    //if values have changed, turn OKAY button transforms to SAVE, and add RED CANCEL button
    //if CANCEL revert changes and button becomes OKAY again
    //if SAVE do fetch with PATCH method, save to backend (assuming validations pass)

}
/* Legacy code
function loadForm(){
    clear();

    const div = document.createElement("DIV");
          div.class = "formContainer";
          div.id = "div-for-question";
    
    document.body.appendChild(div);

    const form = document.createElement("FORM");
          form.id="add-question-form";
          form.setAttribute("autocomplete", "off");
    div.appendChild(form);
  
    const formItems = ["question", "answer", ["dummy", "dummy", "dummy"]]; //not a great way but it'll do for now.
    
    const category = document.createElement("DIV");
          category.setAttribute("class", "autocomplete");
          category.setAttribute("style", "width:300px;");

    const categoryInput = document.createElement("INPUT");
          categoryInput.setAttribute("id", "categoryInput");
          categoryInput.setAttribute("type", "text");
          categoryInput.setAttribute("name", "myCategory");
          categoryInput.setAttribute("placeholder", "Category");

    category.appendChild(categoryInput);
    form.appendChild(category);
     


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
                            let additionalRow = makeLabeledInput("dummy",count);
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
     
    autocomplete(document.getElementById("categoryInput"), Category.all);
}*/
