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
        //if user clicks on navbar link do something
        if(e.target.parentElement && e.target.parentElement.id === "navbar")
        {
            //const selection = e.target.name; //create, show, about
            //if(selection==="create"){loadForm(new Question);}
            switch(e.target.name){
                case "create":
                    console.log("CREATE!");
                    loadForm(new Question)
                    break;
                case "show":
                    console.log("SHOW!");
                    loadQuestionList();
                    break;
                case "about":
                    console.log("ABOUT!");
                    console.log("Data Entry Interface for Blank");
                    clear();
                    break;
            }
        }
        //if user clicks on question, show page (and editable parts) appear
        if(e.target.parentElement && e.target.parentElement.id === "questionsList"){
            let chosenQuestion = e.target.innerHTML;
            const qChoiceObj = Question.find_by("question", chosenQuestion);
            loadForm(qChoiceObj);
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
            .then(newQuestionObj => {
                newQuestion = Question.create(newQuestionObj, newQuestionObj.category.title); //after this, go to show page
                if(!Object.values(Category.all).includes(newQuestionObj.category.title)){ Category.all.push(newQuestionObj.category.title) }
                loadForm(newQuestion);
            })
            .catch(error=> {
                alert("Error in send");
                console.log(error.message);
            });

        }
        else if(e.submitter === document.getElementById("editButton")){
            let form = e.target;
            let origQuestion = formToParams(form, true);
            let params = formToParams(form);
                params["original"] = origQuestion.question;
            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(params)
            };
            fetch(`http://localhost:3000/questions/`, configObj)
            .then(response => response.json())
            .then(modded => {
                const modifiedObj = new Question(modded.question, modded.answer, modded.dummy, modded.category.title, modded.diagram);
                const originalObj = Question.find_by("question", origQuestion.question);
                const indexToUpdate = Question.all.indexOf(originalObj);
                Question.all.splice(indexToUpdate, 1, modifiedObj)
                delete originalObj; //does this free up memory?
                console.log("thing deleted");
                loadForm(modifiedObj);
            })
            .catch(error=> {
                alert("Error in send");
                console.log(error.message);
            });
        }
        else if(e.submitter === document.getElementById("deleteButton")){
            let form = e.target;
            let params = formToParams(form, true);
            let configObj = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(params)
            };
            fetch(`http://localhost:3000/questions/`, configObj)
            .then(response => response.json())
            .then(result => {
                if(result["message"] != "Failed"){
                    const objToDelete = Question.find_by("question", params.question);
                    const indexToDelete = Question.all.indexOf(objToDelete);
                    delete Question.all[indexToDelete]; //does this free up memory?
                    Question.all.splice(indexToDelete, 1);
                    loadQuestionList();
                }
            })
            .catch(error=> {
                alert("Error in delete");
                console.log(error.message);
            });
        }
    });
});
// End of Dom Loaded
// Load selector
function clear(){
    const workspace = document.getElementById("workspace");
          workspace.innerHTML="";
    console.log("Workspace cleared");
}
function navbar(){
    const navbar = document.createElement("DIV");
          navbar.setAttribute("class","navbar");
          navbar.setAttribute("id", "navbar");
          
    let createOption = document.createElement("A");
        createOption.setAttribute("href","#");
        createOption.setAttribute("name", "create");
        createOption.setAttribute("value", "new");
        createOption.innerText = "Create a Question";
    
    let showOption = document.createElement("A");
        showOption.setAttribute("href","#");
        showOption.setAttribute("name", "show");
        showOption.setAttribute("value", "read");
        showOption.innerText = "Question List";

    let aboutOption = document.createElement("A");
        aboutOption.setAttribute("href","#");
        aboutOption.setAttribute("name", "about");
        aboutOption.setAttribute("value", "about");
        aboutOption.innerText = "About";
        aboutOption.style = "float:right"
    
    navbar.appendChild(createOption);
    navbar.appendChild(showOption);
    navbar.appendChild(aboutOption);

    const workspace = document.createElement("DIV");
          workspace.setAttribute("class", "main");
          workspace.setAttribute("id","workspace");
    
    document.body.appendChild(navbar);
    document.body.appendChild(workspace);
}
function loadQuestionList() //KISS will only do Question for now. It shows all the questions with a dropdown at top, dropdown filters questions
{
    clear();
    console.log("Question list loaded");
    const workspace = document.getElementById("workspace");
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
    workspace.appendChild(dropdownNode);
    
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
        q.innerHTML = question.question;
        questionDiv.appendChild(q);
    })
    workspace.appendChild(questionDiv);

}

