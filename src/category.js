class Category {
    constructor(title){
        this.title = title;
    }
    static import(categoryObjs) { //[{}, {}, {}]
        categories = categoryObjs.map( elementObj => {
            if(elementObj.title){
                new Category(elementObj.title);
                console.log(`in import, elementObj.title = ${elementObj.title}`)
                Category.all.push(elementObj.title); //cheating!
            }
        });
    }
    
    static fetch(url,id){
    //url = http://localhost:3000
    if(id){ 
        fetch(`${url}/categories/${id}`)
        .then(response => response.json())
        .then(newCategoryObjs => Category.import(newCategoryObjs))
        }
    else {
        fetch(`${url}/categories`)
        .then(response => response.json())
        .then(newCategoryObjs => Category.import(newCategoryObjs)) //returns an array that contains the objects
        }
    
    }
}
Category.all = [];

