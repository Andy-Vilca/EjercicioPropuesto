var express = require('express');
var router = express.Router();

let transaccion = {
  curso: '',
  modulos: [],
  pago: '',
  monto: 0
}

const calculo = (pago) => { 
  pago = pago - (0.1 * pago)
  return pago
}

/* GET home page. */
router
  .get('/', function (req, res, next) { res.render('index') })
  .post('/curso', (req, res) => {
    let curso = req.body.cursos
    transaccion.modulos = []
    if (curso == 'Java') {
      transaccion.monto = 1200
    } else if (curso == 'PHP') {
      transaccion.monto = 800
    } else { 
      transaccion.monto = 1500
    }
    transaccion.curso = curso
    res.redirect('/modulos')
   })

router
  .get('/modulos', (req, res) => { res.render('modulos')})
  .post('/modulos', (req, res, next) => { 
    let module = req.body.modulos
    let module1 = req.body.modulos1
    let module2 = req.body.modulos2
    if(module) transaccion.modulos.push(module)
    if(module1) transaccion.modulos.push(module1)
    if (module2) transaccion.modulos.push(module2)
    res.redirect('/pagar')
  })

  router
  .get('/pagar', (req, res) => { res.render('pagar')})
  .post('/pagar', (req, res, next) => { 
    let pagar= req.body.pagar
    if (pagar == 'Efectivo') { 
      transaccion.monto = calculo(transaccion.monto)
      transaccion.pago = pagar
    }else{
      transaccion.pago = 'Tarjeta de credito'
    }
    res.redirect('/resultados')
  })
  router.get('/resultados', (req, res) => {
    res.render('resultados', {transaccion})
  })
module.exports = router;
