
var currentDateDisplay=document.querySelector("#currentDay");
currentDateDisplay.textContent=moment().format("MMM Do YYYY");
var container = document.querySelector(".container");

class TimeBlock{
    constructor(hour,currentText,stateString){
        this.hour=hour;
        this.currentText=currentText;
        this.stateString=stateString;
    }
    returnBlockHTMLFor(hour, currentText, stateString){
        console.log("in returnBlock");
        var $timeBlock = $("<div>",{"class":"time-block"});
        var $row = $("<div>",{"class":"row justify-content-center"});
        console.log(hour);
        var $hourLabel=returnTimeBlockLabel(hour);
        var $description=returnDescriptionElement(currentText,stateString);
        var $button=returnSaveButtonElement();
        $row.append($hourLabel,$description,$button);
        $timeBlock.append($row);
        return $timeBlock;
    }
    returnTimeBlockLabel(label){
        console.log("in return block label");
        var sameButNoJQuery = document.createElement("div");
        sameButNoJQuery.classList.add("hour", "col-2", "col-lg-1");
        sameButNoJQuery.textContent="label";
        return sameButNoJQuery;
    }
    returnDescriptionElement(currentText,stateString){
        return $("<textArea>",{"class":"description "+stateString+" col-8 col-lg-10","cols":"30","rows":"10",id:"","name":""}).text(currentText);
    }
    returnSaveButtonElement(){
        return $("<button>",{"class":"saveBtn col-2 col-lg-1"}).text('Save');
    }
}
class DaySchedule{
    constructor(date,timeBlocks){
        this.date=date;
        this.timeBlocks=timeBlocks;
    }
    generateElementsForDay(){
        for (var i=9;i<18;i++){
            var test = new TimeBlock(i+":00","","past");
            console.log(test);
            console.log(this.timeBlocks);
            this.timeBlocks.push(test);
            console.log(this.timeBlocks);
            console.log(this.timeBlocks[i-9]);
            var nextBlock=this.timeBlocks[i-9].returnBlockHTMLFor(""+i+":00","","past")
            $(".container").append(nextBlock);
        }
    }
}

for (var i=9;i<18;i++){
    var t=new TimeBlock(""+i+":00","","past");
    container.append(t.returnBlockHTMLFor("9","","past"));
}


// $( document ).ready(function() {
//     for (var i=9;i<18;i++){
//         var t=new TimeBlock(""+i+":00","","past");
//         $(".container").append(t.returnBlockHTMLFor("9","","past"));
//     }
// });
