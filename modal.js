var modal = document.getElementById("myModal");

var listArea = [];

function loadInitialList(){
    const lista1 = filtrarLinhasPorColuna(dadosBrutos, "ORIGEM", "CT 60x40",  "ÁREA");
    const lista2 = filtrarLinhasPorColuna(dadosBrutos, "ORIGEM", "FIC DIGITAL", "ÁREA");
    const listaCombinada = lista1.concat(lista2);
    const listaCombinadaUnica = obterValoresUnicosArray(listaCombinada);
    console.log(listaCombinadaUnica);
    listArea = listaCombinadaUnica;
    clearSelectList("sl_area");
    //clearSelectList("sl_curso");
    clearSelectList("sl_uc");
    /*clearSelectList("sl_habilidades");*/
    slHabilidades.innerHTML = null;
    //clearSelectList("sl_carga_horaria");
    slCarga.innerHTML = null;
    const title = "Curso Original: ";
    slCursoInner.innerHTML = title.bold();
    updateLists("sl_area",listArea);
}

function updateLists(select_id,lista){
    var select = document.getElementById(select_id);
   
    for (var i = 0; i < lista.length; i++) {
      var optn = lista[i];
      var el = document.createElement("option");
      el.textContent = optn;
      //el.value = optn;
      select.appendChild(el);
   }
}

function clearSelectList(select_id){
    var select = document.getElementById(select_id);
    console.log(select);
    select.options.length = 1;
    select.value = select.options[0].value;
}

var struct_modulos = {
    name_modulo: "Módulo",
    modalidade: "EAD",
    name_area: null,
    name_curso: null,
    name_uc: null,
    carga_horaria: null,
    habilidades: null
};

const slModalidade = document.getElementById('sl_modalidade');
const slArea = document.getElementById('sl_area');
//const slCurso = document.getElementById('sl_curso');
const slCursoInner = document.getElementById('sl_curso_inner');
const slUc = document.getElementById('sl_uc');
const slHabilidades = document.getElementById('sl_habilidades');
const slCarga = document.getElementById('sl_carga_horaria');

slModalidade.addEventListener('change', function() {
  const selectedOption = slModalidade.options[slModalidade.selectedIndex].value;
  struct_modulos.modalidade = selectedOption;
  //resultDiv.innerText = `Opção selecionada: ${selectedOption}`;
});

slArea.addEventListener('change', function() {
  
  const selectedOption = slArea.options[slArea.selectedIndex].value;
  const title = "Área: ";
  struct_modulos.name_area = title.bold() + selectedOption;
  //slCurso.disabled = false;
  slUc.disabled = false;
  const lista = filtrarLinhasPorColuna(dadosBrutos, "ÁREA", selectedOption, "CURSO");
  const listaModulos = filtrarLinhasPorColuna(dadosBrutos, "ÁREA", selectedOption, "MÓDULO UNIDADE CURRICULAR");
  const listaUnica = obterValoresUnicosArray(lista);
  const listaModulosUnica = obterValoresUnicosArray(listaModulos);
  
  //clearSelectList("sl_curso");
  //updateLists("sl_curso",listaUnica);
  
  clearSelectList("sl_uc");
  updateLists("sl_uc",listaModulosUnica);
    
  slHabilidades.innerHTML = null;
  console.log(String(selectedOption));
  //resultDiv.innerText = `Opção selecionada: ${selectedOption}`;
});

/*slCurso.addEventListener('change', function() {
  const selectedOption = slCurso.options[slCurso.selectedIndex].value;
  const title = "Curso Original: ";
  struct_modulos.name_curso = title.bold() + selectedOption;
  slUc.disabled = false;
  const lista = filtrarLinhasPorColuna(dadosBrutos, "CURSO", selectedOption, "MÓDULO UNIDADE CURRICULAR");
  const listaUnica = obterValoresUnicosArray(lista);
  console.log(lista);
  console.log(listaUnica);
  
  clearSelectList("sl_uc");
  slHabilidades.innerHTML = null;
  updateLists("sl_uc",listaUnica);
    
  console.log(String(selectedOption));
  //resultDiv.innerText = `Opção selecionada: ${selectedOption}`;
});*/

