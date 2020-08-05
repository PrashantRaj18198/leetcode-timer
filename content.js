console.log('loading started')
var root = () => {
    var main = null;
    var timeLimit = null
    const getTimeLimit = (questionLevel) => {
        var timeLimitObject = {
            "Easy": 20,
            "Medium": 1,
            "Hard": 60
        }
        timeLimit = timeLimitObject[questionLevel.innerHTML]
        return timeLimit
        console.log(questionLevel)

    }

    const changeTime = (discussElem, time) => {
        var hours = Math.floor(time/60).toString()
        var minutes = (time - hours * 60).toString()
        if (hours.length == 1)
            hours = '0'+hours
        if (minutes.length == 1)
            minutes = '0'+minutes
        discussElem.innerHTML = `${hours} : ${minutes}` 
    }

    const showEnd = (discussElem) => {
        discussElem.style.color = "red"
    }

    const getdiscussElements = () => {
        // var discussElem = document.querySelectorAll("a[href='/discuss/']")
        var discussElem = document.querySelector('#app > div > div.main__2_tD > div > div > div.editor-wrapper__1ru6 > div > div.content__Ztw- > div > div.container__2zYY > button > span.css-2efsh5-StyledSpan')
        // console.log(discussElem, discussElem.innerHTML)
        var questionLevel = document.querySelector('#app > div > div.main__2_tD > div > div > div.side-tools-wrapper__1TS9 > div > div.css-9z7f7i-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-xailxq-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-10o4wqw > div')

        if (!discussElem || !questionLevel) {
            // console.log('no changeDiscussToTimer', discussElem, questionLevel)
            return [false, false]
        }

        return [discussElem, questionLevel]
    }

    const changeDiscussToTimer = () => {
        const [discussElem, questionLevel] = getdiscussElements()
        if (!discussElem || !questionLevel) {
            return false
        }
        console.log('changeDiscussToTimer', discussElem, questionLevel)
        
        var time = getTimeLimit(questionLevel)
        changeTime(discussElem, time--)
        discussElem.style.color = 'green'
        var timer = null
        timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer)
                showEnd(discussElem)
            }
            changeTime(discussElem, time--)
        }, 1000*10)

        return true
    }
    var counter = 0

    main = setInterval(() => {
        console.log(`setInterval ran ${++counter} times`)
        if (changeDiscussToTimer() || counter == 10) {
            console.log('main cleared')
            clearInterval(main)
        }
    }, 250)
}

window.onload = root()
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     root()
// })