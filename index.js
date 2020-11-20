const URL = "http://localhost:3000";
//fetch data create objects

//categories
Category.fetch(URL);
//questions -- no longer need to do this questions are populated through Category
//Question.fetch(URL);


document.addEventListener("DOMContentLoaded", () => {
    
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

function loadShow(modelObj)
{
    clear();
    //create dropdown with categories at top to filter default: all
    //show all questions || Show filtered results
    

    //check if it's a specific object (show), or all of them (index)

    //model must be object with properties(keys)
    const labels = Object.keys(modelObj);
    //properties(keys) will create labels
    makeLabeledInput
    //input fields will have the values
    //OKAY button on bottom
    //if values have changed, turn OKAY button transforms to SAVE, and add RED CANCEL button
    //if CANCEL revert changes and button becomes OKAY again
    //if SAVE do fetch with PATCH method, save to backend (assuming validations pass)
    debugger;

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
     
    //create part to upload diagram
    //create that part with eventListener that makes a Labeled Input for the diagram_info
    //if param[diagram_info] && object.diagram.attached? Then make the object in javascript using the right class
    
  
    //diagamInput stuff

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
}
//end of form class?
loadForm();