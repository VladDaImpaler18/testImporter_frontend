class Category {
    constructor(title){
        this.title = title;
        Category.all.push(this);
    }
    static import(categoryObjs) { //[{}, {}, {}]
        categoryObjs.forEach( elementObj => new Category(elementObj.title) );
    }
}
Category.all = [];