slUc.addEventListener('change', function() {
  const selectedOption = slUc.options[slUc.selectedIndex].value;
  const title = "Unidade Curricular: ";
  struct_modulos.name_uc = title.bold() + selectedOption;
  
  const lista = filtrarLinhasPorColuna(dadosBrutos, "MÓDULO UNIDADE CURRICULAR", selectedOption, "CAPACIDADE DESENVOLVIDA - MÓDULO\r");
  var cargaHr = filtrarLinhasPorColuna(dadosBrutos, "MÓDULO UNIDADE CURRICULAR", selectedOption, "CH - MÓDULO");
  const curso = filtrarLinhasPorColuna(dadosBrutos, "MÓDULO UNIDADE CURRICULAR", selectedOption, "CURSO");
  
  const listaUnica = obterValoresUnicosArray(lista);
  const titleCh = "Carga Horária: ";
  const titleCurso = "Curso Original: ";
  
  console.log(cargaHr);
  if(cargaHr == ""){
      cargaHr = "--";
  }
  
  
  console.log(listaUnica);
  struct_modulos.habilidades = lista;
  struct_modulos.carga_horaria = titleCh.bold() + cargaHr + "h";
  struct_modulos.name_curso = titleCurso.bold() + curso;
  slHabilidades.innerHTML = lista;
  slCursoInner.innerHTML = titleCurso.bold() + curso;
  slCarga.innerHTML = titleCh.bold() + cargaHr + "h";
  //resultDiv.innerText = `Opção selecionada: ${selectedOption}`;
});



// Get the button that opens the modal
var btn = document.getElementById("myBtn");
if(btn == null){
    console.log("botao null");
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  loadInitialList();
  //updateLists();
  //createNewModule();
  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var divModulos = document.getElementById("md");
var modalTemplate = divModulos.cloneNode(true);

/*function createNewModule(){
    var divClone = modalTemplate;
    divClone.classList.add("disabled");
    console.log(divClone);

    //Novo id para nome_modulo
    divClone.children[0].children[0].id = "md_nome_modulo";
    //Novo id para modalidade
    divClone.children[0].children[1].id = "md_modalidade";
    //Novo id para nome_curso
    divClone.children[1].children[0].id = "md_nome_curso";
    //Novo id para area
    divClone.children[1].children[1].id = "md_nome_area";
    //Novo id para carga_horaria
    divClone.children[2].children[1].id = "md_carga_horaria";
    //Novo id para id_habilidades
    divClone.children[3].children[0].id = "md_habilidades";
    
    var thisModule = "md" + module_number;
    divClone.id = thisModule;
    
    var divModal = document.getElementById("setup");
    divModal.parentNode.appendChild(divClone);
    
    // Chamar a função para cada div correspondente
   criarDropdownList('md_nome_curso', [
    { value: 'opcao1', text: 'Opção 1' },
    { value: 'opcao2', text: 'Opção 2' },
    { value: 'opcao3', text: 'Opção 3' }
  ]);
}*/

function appendModule(){
    console.log("append");
    createModule(struct_modulos.name_modulo,
                 struct_modulos.modalidade,
                 struct_modulos.name_area,
                 struct_modulos.name_curso,
                 struct_modulos.name_uc,
                 struct_modulos.carga_horaria,
                 struct_modulos.habilidades);
    modalTemplate.remove;
    modal.style.display = "none";
}

// Função para criar uma dropdown list com opções
function criarDropdownList(elementId, options) {
  var dropdown = document.createElement('select');
  
  // Adicionar uma opção padrão selecionada
  var optionDefault = document.createElement('option');
  optionDefault.disabled = true;
  optionDefault.selected = true;
  optionDefault.text = 'Selecione uma opção';
  dropdown.appendChild(optionDefault);
  
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement('option');
    option.value = options[i].value;
    option.text = options[i].text;
    dropdown.appendChild(option);
  }
  
  document.getElementById(elementId).appendChild(dropdown);
}
