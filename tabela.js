// Função para construir a tabela HTML
/*function construirTabela(dados, filtros) {
  const tabelaOriginal = document.getElementById('tabela-original');
  tabelaOriginal.innerHTML = ''; // Limpa a tabela original antes de atualizar

  const tabela = document.createElement('table');

  // Cria o cabeçalho da tabela
  const cabecalho = document.createElement('thead');
  const cabecalhoRow = document.createElement('tr');
  dados[0].forEach((item, indice) => {
    // Verifica se a coluna está filtrada
    if (filtros && filtros[indice] !== '') {
      return; // Pula para a próxima iteração se estiver filtrada
    }

    const cabecalhoCelula = document.createElement('th');
    cabecalhoCelula.textContent = item;
    cabecalhoRow.appendChild(cabecalhoCelula);
  });
  cabecalho.appendChild(cabecalhoRow);
  tabela.appendChild(cabecalho);

  // Cria as linhas da tabela
  const corpo = document.createElement('tbody');
  for (let i = 1; i < dados.length; i++) {
    const linha = document.createElement('tr');
    dados[i].forEach((item, indice) => {
      // Verifica se a coluna está filtrada
      if (filtros && filtros[indice] !== '') {
        return; // Pula para a próxima iteração se estiver filtrada
      }

      const celula = document.createElement('td');
      celula.textContent = item;
      linha.appendChild(celula);
    });
    corpo.appendChild(linha);
  }
  tabela.appendChild(corpo);

  tabelaOriginal.appendChild(tabela);
}*/

// Função para filtrar a tabela
/*function filtrarTabela() {
  const filtros = {};

  const inputsFiltro = document.getElementsByClassName('filtro');
  Array.from(inputsFiltro).forEach(input => {
    const coluna = input.dataset.coluna;
    const valorFiltro = input.value.toLowerCase();
    filtros[coluna] = valorFiltro;
  });

  const tabelaOriginal = document.getElementById('tabela-original');
  const dadosOriginal = JSON.parse(tabelaOriginal.dataset.dados);

  const dadosFiltrados = dadosOriginal.filter(dado => {
    return Object.keys(filtros).every(coluna => {
      const indiceColuna = Number(coluna);
      const valorCelula = dado[indiceColuna].toLowerCase();
      const valorFiltro = filtros[coluna];

      return valorCelula.includes(valorFiltro);
    });
  });

  construirTabela(dadosFiltrados, filtros);
}8/

// Função para criar o dropdown list de filtro para uma coluna
function criarDropDownFiltro(coluna, valores) {
  const filtro = document.createElement('select');
  filtro.classList.add('filtro');
  
  const opcaoPadrao = document.createElement('option');
  opcaoPadrao.text = `Filtrar ${coluna}`;
  opcaoPadrao.value = '';
  filtro.appendChild(opcaoPadrao);

  valores.forEach(valor => {
    const opcao = document.createElement('option');
    opcao.text = valor;
    opcao.value = valor;
    filtro.appendChild(opcao);
  });

  return filtro;
}

// Função de tratamento do evento de alteração do input de arquivo
function handleFileChange(evento) {
  const arquivo = evento.target.files[0];
  lerArquivoCSV(arquivo, construirTabela);
}

/*const fs = require("fs");
fs.readFile("tabela_modulos_FIC.tsv", (err, data) => {
  if (err) throw err;
  lerArquivoCSV(fs, construirTabela);
  console.log(data.toString());
});*/

window.addEventListener('DOMContentLoaded', () => {
  const arquivoCSV = 'tabela_modulos_FIC.tsv'; // Substitua pelo caminho do seu arquivo CSV

  fetch(arquivoCSV)
    .then(response => response.text())
    .then(text => {
      const blob = new Blob([text], { type: 'text/csv' });
      lerArquivoCSV(blob, construirTabela);
    })
    .catch(error => {
      console.error('Erro ao carregar o arquivo CSV:', error);
    });
});

var dadosBrutos = null;
function construirTabela(){}

// Função para ler o arquivo CSV
function lerArquivoCSV(arquivo, callback) {
  const leitor = new FileReader();

  leitor.onload = function (evento) {
    const linhas = evento.target.result.split('\n');
    const dados = linhas.map(linha => linha.split('\t'));

    //const tabelaOriginal = document.getElementById('tabela-original');
    //tabelaOriginal.dataset.dados = JSON.stringify(dados); // Adicionar os dados originais à tabela

    callback(dados);
    //adicionarOuvintesFiltro(dados);
    
    dadosBrutos = dados;
  };

  leitor.readAsText(arquivo);
}

// Adiciona um ouvinte de eventos aos campos de filtro
/*function adicionarOuvintesFiltro(dados) {
  const cabecalho = dados[0];

  const filtrosContainer = document.getElementById('filtros');
  filtrosContainer.innerHTML = '';

  cabecalho.forEach((coluna, indice) => {
    const valoresUnicos = obterValoresUnicos(dados, indice);
    const filtro = criarDropDownFiltro(coluna, valoresUnicos);
    filtro.dataset.coluna = indice;
    filtro.addEventListener('change', filtrarTabela);
    filtrosContainer.appendChild(filtro);
  });
  //criarDropDownColunas(cabecalho);
}*/

// Função para obter os valores únicos de uma coluna
/*function obterValoresUnicos(dados, indiceColuna) {
  const valoresUnicos = new Set();
  for (let i = 1; i < dados.length; i++) {
    const valor = dados[i][indiceColuna];
    valoresUnicos.add(valor);
  }
  return Array.from(valoresUnicos);
}*/

/*function obterValoresUnicosArray(lista) {
  const valoresUnicos = new Set();
  
  for (let i = 1; i < lista.length; i++) {
    const valor = lista[i];
    valoresUnicos.add(valor);
  }
  return Array.from(valoresUnicos);
}*/

function obterValoresUnicosArray(lista) {
  const valoresUnicos = new Set(lista);
  const result1 = [...valoresUnicos.values()];
  return result1;
  /*for (let i = 1; i < lista.length; i++) {
    const valor = lista[i];
    valoresUnicos.add(valor);
  }
  return Array.from(valoresUnicos);*/
}

// Adiciona um ouvinte de eventos ao input de arquivo
//const inputArquivo = document.getElementById('input-arquivo');
//inputArquivo.addEventListener('change', handleFileChange);

function filtrarLinhasPorColuna(dados, colunaFiltro, valorFiltro, colunaRetorno) {
  console.log(dados[0]);
  const indiceColunaFiltro = dados[0].indexOf(colunaFiltro);
  const indiceColunaRetorno = dados[0].indexOf(colunaRetorno);
  console.log(indiceColunaFiltro);
  console.log(indiceColunaRetorno);
  console.log(colunaFiltro);
  console.log(colunaRetorno);
  const linhasResultantes = [];

  for (let i = 1; i < dados.length; i++) {
    const linha = dados[i];
    if (linha[indiceColunaFiltro] === valorFiltro) {
      linhasResultantes.push(String(linha[indiceColunaRetorno]));
      console.log(linha[indiceColunaRetorno]);
    }
  }
  return linhasResultantes;
}