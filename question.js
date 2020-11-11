class Question {
    constructor(question, answer, dummy=[]){
        this.question = question;
        this.answer = answer;
        this.dummy = dummy;
        Question.all.push(this);
    }

    pickDummies(requiredNumber = 3){
        const chosenQuestions = [];
        let questionPool =  [...this.dummy]
        if(requiredNumber > questionPool.length){ return console.log(`Not enough questions to fulfil ${requiredNumber} questions`);} //make a throw and catch exception
        const pickRandomly = (array) => {
            return array[array.length * Math.random() << 0];
        };
        while(chosenQuestions.length < requiredNumber){
            const randomQ = pickRandomly(questionPool); //"this answer is a dummy answer."
            const pickedQ = questionPool.splice(questionPool.indexOf(randomQ),1); //finds index of the above result, and splices 1 out, returning it
            chosenQuestions.push(randomQ);
            console.log(`chosen length = ${chosenQuestions.length}`);
            console.log(`original array = ${this.dummy.length}`);
        }
        return chosenQuestions;
        
    }
}
class QuestionWithDiagram extends Question{
    constructor(question, answer, dummy=[], diagram_info=false){
        super(question);
        super(answer);
        super(dummy);
        this.diagram_info = diagram_info;
        //Question.all.push(this); Is tihs super'd?
    }
}
Question.all = []
//blank question -- Great for quick testing
const blank = new Question(
    "If the population of bobcats decreases, what will most likely be the long-term effect on the rabbit population?", "It will increase and then decrease.",
["It will increase, only.", "It will decrease, only.", "It will decrease and then increase."])