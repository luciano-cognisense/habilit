var module_number = 0;
var currentModule = "modulo0";

function createModule(modulo,modalidade,area,curso,uc,carga,habilidades){

    console.log(currentModule)
    var divModulos = document.getElementById(currentModule);
    var divClone = divModulos.cloneNode(true);
    
    module_number = module_number+1;
    currentModule = "modulo" + module_number;
    divClone.id = currentModule;
    
    //Novo id para nome_modulo
    divClone.children[0].children[0].id = "id_nome_modulo" + String(module_number);
    divClone.children[0].children[0].innerHTML = "Módulo " + String(module_number);
    //Novo id para modalidade
    divClone.children[0].children[1].id = "id_modalidade" + String(module_number);
    divClone.children[0].children[1].innerHTML = modalidade; 
    //Novo id para nome_curso
    divClone.children[1].children[0].id = "id_nome_curso" + String(module_number);
    divClone.children[1].children[0].innerHTML = curso;
    //Novo id para area
    divClone.children[1].children[1].id = "id_nome_area" + String(module_number);
    divClone.children[1].children[1].innerHTML = area;
    //Novo id para carga_horaria
    divClone.children[2].children[1].id = "id_carga_horaria" + String(module_number);
    divClone.children[2].children[1].innerHTML = carga;
    //Novo id para uc
    divClone.children[2].children[0].id = "id_unidade_curricular" + String(module_number);
    divClone.children[2].children[0].innerHTML = uc;
    //Novo id para id_habilidades
    divClone.children[3].children[1].id = "id_habilidades" + String(module_number);
    divClone.children[3].children[1].innerHTML = habilidades;
    
    divModulos.parentNode.appendChild(divClone);
    document.getElementById("myBtn2").disabled = false; 
}

function mostrarDivHabilidades(id) {
  var divHabilidades = document.getElementById(id);
  divHabilidades.style.display = "block";
}

var modulosList = [];

function editarTexto(id) {
  var modulo = document.getElementById(id);
  var textoAntigo = modulo.innerText;
  
  // Cria um elemento de textarea para edição do texto
  var campoEdicao = document.createElement("textarea");
  campoEdicao.value = textoAntigo;
  
  // Aplica o estilo necessário para tornar o campo de texto visível
  campoEdicao.style.width = "100%";
  campoEdicao.style.height = "50%";
  campoEdicao.style.fontFamily = "Times New Roman";
  campoEdicao.style.resize = "none";
  
  // Substitui o conteúdo da div pelo campo de edição
  modulo.innerHTML = "";
  modulo.appendChild(campoEdicao);
  
  // Define o foco no campo de edição
  campoEdicao.focus();
  
  // Define o evento de saída do campo de edição
  campoEdicao.addEventListener("blur", function() {
    var novoTexto = campoEdicao.value;
    
    // Atualiza o conteúdo da div com o novo texto
    modulo.innerHTML = novoTexto;
  });
}

function printPage(){
    document.getElementById('area-central').style.height = "auto";
    document.getElementById('myBtn').style.visibility = 'hidden';
    document.getElementById('myBtn2').style.visibility = 'hidden';
    window.print();
    document.getElementById('area-central').style.height = "75%";
    document.getElementById('myBtn').style.visibility = 'visible';
    document.getElementById('myBtn2').style.visibility = 'visible';
   
    
    /*var print_div = document.getElementById("print_space");
    var clone_print_div = print_div.cloneNode(true);
    /*var active_elements = document.getElementsByClassName('modulos');
    console.log(active_elements.length);
    console.log(active_elements);
    let cloneUser = { ...active_elements};*/
    
    /*newWindow = window.open("print.html");
    
    var teste = function(){
    var print_space = newWindow.document.getElementById("print_section");
    if(typeof(print_space)!="undefined"){
        console.log(print_space);
        clearInterval(id);
        print_space.appendChild(clone_print_div);  
        }
    }
    var id = setInterval(teste, 100);*/
    
    
    
    
    /*var teste = function(){
    
    console.log(active_elements.length);
    var print_space = newWindow.document.getElementById("print_section");
    if(typeof(print_space)!="undefined"){
        //console.log(print_space);
        for (i=0; i<active_elements.length; i++){
            //var cloneModule = active_elements[i].cloneNode(true);
            print_space.appendChild(cloneUser[i]);
            }
        }
        clearInterval(id);
    }
    var id = setInterval(teste, 100);*/
}