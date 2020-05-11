addEventListener('scroll',botao)
addEventListener('load',botao)
document.querySelector('div.subir').addEventListener('click',subir)
/*if(document.querySelector('div.carrinhoFixo')){
    addEventListener('load',carrinhoCompra)
}*/
addEventListener('load',()=>{    
    if(localStorage.ir){
        ir = JSON.parse(localStorage.ir)
        animacao(ir[0],ir[1])
        localStorage.clear('ir')
    }
})
permitir = true
fotos = []
textoPreco = []
precos = []
precototal = []
quantid = []
id = []
textoGLOBAL = ''
totalPreco = 0
posicao = 0
idGLOBAL = 0
ElemPaiGLOBAL = 0
Existe = false
if(!sessionStorage.total){
    sessionStorage.total = JSON.stringify(0)
    sessionStorage.foto = JSON.stringify(fotos)
    sessionStorage.texto = JSON.stringify(textoPreco)
    sessionStorage.precototal = JSON.stringify(precototal)
    sessionStorage.quantidade = JSON.stringify(quantid)
    sessionStorage.id = JSON.stringify(id)
    sessionStorage.preco = JSON.stringify(precos)
    sessionStorage.precoDeTodos = JSON.stringify(totalPreco)
} else if(sessionStorage.total){
    fotos = JSON.parse(sessionStorage.foto)
    textoPreco = JSON.parse(sessionStorage.texto)
    precos = JSON.parse(sessionStorage.preco)
    precototal = JSON.parse(sessionStorage.precototal)
    quantid = JSON.parse(sessionStorage.quantidade)
    id = JSON.parse(sessionStorage.id)
}
if(location.href.split('#').join('').split('/').indexOf('calcular.html') !== -1){
    reescrever()
}
function precoDeTodos(){
    totalPreco = 0
    if(sessionStorage.total){
        for(let i = 0; i < sessionStorage.total; i++){
            if(precototal[i] != null){
                totalPreco += precototal[i]
            }
        }
        if(totalPreco != 0){
            document.querySelector('div.total2').innerHTML = `
                <div class="total"><span class="font">Total:&nbsp;</span>${totalPreco.toLocaleString('pt-br', {style : 'currency', currency: 'BRL'})}</div>
            `
            document.querySelector('div.total2').innerHTML += `
                <button class="btn btn-danger" onclick="limpar()">Limpar Carrinho</button>
            `
        } else {
            document.querySelector('div.total2').innerHTML = ''
        }
        sessionStorage.precoDeTodos = totalPreco 
    }
}
function resize(){
    if(innerWidth < 992 && innerWidth > 768){
        document.getElementById('resize').classList.replace('container', 'container-fluid')
    } else {
        document.getElementById('resize').classList.replace('container-fluid', 'container')
    }
} 
function animacao(id3,menu){
    if(permitir){
        tamanho = pageYOffset == 0 ? 1: pageYOffset
        menu = document.querySelector(`#${menu}`).offsetHeight
        menuTela = document.getElementById(id3).offsetTop - menu < 0 ? 0: document.getElementById(id3).offsetTop - menu  
        permitir = false
        document.querySelector('div.subir').style.display = 'none'  
        if(pageYOffset < menuTela){
            intervalo = setInterval(() =>{
                if(tamanho + 15 < menuTela){
                    tamanho += 15
                } else {
                    tamanho = menuTela
                    clearInterval(intervalo)
                    document.querySelector('div.subir').style.display = 'block'
                    permitir = true    
                } 
                scrollTo(0,tamanho)
            },1)
        } else {
            intervalo = setInterval(() =>{
                if(tamanho - 15 > menuTela){
                    tamanho -= 15
                } else {
                    tamanho = menuTela
                    clearInterval(intervalo)
                    document.querySelector('div.subir').style.display = 'block'
                    permitir = true    
                }
                scrollTo(0,tamanho)
            },1)
        } 
    }
}
function subir(){
    tamanho = pageYOffset == 0 ? 1: pageYOffset
    intervalo = setInterval(() =>{
        if(tamanho - 15 > 0){
            tamanho -= 15
        } else {
            tamanho = 0
            clearInterval(intervalo)
        }
        scrollTo(0,tamanho)
    },1)
}
addEventListener('scroll',() =>{
    if(permitir){
        if(pageYOffset == 0){
            document.querySelector('div.subir').style.display = 'none'
        } else {
            document.querySelector('div.subir').style.display = 'block'
        }
    }
})
function botao(){
    btn = document.querySelector('div.subir')
    posicao = document.elementFromPoint(0,btn.offsetTop)
    cor = getComputedStyle(posicao).backgroundColor
    if(cor == 'rgb(182, 0, 0)' || cor == 'rgb(94, 0, 0)'){
        btn.style.backgroundColor = 'rgb(255, 255, 255)'
        btn.style.color = '#000'
    } else {
        btn.style.backgroundColor = 'rgb(182, 0, 0)'
        btn.style.color =  '#fff'
    }    
}
function compra(ElemPai,inicio,fim,passo,tipo2,id6,texto){
    console.log(inicio)
    idGLOBAL = id6
    textoGLOBAL = texto
    ElemPaiGLOBAL = ElemPai
    valor = ElemPai.getAttribute('value') 
    foto = ElemPai.children[0].children[0].getAttribute('src')
    titulo = ElemPai.children[1].children[0].innerText
    texto2 = ElemPai.children[1].children[1].innerHTML
    document.getElementById('foto').src = foto
    document.getElementById('titulo').innerText = titulo
    document.getElementById('parag').innerHTML = texto2
    document.querySelector('div.compra').style.display = 'block'
    document.querySelector('div.item').style.display = 'block'
    if(!tipo2){
        document.querySelector('div.quantidade').innerHTML = `
            <label style="display: block"> Quantidade: <input type="number" id="quant" min="${inicio}" max="${fim}" step="${passo}"></label>
        `
        document.querySelector('div.quantidade').innerHTML += `
            <button class="btn btn-danger" onclick="validacao2(${valor},${inicio},${fim})">Adicionar no Carrinho</button>
        `
    } else {
        document.querySelector('div.quantidade').innerHTML = `
            <label style="display: block"> Quantidade: <input type="number" id="quant" min="${inicio}" max="${fim}" step="${passo}"></label>
        `
        document.querySelector('div.quantidade').innerHTML += `
            <select id="select">
                <option value="frito">Salgado Frito R$: 25,00</option>
                <option value="congelado">Salgado Congelado R$: 20,00</option>
            </select>
        `
        document.querySelector('div.quantidade').innerHTML += `
            <button class="btn btn-danger" onclick="validacao3(${inicio})">Adicionar no Carrinho</button>
        `
    }
}
function validacao3(inicio){
    numero2 = document.getElementById('quant') 
    if(inicio >= 50){
        if(Number.isInteger(Number(numero2.value / 50)) && numero2.value >= 50 && numero2.value <= 1000){
            switch(document.getElementById('select').value){
                case "frito":
                    valorTipo2 = ElemPaiGLOBAL.getAttribute('data-value2') 
                    idGLOBAL = 'salgFrito'
                    textoGLOBAL = 'Salgadinhos Fritos R$: 25,00 cento'
                    break
                case "congelado":
                    valorTipo2 = ElemPaiGLOBAL.getAttribute('data-value1')
                    idGLOBAL= 'salgCong'
                    textoGLOBAL = 'Salgadinhos Congelados R$: 20,00 cento'
                    break
            }
            carrinho2(valorTipo2,true)
        }
    } else {
        alert(`valor Inválido, digite um número que termine entre 50 ou 00 e que seja maior que 50 e menor que 1000`)
    }
}
function validacao2(preco,inicio,fim){
    id8 = idGLOBAL
    let numero = document.getElementById('quant')
    if(inicio >= 50){
        if(Number.isInteger(Number(numero.value / 50)) && numero.value >= 50 && numero.value <= 1000){
            carrinho2(preco,true)
        } else {
            alert(`valor Inválido, digite um número que termine entre 50 ou 00 e que seja maior que 50 e menor que 1000`)
        }
    } else {
        if(Number(numero.value) >= inicio && Number(numero.value) <= fim){
            carrinho2(preco,false)
        } else {
            alert(`valor Inválido, digite um número entre ${inicio} e ${fim}`)
        }
    }
}
function carrinho2(preco,cento){
    alert('Adicionado ao carrinho! Visite a aba Calcule seu Orçamento.')
    id7 = idGLOBAL
    foto = idGLOBAL
    id7 += '0'
    Quant = document.getElementById('quant').value
    NomeId = JSON.parse(sessionStorage.id)
    i = JSON.parse(sessionStorage.total)
    for(let j = 0; j < i; j++){
        if(NomeId[j] == id7){
            Existe = true 
            fotos[j] = `img/${foto}.jpg`
            textoPreco[j] = textoGLOBAL 
            precos[j] = preco
            quantid[j] = Quant
            id[j] = id7
            sessionStorage.id = JSON.stringify(id)
            if(cento){
                precototal[j] = (precos[j] * quantid[j])/100
            } else {
                precototal[j] = precos[j] * quantid[j]
            }
            sessionStorage.foto = JSON.stringify(fotos)
            sessionStorage.texto = JSON.stringify(textoPreco)
            sessionStorage.preco = JSON.stringify(precos)
            sessionStorage.precototal = JSON.stringify(precototal)
            sessionStorage.quantidade = JSON.stringify(quantid)    
            fechar()
        }
    }
    if(!Existe){
        i = JSON.parse(sessionStorage.total)
        fotos[i] = `img/${foto}.jpg`
        textoPreco[i] = textoGLOBAL 
        precos[i] = preco
        quantid[i] = Quant
        id[i] = id7
        sessionStorage.id = JSON.stringify(id)
        if(cento){
            precototal[i] = (precos[i] * quantid[i])/100
        } else {
            precototal[i] = precos[i] * quantid[i]
        }
        sessionStorage.foto = JSON.stringify(fotos)
        sessionStorage.texto = JSON.stringify(textoPreco)
        sessionStorage.preco = JSON.stringify(precos)
        sessionStorage.precototal = JSON.stringify(precototal)
        sessionStorage.quantidade = JSON.stringify(quantid)  
        sessionStorage.total = JSON.stringify(i += 1)
        fechar()
    }
}
function fechar(){
    document.querySelector('div.compra').style.display = 'none'
    document.querySelector('div.item').style.display = 'none'
}
function ir(id4,menu){
    ir = [id4,menu]
    localStorage.setItem('ir',JSON.stringify(ir))
    location.href = 'index.html'
}
function aparecer(id5,checado,inicioLim,fimLim,salto){
    if(checado){ 
        document.getElementById(id5).parentElement.children[2].innerHTML = `
            <label> Quantidade: <input type="number" min="${inicioLim}" max="${fimLim}" step="${salto}" onchange="validacao(this,${inicioLim},${fimLim})"></label>
        `
        document.getElementById(id5).parentElement.children[2].style.display = 'inline-block'
        if(id5 == 'bolo'){
            alerta()
        }
    } else {
        document.getElementById(id5).parentElement.children[2].style.display = 'none'
        if(document.getElementById(`${id5}0`)){
            remover(document.getElementById(`${id5}0`))
        }
        
    }

}
function validacao(numero,inicio,fim){
    if(inicio >= 50){
        if(Number.isInteger(Number(numero.value / 50)) && numero.value >= 50 && numero.value <= 1000){
            carrinho(numero.parentElement.parentElement.parentElement,numero.parentElement.parentElement.parentElement.children[0].id,numero.value, true)
        } else {
            alert(`valor Inválido, digite um número que termine entre 50 ou 00 e que seja maior que 50 e menor que 1000`)
        }
    } else {
        if(Number(numero.value) >= inicio && Number(numero.value) <= fim){
            carrinho(numero.parentElement.parentElement.parentElement,numero.parentElement.parentElement.parentElement.children[0].id,numero.value, false)
        } else {
            alert(`valor Inválido, digite um número entre ${inicio} e ${fim}`)
        }
    }
}
function carrinho(pai,id2,quant,cento){
    if(!document.getElementById(`${id2}0`)){
        i = JSON.parse(sessionStorage.total) 
        fotos[i] = `img/${id2}.jpg`
        textoPreco[i] = `${pai.children[1].innerText} ` 
        precos[i] = pai.children[0].value
        quantid[i] = quant
        id[i] = `${id2}0`
        sessionStorage.id = JSON.stringify(id)
        if(cento){
            precototal[i] = (precos[i] * quantid[i])/100
        } else {
            precototal[i] = precos[i] * quantid[i]
        }
        sessionStorage.foto = JSON.stringify(fotos)
        sessionStorage.texto = JSON.stringify(textoPreco)
        sessionStorage.preco = JSON.stringify(precos)
        sessionStorage.precototal = JSON.stringify(precototal)
        sessionStorage.quantidade = JSON.stringify(quantid)
        document.querySelector('div.flexbox').innerHTML += `
            <div class="itemCarrinho" id=${id[i]} data-posicao="${i}">
                <img src="${fotos[i]}">
                ${textoPreco[i]} <span class="info"><div class="teste"></div>Quantidade:${quantid[i].toLocaleString('pt-br', {style : 'currency', currency: 'BRL'})} Preço:${precototal[i].toLocaleString('pt-br', {style : 'currency', currency: 'BRL'})} </span>
                <i class="fa fa-minus-circle" onclick="remover(this.parentElement)"></i>
            </div>
        `
        total = JSON.parse(sessionStorage.total)
        sessionStorage.total = JSON.stringify(total += 1)
        precoDeTodos()
    } else {
        i = 0
        i = JSON.stringify(Number(document.getElementById(`${id2}0`).getAttribute('data-posicao')))
        quantid[i] = quant
        if(cento){
            precototal[i] = (precos[i] * quantid[i])/100
        } else {
            precototal[i] = precos[i] * quantid[i]
        }
        sessionStorage.precototal = JSON.stringify(precototal)
        sessionStorage.quantidade = JSON.stringify(quantid)
        document.getElementById(`${id[i]}`).innerHTML = `
            <img src="${fotos[i]}">
            ${textoPreco[i]} <span class="info"> Quantidade:${quantid[i].toLocaleString('pt-br', {style : 'currency', currency: 'BRL'})} Preço:${precototal[i].toLocaleString('pt-br', {style : 'currency', currency: 'BRL'})} </span>
            <i class="fa fa-minus-circle" onclick="remover(this.parentElement)"></i>
        `
        precoDeTodos()
    }
}
function remover(e){
    i = JSON.stringify(Number(e.getAttribute('data-posicao')))
    quantid[i] = null
    precototal[i] = null
    precos[i] = null
    textoPreco[i] = null
    fotos[i] = null 
    id[i] = null 
    sessionStorage.quantidade = JSON.stringify(quantid)
    sessionStorage.precototal = JSON.stringify(precototal)
    sessionStorage.preco = JSON.stringify(precos)
    sessionStorage.texto = JSON.stringify(textoPreco)
    sessionStorage.foto = JSON.stringify(fotos)
    document.getElementById(e.id.replace('0','')).checked = false
    document.getElementById(e.id.replace('0','')).parentElement.children[2].style.display = 'none' 
    precoDeTodos()
    reescrever() 
}
function reescrever(){
    document.querySelector('div.flexbox').innerHTML = ''
    for(let i = 0; i < JSON.parse(sessionStorage.total); i++){
        if(quantid[i] != null){
            document.querySelector('div.flexbox').innerHTML += `
            <div class="itemCarrinho" id=${id[i]} data-posicao="${i}">
                <img src="${fotos[i]}">
                ${textoPreco[i]} <span class="info"><div class="teste"></div>Quantidade:${quantid[i].toLocaleString('pt-br', {style : 'currency', currency: 'BRL'})} Preço:${precototal[i].toLocaleString('pt-br', {style : 'currency', currency: 'BRL'})} </span>
                <i class="fa fa-minus-circle" onclick="remover(this.parentElement)"></i>
            </div>
        `
        }
    }
    precoDeTodos()
}
function limpar(){
    document.querySelector('div.flexbox').innerHTML = ''
    fotos = []
    textoPreco = []
    precos = []
    precototal = []
    quantid = []
    id = []
    totalPreco = 0
    sessionStorage.total = JSON.stringify(0)
    sessionStorage.foto = JSON.stringify(fotos)
    sessionStorage.texto = JSON.stringify(textoPreco)
    sessionStorage.precototal = JSON.stringify(precototal)
    sessionStorage.quantidade = JSON.stringify(quantid)
    sessionStorage.id = JSON.stringify(id)
    sessionStorage.preco = JSON.stringify(precos)
    sessionStorage.precoDeTodos = JSON.stringify(totalPreco)
    let todos = document.querySelectorAll('input')
    for(let i = 0; i < todos.length; i++){
        todos[i].checked = false
        if(todos[i].parentElement.children[2]){
            todos[i].parentElement.children[2].style.display = 'none'
        }
    }
    precoDeTodos()
}
function alerta(){
    alert('O Preço pode mudar de acordo com o bolo, não é um valor fixo, com isso o seu orçamento fica menos eficiente')
}