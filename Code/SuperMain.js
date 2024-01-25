let Inputs = document.querySelectorAll('form input')
let Button = document.querySelector('form button')

// Get Books List Form The Page :
let Section = document.querySelector('section')


// Get Books List Form The Page :
let BooksInfo = document.querySelector('ul')

// Get ToggleSwitch Form Header :
let ToggleSwitch = document.querySelector('header label')

// Get Input Search From The Page :
let InputFilter = document.querySelector('.books-info input')

// Books Data Array :
let BooksArray = []
if (window.localStorage.getItem('Books')) {
    BooksArray = JSON.parse(window.localStorage.getItem('Books'))
    AddBookToBooksInfo(BooksArray)
}
if (window.localStorage.getItem('SectionBackground')) {
    // Change Section And BooksInfo BackGround :
    Section.style.backgroundColor = '#00000059'
    BooksInfo.style.backgroundColor = '#e5d3d3'

    // Add Data Attribute To ToggleSwitch :
    ToggleSwitch.querySelector('input').setAttribute('checked', '')
} 

// Add Event On Submit Button :
Button.onclick = function (e) {
    // Prevent Default Mode On Button :
    e.preventDefault()

    // Variable (true As Default) :
    let Status = true;

    // Loop On Inputs :
    Inputs.forEach( x => {
        // Check If The User Enter A Data In Input :
        if (x.value.length === 0) {
            Status = false;
        }
    } )

    // Check If Status Variable Change Or Not :
    if (Status === true) {
        // Check Type Of Data In Inputs[1] :
        if (isNaN(parseInt(Inputs[1].value))) {
            AddBookToBooksArray(Inputs[0].value, Inputs[1].value, Inputs[2].value)
            Inputs.forEach( x => x.value = '')
        } else {
            MistakePopUp(1)
        }
    } else {
        let EmptyInput;
            // Inputs.forEach( (x, i) => x.value === '' ? EmptyInput = i : '') || *** If You Want The Opposite Of What Is Below : ***
            for (let i = 0; i < Inputs.length; i++) {
                if (Inputs[i].value === '' ) {
                    EmptyInput = i;
                    break
                }
            }
            console.log(EmptyInput)
            MistakePopUp(EmptyInput)
    }
}

// PopUp If There Is Some Mistake :
function MistakePopUp(index) {
    // Create PopUp's Element :
    let div = document.createElement('div')
    let span = document.createElement('div')

    // Add TextsNode To Span And Span To Div :
    span.appendChild(document.createTextNode(`x`))
    div.appendChild(span)
    div.appendChild(document.createTextNode(`book's author shouldn't be ${index === 1  && Inputs[1].value !== '' ? 'number' : 'empty'} !`))

    // Add popup Class  To Div :
    div.classList.add('popup')

    // Add Div To Inputs[1] Father :
    Inputs[index].parentElement.append(div)

    Inputs[index].onfocus = function () {
        div.remove()
    }
    Inputs[index].oninput = function () {
        div.remove()
    }
}
function AddBookToBooksArray(BookName, BookAuthor, BookNumber) {
    // Create Book Object :
    let book = {
        Id : Date.now(),
        Name : BookName,
        Author : BookAuthor,
        Number : BookNumber,
        Status : false,
    }

    // Add Book Object To BooksArray :
    BooksArray.push(book)
    
    // Add Book To BooksInfo :
    AddBookToBooksInfo(BooksArray)

    // Add BooksArray To LocalStorage :
    AddBooksArrayToLocalStorage(BooksArray)
}
function AddBookToBooksInfo(BooksArray) {
    BooksInfo.innerHTML = ''
    BooksArray.forEach(x => {
        // Create The Element :
        let Li = document.createElement('li')
        let Span = document.createElement('span')
        let SpanA = document.createElement('span')
        let SpanB = document.createElement('span')
        let Icon = document.createElement('i')

        // Add TextsNode To Spans Elements :
        Span.appendChild(document.createTextNode(x.Name))
        SpanA.appendChild(document.createTextNode(x.Author))
        SpanB.appendChild(document.createTextNode(x.Number))

        // Add Class And DataId To Icon :
        Icon.classList.add('fa-solid', 'fa-trash')
        Icon.setAttribute('DataId', x.Id)
        
        // Add Element To Li :
        Li.appendChild(Span)
        Li.appendChild(SpanA)
        Li.appendChild(SpanB)
        Li.appendChild(Icon)
        
        // Add Class To SpanB ;
        SpanB.classList.add('last')

        // Add Class To Li ;
        Li.classList.add('list')
        
        // Check If X.Status Changed :
        if (x.Status) {
            Li.classList.add('completed')
        }

        // Add Li To BooksInfo :
        BooksInfo.appendChild(Li)
    })
}
function AddBooksArrayToLocalStorage(BooksArray) {

    window.localStorage.setItem('Books', JSON.stringify(BooksArray))
}
ToggleSwitch.onclick = function () {

    // Check If Input Checked :
    if (ToggleSwitch.querySelector('input').checked) {
        // Change Section And BooksInfo BackGround :
        Section.style.backgroundColor = '#00000059'
        BooksInfo.style.backgroundColor = '#e5d3d3'
        
        // Add BackGround Data To LocalStorage :
        window.localStorage.setItem('SectionBackground', '#00000059')
        window.localStorage.setItem('BooksInfoBackground', '#e5d3d3')
    } else {
        document.querySelector('section').style.background = 'none'
        BooksInfo.style.backgroundColor = '#f6f6f6'
        window.localStorage.removeItem('SectionBackground', '#00000059')
        window.localStorage.removeItem('BooksInfoBackground', '#e5d3d3')
    }
}
BooksInfo.addEventListener('click', function (Event) {
    if (Event.target.classList.contains('fa-solid')) {
        BooksArray = BooksArray.filter( x => {
            return x.Id != Event.target.getAttribute('DataId')
        })
        AddBookToBooksInfo(BooksArray)
        AddBooksArrayToLocalStorage(BooksArray)
    } else if (Event.target.classList.contains('list')) {
        BooksArray.forEach( (x) => x.Id == Event.target.querySelector('i').getAttribute('DataId') ? x.Status = true : '')
        AddBookToBooksInfo(BooksArray)
        AddBooksArrayToLocalStorage(BooksArray)
    }
})
InputFilter.oninput = function () {
    if (InputFilter.value.length !== 0) {
        let BooksArrayF = BooksArray.filter((x) => {
            return x.Name.toLowerCase().indexOf(InputFilter.value.toLowerCase()) !== -1
        })
        AddBookToBooksInfo(BooksArrayF)
    } else {
        AddBookToBooksInfo(BooksArray)

    }
}
Inputs.forEach((x, i) => {
    x.onkeydown = function (E) {
        if (E.key === 'ArrowDown' || E.key === 'Enter') {
            Inputs[i + 1] ? Inputs[i + 1].focus() : ''
        }
    }
})






