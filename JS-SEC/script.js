function gerarCalendarioPorMes(mesSelecionado) {
  const wrapper = document.getElementById('calendario-descer');
  const titulo = document.getElementById('titulo-calendario');
  const semana = document.getElementById('semana');
  const calendario = document.getElementById('calendario');

  wrapper.style.display = 'block';

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const diaHoje = hoje.getDate();

  const data = new Date(ano, mesSelecionado);
  let mesAno = data.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  mesAno = mesAno.charAt(0).toUpperCase() + mesAno.slice(1);

  titulo.textContent = `Calendário - ${mesAno}`;

  semana.innerHTML = '';
  calendario.innerHTML = '';

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  diasSemana.forEach(dia => {
    const div = document.createElement('div');
    div.textContent = dia;
    semana.appendChild(div);
  });

  const primeiroDia = new Date(ano, mesSelecionado, 1);
  const ultimoDia = new Date(ano, mesSelecionado + 1, 0);
  const totalDias = ultimoDia.getDate();
  const diaSemana = primeiroDia.getDay();

  for (let i = 0; i < diaSemana; i++) {
    const vazio = document.createElement('div');
    calendario.appendChild(vazio);
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const divDia = document.createElement('div');
    divDia.className = 'dia';
    divDia.textContent = dia;

    if (dia === diaHoje && mesSelecionado === hoje.getMonth()) {
      divDia.classList.add('hoje');
    }

    divDia.addEventListener('click', () => {
      const painel = document.getElementById('painel-dia');
      const tituloDia = document.getElementById('titulo-dia');
      // const conteudoDia = document.getElementById('conteudo-dia');

      const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mesSelecionado + 1).padStart(2, '0')}/${ano}`;
      tituloDia.textContent = `Detalhes do dia ${dataFormatada}`;
      painel.style.display = 'flex';
      // conteudoDia.textContent = `Aqui você pode exibir ou salvar eventos para ${dataFormatada}.`;
    });

    calendario.appendChild(divDia);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('cronogramaBtn');
  if (select) {
    select.addEventListener('change', () => {
      const mesSelecionado = parseInt(select.value);
      if (!isNaN(mesSelecionado)) {
        gerarCalendarioPorMes(mesSelecionado);
      }
    });
  }

  const searchBtn = document.getElementById('searchBtn');
  const searchContainer = document.querySelector('.search-container');

  searchBtn.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
  });

const input = document.getElementById('arquivo');
const preview = document.getElementById('preview');
const pdfArea = document.getElementById('pdfArea');

input.addEventListener('change', function () {
  preview.innerHTML = '';
  pdfArea.innerHTML = '';

  const file = this.files[0];
  if (!file) return;

  const fileType = file.type;
  const fileURL = URL.createObjectURL(file);
  const fileName = file.name;

  // Mostrar pré-visualização se aplicável
  if (fileType.startsWith('image/')) {
    const img = document.createElement('img');
    img.src = fileURL;
    preview.appendChild(img);

  } else if (fileType === 'application/pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = fileURL;
    iframe.width = '700px';
    iframe.height = '350px';
    preview.appendChild(iframe);

  } else if (fileType.startsWith('video/')) {
    const video = document.createElement('video');
    video.src = fileURL;
    video.controls = true;
    preview.appendChild(video);

  } else if (fileType.startsWith('audio/')) {
    const audio = document.createElement('audio');
    audio.src = fileURL;
    audio.controls = true;
    preview.appendChild(audio);
  }

  // Botão: Abrir
  const btnAbrir = document.createElement('a');
  btnAbrir.href = fileURL;
  btnAbrir.target = '_blank';
  btnAbrir.rel = 'noopener noreferrer';
  btnAbrir.className = 'btn-file abrir';
  btnAbrir.textContent = '🔓 Abrir';

  // Botão: Baixar
  const btnBaixar = document.createElement('a');
  btnBaixar.href = fileURL;
  btnBaixar.download = fileName;
  btnBaixar.className = 'btn-file baixar';
  btnBaixar.textContent = '⬇️ Baixar';

  // Adiciona os botões
  pdfArea.appendChild(btnAbrir);
  pdfArea.appendChild(btnBaixar);
})});



function fecharPainel() {
  const painel = document.getElementById('painel-dia');
  painel.style.display = 'none';
  // Se quiser limpar conteúdo do dia:
  // const conteudoDia = document.getElementById('conteudo-dia');
  // conteudoDia.textContent = 'Clique em um dia do calendário para ver os detalhes aqui.';
}
