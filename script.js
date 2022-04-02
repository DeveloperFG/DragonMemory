const tabuleiro = document.querySelector('#tabuleiro')

const imagens = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.png',
    'img7.jpg',
    'img8.jpg',
    
];

let codigoHtml = '';

imagens.forEach(img =>(
   
    codigoHtml += `
    <div class='fotosAgentes' data-fotos="${img}"> 
        <img  class="frente" src="img/${img}">
        <img  class="fundo" src="img/fundo.jpg">
    </div>
    `
));

tabuleiro.innerHTML = codigoHtml + codigoHtml


const cards = document.querySelectorAll('.fotosAgentes')

let primeira, segunda;
let bloqueio = false;


(function aleatoria(){
    cards.forEach(card => {
        let numero = Math.floor(Math.random()*16);
        card.style.order = numero;
    });
})();

function verificar(){
    let igual = primeira.dataset.fotos == segunda.dataset.fotos? true:false
    
    if(!igual){
       remover()
    }else{
        reset(igual)
    }
}

function virar(){
    if(bloqueio) return false;
   this.classList.add('flip')

   if(!primeira){
       primeira = this;
       primeira.removeEventListener('click', virar);
       return false
   }
   
   segunda = this;

   verificar();
}

function remover(){
    bloqueio = true;
    setTimeout(()=>{
        primeira.classList.remove('flip')
        primeira.addEventListener('click', virar);
        segunda.classList.remove('flip')
        bloqueio = false;
        primeira = null;
        segunda = null;
    },1000)
}

function reset(igual){
    if(igual){
        primeira.removeEventListener('click', virar);
        segunda.removeEventListener('click', virar);
        [bloqueio, primeira, segunda] = [false, null, null];
    }
}

cards.forEach(c => c.addEventListener('click', virar))