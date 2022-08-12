
var currentDateDisplay=document.querySelector("#currentDay");
currentDateDisplay.textContent=moment().format("MMM Do YYYY");
var container = document.querySelector(".container");

//Holds all info and methods concerned with building and operating a single time block on the page.
class TimeBlock{
    constructor(hour,currentText,stateString){
        this.hour=hour;
        this.currentText=currentText;
        this.stateString=stateString;
    }
    returnBlockHTMLFor(hour, currentText, stateString){
        var $timeBlock = $("<div>",{"class":"time-block"});
        var $row = $("<div>",{"class":"row justify-content-center"});
        var $hourLabel=this.returnTimeBlockLabel(hour);
        var $description=this.returnDescriptionElement(currentText,stateString);
        var $button=this.returnSaveButtonElement(hour);
        //same as add event listener, but this is a jQuery object;
        $button.bind("click",() => {saveInput($description,currentText)});
        $row.append($hourLabel,$description,$button);
        $timeBlock.append($row);
        return $timeBlock;
    }
    returnTimeBlockLabel(label){
        return $("<div>",{"class":"hour col-2 col-lg-1",id:label}).text(label);
    }
    returnDescriptionElement(currentText,stateString){
        return $("<textArea>",{"class":"description "+stateString+" col-8 col-lg-10","cols":"30","rows":"10",id:"","name":""}).text(currentText);
    }
    returnSaveButtonElement(ID){

        return $("<button>",{"class":"saveBtn col-2 col-lg-1",id:ID}).text('Save');

    }
}
//enumerator of possible block states governing their coloring.
const blockStates = {
    Past:"past",
    Present:"present",
    Future:"future"
}
//Contains info and methods for displaying and operating a full day's schedule worth of time blocks.
class DaySchedule{
    constructor(date,timeBlocks){
        this.date=date;
        this.timeBlocks=timeBlocks;
    }
    generateElementsForDay(){
        for (var i=9;i<18;i++){
            var test = new TimeBlock(i+":00","","past");
            this.timeBlocks.push(test);
            var nextBlock=this.timeBlocks[i-9].returnBlockHTMLFor(""+i+":00","","past")
            $(".container").append(nextBlock);
        }
    }
}


//Event handler takes a reference to a text area and whatever text it started with and if it has new content saves it to local storage.
function saveInput(refToTextArea,startingText){
    console.log("pretend this is saving "+refToTextArea.val());
}

$( document ).ready(function() {
    var day=new DaySchedule(moment(),[]);
    $(".container").append(day.generateElementsForDay());
});


