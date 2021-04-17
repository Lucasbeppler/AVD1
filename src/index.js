const express = require('express')
const app = express()
app.use(express.json())

const funcionalidades = [ 
    {id:1,diasemana:'sexta-feira',datadaprova:'16/04/21',disciplina:'POO',horario:'21:00hs',professor:'Luiz Claudo'},
    {id:2,diasemana:'quinta-feira',datadaprova:'15/04/21',disciplina:'LPW',horario:'20:00hs',professor:'Luiz Claudo'}
]

app.use((request, response, next) => {
    console.log('Prova de POO')
    return next()  // continuar executar a aplicação
})
//middlware local Crie uma rota para listar a data de prova pelo id. Se o id não existir deverá
//retornar a mensagem: Não existe data da prova com este id. 

const provaexiste = (request, response, next) => {
    const { id } = request.params
    if (!datadaprova[id]) {
    return response
            .status(400)
            .json({error:' Não existe data da prova com este id. '})
}
return next() // se for indice valido o programa tem que continuar entao return next()

// rota para listar todas as datas das provas
}
app.get('/funcionalidades', (request,response) => {
    return response.json(funcionalidades)
})
//Crie uma rota para listar a data de prova pelo id. Se o id não existir deverá
//retornar a mensagem: Não existe data da prova com este id. 

app.get('/funcionalidades/:id', provaexiste, (request, response) => {
    const { id } = request.params
    return response.json(funcionalidades[id])
    })

    // Crie uma rota para incluir a data da prova no array. Deverá ser enviado um json com
//a dia da semana, data da avd, disciplina, horário e professor. Se um destes campos
//não for enviado a aplicação exibirá a mensagem: O campo dia da semana ou data da
// Crie avd ou disciplina ou horário ou professor não existe no corpo da requisição.

    app.post('/funcionalidades',incluirdatadaprova, (request, response) => {
        const { diasemana, datadaprova, disciplina, horario, professor} = request.body
        
        const funcionalidade = {
            diasemana,
            datadaprova,
            disciplina,
            horario,
            professor
        }
        funcionalidades.push(funcionalidade)
        return response.json(funcionalidades)
        
        })

    // Crie uma rota para incluir a data da prova no array. Deverá ser enviado um json com
//a dia da semana, data da avd, disciplina, horário e professor. Se um destes campos
//não for enviado a aplicação exibirá a mensagem: O campo dia da semana ou data da
// Crie avd ou disciplina ou horário ou professor não existe no corpo da requisição.


const incluirdatadaprova = (request, response, next) => {
    if (!request.body.diasemana || !request.body.datadaprova || !request.body.disciplina || !request.body.horario || !request.body.professor ) {
    return response
            .status(400)
            .json({error:' : O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição. '})
}
return next()
}


/*Crie uma rota para alterar a data da prova. Deverá ser enviada o dia da semana, data
da avd, disciplina, horário e professor. Se um destes campos não for enviado a
aplicação exibirá a mensagem: O campo dia da semana ou data da avd ou disciplina
ou horário ou professor não existe no corpo da requisição. Se o id que está sendo
alterado não existir, deverá ser exibida a mensagem. Não existe data da prova com
este íd.*/

app.put('/funcionalidades/:id',provaexiste,  (request, response) => {
    const {professor} = request.body
    const {horario} = request.body
    const {disciplina} = request.body
    const {datadaprova} =request.body
    const { diasemana } = request.body
    const { id } = request.params
   funcionalidades[id] = datadaprova
   funcionalidades[id] = horario
   funcionalidades[id] = professor
   funcionalidades[id] = diasemana
   funcionalidades[id] = disciplina


   if (!id || !diasemana || !datadaprova || !disciplina || !horario || !professor) {
    return response.json({ messagem: 'O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição.'})
  }

   funcionalidades = funcionalidades.map((item) => {
    if (item.id === id) {
      item.diasemana = diasemana
      item.datadaprova = datadaprova
      item.disciplina = disciplina
      item.horario = horario
      item.professor = professor
    }

    return item
  }) 

  return response.json(funcionalidades)
})

  app.delete('/funcionalidades/:id', provaexiste, (request, response) => {
    const { id } = request.params
  
    funcionalidades = funcionalidades.filter(item => {
      if (item.id === id) {
        console.log(item)
      }
      return item.id !== id
    })
  
  
    return response.json(funcionalidades)
  })

 
app.listen(3333, () => {
    console.log('Servidor Rodando!!')
})