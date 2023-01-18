//Questions
let questions = [
    {
        q: "2+2*2=",
        a: 6
    },
    {
        q: "2*7=",
        a: 14
    },
    {
        q: "11*11=",
        a: 121
    },
    {
        q: "4! =",
        a: 24
    },
    {
        q: "28/4=",
        a: 7
    }
]

//Variables

let res = []
let is = []
let ball = 0
let uName = ''



function* gen() {
    for (const el of questions) {
        yield el
    }
}

//Main

let generator = gen()

let rl = require('readline')
let fs = require('fs')
let { stdin, stdout } = process
let readline = rl.createInterface({
    input: stdin,
    output: stdout
})

readline.setPrompt('Ismingizni kiriting- ')
readline.prompt()
readline.on('line', (data) => {
    let q = generator.next().value
    if (q?.q) {
        readline.setPrompt(q.q)
        readline.prompt()
        res[res.length] = data

    } else {
        res[res.length] = data
        readline.close()
        uName = res.shift()
        questions.forEach((e, i) => {
            e.a == res[i] ? ball += 1 : ''
            is[is.length] = e.a == res[i]

        })
        let Dete = new Date()
        let userData = {
            name: uName,
            ball: ball,
            responses: is,
            date: `${Dete.getDay()}/${Dete.getMonth() + 1}/${Dete.getFullYear()} ${Dete.getHours()}:${Dete.getMinutes()}:${Dete.getSeconds()}`
        }
        fs.appendFileSync(__dirname + "/data.json", '')

        fs.readFile(__dirname + "/data.json", 'utf-8', (err, data) => {
            if (data) {
                let datas = JSON.parse(data)
                fs.writeFileSync(__dirname + "/data.json", JSON.stringify([...datas, userData], null, 4))

            } else {
                fs.writeFileSync(__dirname + "/data.json", JSON.stringify([userData], null, 4))
            }
        })

        console.log(`Siz ${ball} ball to'pladingiz :)`);

    }
})


