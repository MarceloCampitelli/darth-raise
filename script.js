function formatarTexto() {
  // Obter o texto inserido pelo usuário
  var textoInserido = document.getElementById('texto-inserido').value;

  // Substituir os caracteres especiais por espaços
  var textoSubstituido = textoInserido.replace(/[.,\/\\;:()]/g, ' ');

  // Quebrar o texto em linhas
  var linhas = textoSubstituido.split('\n');

  // Filtrar as palavras que terminam com "_w" ou "_p" em todas as linhas
  var palavrasFormatadas = [];
  var palavrasExibidas = {};
  for (var i = 0; i < linhas.length; i++) {
    var palavras = linhas[i].split(' ');
    for (var j = 0; j < palavras.length; j++) {
      if ((palavras[j].endsWith('_w') || palavras[j].endsWith('_p')) && !palavrasExibidas[palavras[j]]) {
        var palavraFormatada = "|| chr(13) || '" + palavras[j] + ": ' || " + palavras[j];
        palavrasFormatadas.push(palavraFormatada);
        palavrasExibidas[palavras[j]] = true;
      }
    }
  }

  // Gerar o texto formatado ou exibir mensagem de nenhum resultado encontrado
  var textoFormatado = "";
  if (palavrasFormatadas.length > 0) {
    var modoFormatacao = document.querySelector('input[name="modo-formatacao"]:checked').value;
    if (modoFormatacao === 'modo1') {
      textoFormatado = "raise_application_error(-20000," + '\n' + palavrasFormatadas.join('\n') + ");";
    } else if (modoFormatacao === 'modo2') {
      textoFormatado = "wheb_mensagem_pck.exibir_mensagem_abort(191072," + '\n' + palavrasFormatadas.join('\n') + ");";
    } else if (modoFormatacao === 'modo3') {
      textoFormatado = "insert into nm_tabela (nm_campo) values (" + '\n' + palavrasFormatadas.join('\n') + ");";
    }
  } else {
    textoFormatado = "Nenhuma palavra encontrada para exibição.";
  }

  // Exibir o texto formatado no painel de saída
  document.getElementById('texto-formatado').innerHTML = textoFormatado;
}

function limparPainel() {
  // Limpar o conteúdo do painel de saída
  document.getElementById('texto-formatado').innerHTML = "";
}

function copiarTexto() {
  // Obter o texto do segundo painel
  var textoPainelSuperior = document.getElementById('texto-formatado').textContent;

  // Verificar se há texto no segundo painel
  if (textoPainelSuperior.trim() !== '') {
    // Criar um elemento temporário para a seleção e cópia do texto
    var tempInput = document.createElement('textarea');
    tempInput.value = textoPainelSuperior;
    document.body.appendChild(tempInput);

    // Selecionar e copiar o texto
    tempInput.select();
    document.execCommand('copy');

    // Remover o elemento temporário
    document.body.removeChild(tempInput);

    // Exibir uma mensagem ao usuário
    alert('Texto copiado para a área de transferência!');
  } else {
    // Exibir uma mensagem ao usuário quando não houver texto no segundo painel
    alert('Não há texto para copiar!');
  }
}
