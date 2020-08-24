var index = 0;

setTime = time
var timeInterval = setInterval(() => {
    document.getElementById('timer').innerHTML = setTime
    if(setTime>0){
        setTime--;
        document.getElementById('timer').innerHTML = setTime
    }else{
        clearInterval(timeInterval)
        submitform(index)
    }
}, 1000)


var createQuesBlock = (index) => {
    document.getElementById('gamemain').innerHTML = 
        `<p>${index+1}. ${ques[index].q}</p>
        <div class="ans" id="1">
            ${ques[index].a1}
        </div>
        <div class="ans" id="2">
            ${ques[index].a2}
        </div>
        <div class="ans" id="3">
            ${ques[index].a3}
        </div>
        <div class="ans" id="4">
            ${ques[index].a4}
        </div>`
}
createQuesBlock(index)

var listeners = () => {
    document.getElementById('1').addEventListener('click', () => {
    if(ques[index].correct === '1') correct()
    else wrong()
    })
    document.getElementById('2').addEventListener('click', () => {
        if(ques[index].correct === '2') correct()
        else wrong()
    })
    document.getElementById('3').addEventListener('click', () => {
        if(ques[index].correct === '3') correct()
        else wrong()
    })
    document.getElementById('4').addEventListener('click', () => {
        if(ques[index].correct === '4') correct()
        else wrong()
    })
}

listeners()

correct = () => {
    if(index+1 < ques.length){
        index++ 
        createQuesBlock(index)
        listeners()
        setTime = time
    }else{
        submitform(index+1)
    }
}

wrong = () => {
    submitform(index)
}

submitform = (val) => {
    var form = document.createElement('form')
    form.id='submitres'
    form.setAttribute('style', 'display: none;')
    form.setAttribute('action', `/live/${id}`)
    form.setAttribute('method', 'POST')
    form.innerHTML = `<input type="text" name="res" id="res" value="${val}"></input>
                        <input type="text" name="total" id="total" value="${ques.length}"></input>
                        <button id="submit" type="submit">submit</button>`
    document.getElementById('gamemain').append(form)
    document.getElementById('submit').click()
}


document.addEventListener('visibilitychange', function(){
    // console.log(document.hidden)
    if(document.hidden === true){
        alert('Quiz has been submitted due to switching tabs')
        document.getElementById('submit').click()
    }
});