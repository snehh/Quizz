function len(){
    return (document.getElementById("ques-container").childElementCount);
}

var length = len();

function lencheck(){
    var l = len();
    if (l<=4){
        document.getElementById("remove").classList.add('disable')
    }
    else if (l>=10){
        document.getElementById("add").classList.add('disable')
    }
    else{
        document.getElementById("add").classList.remove('disable')
        document.getElementById("remove").classList.remove('disable')
    }
}

console.log(startinglen, qarray)

window.onload = () => {
    lencheck();
    console.log("A")
    var length = 0;
    while(length < startinglen){
        var div = document.createElement("div");
        div.classList.add("row")
        div.innerHTML = `<div class="col-25">
                            <label for="questionarray[${length}][q]">Question ${length+1}</label>
                        </div>
                        <div class="col-75">
                            <input type="text" required class="question" id="questionarray[${length}][q]" name="questionarray[${length}][q]" value="${qarray[length].q}" placeholder="Question ${length+1}">
                            <input type="text" required class="answer" id="questionarray[${length}][a1]" name="questionarray[${length}][a1]" value="${qarray[length].a1}" placeholder="Option 1">
                            <input type="text" required class="answer" id="questionarray[${length}][a2]" name="questionarray[${length}][a2]" value="${qarray[length].a2}" placeholder="Option 2">
                            <input type="text" required class="answer" id="questionarray[${length}][a3]" name="questionarray[${length}][a3]" value="${qarray[length].a3}" placeholder="Option 3">
                            <input type="text" required class="answer" id="questionarray[${length}][a4]" name="questionarray[${length}][a4]" value="${qarray[length].a4}" placeholder="Option 4">
                        </div>
                        <div class="col-25 ansdiv">
                            <label class="ans" for="questionarray[${length}][correct]">Answer ${length+1}</label>
                        </div>
                        <div class="col-75 ansoption">
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]1" value="1"><span class="check"></span><span class="txt">1</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]2" value="2"><span class="check"></span><span class="txt">2</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]3" value="3"><span class="check"></span><span class="txt">3</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]4" value="4"><span class="check"></span><span class="txt">4</span>
                            </label>
                        </div>`
        document.getElementById("ques-container").appendChild(div)
        length++ 
    }
    var t = 0;
    while(t<startinglen){
        var x = parseInt(qarray[t].correct)
        
        
        if(x === 1){
            var txt = "questionarray[" + (t) + "][correct]" + 1 
            console.log(txt)
            document.getElementById(txt).checked = true
        }
        if(x === 2){
            var txt = "questionarray[" + (t) + "][correct]" + 2 
            document.getElementById(txt).checked = true
        }
        if(x === 3){
            var txt = "questionarray[" + (t) + "][correct]" + 3 
            document.getElementById(txt).checked = true
        }
        if(x === 4){
            var txt = "questionarray[" + (t) + "][correct]" + 4 
            document.getElementById(txt).checked = true
        }

        t++;
    }
}

var add_button = document.getElementById("add")
add_button.addEventListener('click', () => {
    var length = len();
    if(length < 10){
        var div = document.createElement("div");
        div.classList.add("row")
        div.innerHTML = `<div class="col-25">
                            <label for="questionarray[${length}][q]">Question ${length+1}</label>
                        </div>
                        <div class="col-75">
                            <input type="text" required class="question" id="questionarray[${length}][q]" name="questionarray[${length}][q]" placeholder="Question ${length+1}">
                            <input type="text" required class="answer" id="questionarray[${length}][a1]" name="questionarray[${length}][a1]" placeholder="Option 1">
                            <input type="text" required class="answer" id="questionarray[${length}][a2]" name="questionarray[${length}][a2]" placeholder="Option 2">
                            <input type="text" required class="answer" id="questionarray[${length}][a3]" name="questionarray[${length}][a3]" placeholder="Option 3">
                            <input type="text" required class="answer" id="questionarray[${length}][a4]" name="questionarray[${length}][a4]" placeholder="Option 4">
                        </div>
                        <div class="col-25 ansdiv">
                            <label class="ans" for="questionarray[${length}][correct]">Answer ${length+1}</label>
                        </div>
                        <div class="col-75 ansoption">
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]1" value="1"><span class="check"></span><span class="txt">1</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]2" value="2"><span class="check"></span><span class="txt">2</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]3" value="3"><span class="check"></span><span class="txt">3</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]4" value="4"><span class="check"></span><span class="txt">4</span>
                            </label>
                        </div>`
        document.getElementById("ques-container").appendChild(div)
        length = len();
        lencheck();
    }
})

var remove_button = document.getElementById("remove")
remove_button.addEventListener('click', () => {
    var length = len();
    if (length > 4){
        var ques = document.getElementById("ques-container")
        ques.removeChild(ques.lastChild)
        length = len();
        lencheck();
    }
})




