const URL = "http://localhost:3000";
var catArr = [];
//fetch data create objects

//categories
Category.fetch(URL);
//questions
Question.fetch(URL);
Category.all.forEach(categoryObj => {
    if(categoryObj.title){ 
        console.log(`I put in value ${categoryObj.title}`);
        catArr.push(categoryObj.title);
    }
    
});
console.log(catArr);

document.addEventListener("DOMContentLoaded", () => {
    
    document.addEventListener("submit", (e) => {
        debugger;
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
    /* click category for auto-complete
    document.addEventListener("click", (e) =>{
        const dropdownContent = document.getElementById("dropdownActual");
        if(e.target === dropdownContent){
            dropdownContent.classList.toggle("show");
        }
        
        
        const categories = [...document.getElementsByName("categories")];
        if(categories.some( category => category.getAttribute("value") === e.target.getAttribute("value")))
        {
            const categoryInput = document.querySelector("input#category");
            categoryInput.setAttribute("value", `${e.target.getAttribute("value")}`);
        }
    })
    */
});

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

// End of Dom Loaded
function loadForm(){

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
     
    autocomplete(document.getElementById("categoryInput"), catArr);
}

