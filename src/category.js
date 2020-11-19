class Category {
    constructor(title){
        this.title = title;
        Category.all.push(this);
    }
    static import(categoryObjs) { //[{}, {}, {}]
        categoryObjs.forEach( elementObj => new Category(elementObj.title) );
    }
    
    static fetch(url,id){
    //url = http://localhost:3000
    if(id){ 
        fetch(`${url}/categories/${id}`)
        .then(response => response.json())
        .then(newCategoryObjs => Category.import(newCategoryObjs)); //returns an array that contains the objects
        }
    else {
        fetch(`${url}/categories`)
        .then(response => response.json())
        .then(newCategoryObjs => Category.import(newCategoryObjs)); //returns an array that contains the objects
        }
    
    }
}
Category.all = [];

