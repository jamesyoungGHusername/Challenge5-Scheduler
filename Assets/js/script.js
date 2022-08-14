
var currentDateDisplay=document.querySelector("#currentDay");
var dayDisplayed=moment();
currentDateDisplay.textContent=dayDisplayed.format("ddd, MMM Do YYYY");
var container = document.querySelector(".container");
var goYesterday = document.querySelector(".yesterday");
var goTomorrow = document.querySelector(".tomorrow");
var eventManager;
//Holds all info and methods concerned with building and operating a single time block on the page.
class TimeBlock{
    constructor(date,hour,currentText,stateString){
        this.date=date;
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
        $button.bind("click",() => {saveInput(this.date,hour,$description,currentText)});
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
const BlockStates = {
    Past:"past",
    Present:"present",
    Future:"future"
}

//Contains info and methods for displaying and operating a full day's schedule worth of time blocks.
class DaySchedule{
    constructor(date,timeBlocks){
        this.date=date;
        console.log(date);
        this.timeBlocks=timeBlocks;
    }
    generateElementsForDay(){
        for (var i=9;i<24;i++){
            var test = new TimeBlock(this.date,i+":00","","past");
            this.timeBlocks.push(test);
            var nextBlock=this.timeBlocks[i-9].returnBlockHTMLFor(i,"",this.returnElementState(this.date,i));
            $(".container").append(nextBlock);
        }
    }
    //returns a block state corresponding to whether a given element's label falls in the past, present, or future.
    returnElementState(elementDate,elementTime){
        var currentMoment=moment();
        var currentDate=currentMoment.format("mm dd YYYY");
        var elementDay=elementDate.format("mm dd YYYY");
        var currentHour=currentMoment.format("HH");
        var elementHour=elementTime;
        if(elementDate.format("mm dd YYYY")==currentDate){
            if (elementHour<currentHour){
                return BlockStates.Past;
            }else if(elementHour==currentHour){
                return BlockStates.Present;
            }else if(elementHour>currentHour){
                return BlockStates.Future;
            }
        }else if(currentMoment.isBefore(elementDate)){
            return BlockStates.Future;
        }else if(currentMoment.isAfter(elementDate)){
            return BlockStates.Past;
        }
    }
}

function advanceDay(){
    dayDisplayed=moment(dayDisplayed).add(1,"days");
    currentDateDisplay.textContent=dayDisplayed.format("ddd MMM Do YYYY");
    removeAllChildNodes(container);
    buildPage();
}

function backADay(){
    dayDisplayed=moment(dayDisplayed).add(-1,"days");
    currentDateDisplay.textContent=dayDisplayed.format("ddd MMM Do YYYY");
    removeAllChildNodes(container);
    buildPage();
}


//Event handler takes a reference to a text area and whatever text it started with and if it has new content saves it to local storage.
function saveInput(date,hour,refToTextArea,startingText){
    console.log(date.format("MM-DD-YYYYTHH"));
    console.log(hour);
    if(refToTextArea.val!=startingText){
        if (hour==9){
            //dang it.
            hour="09";
        }
        var eventToSave=new Event(moment(date.format("YYYY-MM-DDT"+hour)),refToTextArea.val());
        console.log(global.eventToSave.startMoment);
        global.eventManager.addEvent(eventToSave);
    }
    
}

function removeAllChildNodes(from) {
    while (from.firstChild) {
        from.removeChild(from.firstChild);
    }
}

$( document ).ready(function() {
    eventManager = new EventManager();
    console.log(eventManager.eventList);
    eventManager.loadEventsFromLocal();

    buildPage();
});

function buildPage(){
    var day=new DaySchedule(dayDisplayed,[]);
    $(".container").append(day.generateElementsForDay());
}

goTomorrow.addEventListener("click",advanceDay);
goYesterday.addEventListener("click",backADay);

//Inspired by my one true love, the Swift EventKit library, and the EKevent class. Event class contains information regarding a particular event.
class Event{
    constructor(startMoment,eventIdentifier){
        this.startMoment=startMoment;
        //eventIdentifier is also the description.
        this.eventIdentifier=eventIdentifier;
    }
}

//Created upon loading the page, contains and manages a list of events loaded from some source (in this case local storage.)
class EventManager{
    constructor(){
        console.log("in constructor for eventmanager")
        this.eventList=new Array();
        console.log(this.eventList);
    }
    saveEventListToLocal(){
        localStorage.setItem("eventList",JSON.stringify(this.eventList));
    }
    loadEventsFromLocal(){
        this.eventList=JSON.parse(localStorage.getItem("eventList"));
    }
    clearSavedEventList(){
        localStorage.setItem("eventList",null);
    }
    addEvent(event){
        console.log(event);
        console.log(this.eventList);
        this.eventList.push(event);
    }
}