//Form class?
function formToParams(form_element, placeholderOption){
    const params = {};
    const dummies = [];
    let inputFields = form_element.querySelectorAll("input");
    if(placeholderOption){
        inputFields.forEach( element => {
            if(element.placeholder){
                if(element.name === "dummies") { return dummies.push(element.placeholder); }
                else { return params[element.name] = element.placeholder; }
            }
        });
        params["dummy"] = dummies;
        return params;
    } else{
    inputFields.forEach( element => { 
        if(element.value){ 
            if(element.name === "dummies") { return dummies.push(element.value); }
            else { return params[element.name] = element.value; }
        }
    });
    params["dummy"] = dummies;
    return params;
    }
}

function loadForm(questionObj){
    clear();
    console.log("Form Loaded");
    const workspace = document.getElementById("workspace");
    const form = document.createElement("FORM");
          
          form.id="add-question-form";
          form.setAttribute("autocomplete", "off");
    workspace.appendChild(form);

    //diagamInput stuff
    //create that part with eventListener that makes a Labeled Input for the diagram_info
    questionObj.renderLabels(form)
    const buttonDiv = document.createElement("DIV");
          buttonDiv.setAttribute("id", "buttonBin")
    const submitBtn = document.createElement("BUTTON");
          submitBtn.innerText = "Submit";
          submitBtn.setAttribute("id", "submitButton");
    buttonDiv.appendChild(submitBtn);
    form.appendChild(buttonDiv);

    const editBtn = document.createElement("BUTTON");
          editBtn.innerText = "Update";
          editBtn.setAttribute("id", "editButton");
    submitBtn.parentElement.appendChild(editBtn);

    const deleteBtn = document.createElement("BUTTON");
          deleteBtn.innerText= "Delete";
          deleteBtn.setAttribute("id", "deleteButton");
          deleteBtn.style.background="red";
    submitBtn.parentElement.appendChild(deleteBtn);

    const cancelBtn = document.createElement("BUTTON");
          cancelBtn.innerText= "Cancel";
          cancelBtn.setAttribute("id", "cancelButton");
          cancelBtn.style.background="orange";
          cancelBtn.addEventListener( "click", (e) => {
            e.preventDefault();
            console.log("RECURSIVE!");
            loadForm(questionObj);
          });
    submitBtn.parentElement.appendChild(cancelBtn);


    //below is not KISS, GET WORKING THEN COME BACK TO COMPLICATED!
    /*
    if(Question.find_by("question", questionField.value)){
        //question is already in the system, so we are editing
        const question = Question.find_by("question", questionField.value);
        let inputFields = formToParams(workspace);

        if(isEqual(question, inputFields)){
            //fields are the same
            //set button to OKAY
        }
        else {
            //fields are different
            submitBtn.innerText = "Update";
            submitBtn.setAttribute("id", "updateButton");
            const cancelBtn = document.createElement("BUTTON");
                  cancelBtn.style.background="red";
                  cancelBtn.addEventListener( "click", (e) => {
                    loadForm(question);
                  });
            submitBtn.parentElement.appendChild(cancelBtn);
        }
        if(//all fields (excluding category) are empty){
            //const deleteBtn = document.createElement("BUTTON");
        }
        
        //input fields will have the values
        //OKAY button on bottom
        //if values have changed, turn OKAY button transforms to SAVE, and add RED CANCEL button
        //if CANCEL revert changes and button becomes OKAY again
        //if SAVE do fetch with PATCH method, save to backend (assuming validations pass)
    }else{
        submitBtn.innerText = "Submit";
        submitBtn.setAttribute("id", "submitButton");
    }
    */
    
    //add submit button IF new obj
    //if editing, default is 'OK', if things change turn it to "save" and add a "cancel" button
}

navbar();