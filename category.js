class Category {
    collection =[];
    constructor(title){
        this.title = title;
        this.collection.push(this);
    }
    static all(){
        return this.collection;
    }
}