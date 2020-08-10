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

window.onload = () => {
    lencheck();
    var length = 0;
    while(length < 4){
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
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="1"><span class="check"></span><span class="txt">1</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="2"><span class="check"></span><span class="txt">2</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="3"><span class="check"></span><span class="txt">3</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="4"><span class="check"></span><span class="txt">4</span>
                            </label>
                        </div>`
        document.getElementById("ques-container").appendChild(div)
        length++ 
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
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="1"><span class="check"></span><span class="txt">1</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="2"><span class="check"></span><span class="txt">2</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="3"><span class="check"></span><span class="txt">3</span>
                            </label>
                            <label class="cont">
                                <input required type="radio" name="questionarray[${length}][correct]" id="questionarray[${length}][correct]" value="4"><span class="check"></span><span class="txt">4</span>
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




var hiddentags = document.getElementById('tags')
var tagarray = []
var taginput = document.getElementById('tag')
taginput.addEventListener('keypress', (e) => {
    
    // console.log(e.key, taginput.value)
    if(e.key === ' '){
        var t = taginput.value
        if(t[0] === ' '){
            t = t.slice(1)
        }
        t = t.toLowerCase();
        var flag = 0;
        if(t.toUpperCase() !== t.toLowerCase() && t[0].toUpperCase() !== t[0].toLowerCase()){
            for(var i=0; i< tagarray.length; i++){
                if( t === tagarray[i]){
                    flag = 1;
                    break;
                }
            }
            if(flag == 0){
                tagarray.push(t);
                var list = tagarray[0];
                for(var j=1; j<tagarray.length; j++){
                    list = list + " " + tagarray[j]
                }
                hiddentags.setAttribute('value', list)

                document.getElementById('tag').removeAttribute('required')
                var div = document.createElement('div')
                div.classList.add("tag")
                div.innerHTML = `<span onclick="deletetag(this);">${t.toLowerCase()}  &#215</span>`
                document.getElementById("tags-container").appendChild(div)
            }
        }

        taginput.value = '';
    }
})

function deletetag(span){
    document.getElementById('tags-container').removeChild(span.parentElement)
    var w = span.innerHTML.slice(0, -3)
    for(var i=0; i< tagarray.length; i++){
        if(w === tagarray[i]){
            tagarray.splice(i, 1)
        }
    }
    var list = tagarray[0];
    for(var j=1; j<tagarray.length; j++){
        list = list + " " + tagarray[j]
    }
    hiddentags.setAttribute('value', list)
    if(document.getElementById('tags-container').childElementCount === 0)
        document.getElementById('tag').setAttribute('required', true)
}