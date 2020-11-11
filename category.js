class Category {
    constructor(title){
        this.title = title;
        Category.all.push(this);
    }
}
Category.all = [];