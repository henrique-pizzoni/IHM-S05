// objeto do usuário
const usuario = { nome: "Henrique Pizzoni", matricula: "527", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  
  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // na lista armários, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Caso exista armário(s) disponíveis, seguimos sorteando uma opção. 
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Obter a data e hora atual da reserva.
  let dataReserva = new Date();
  
  // Calcular a data e hora de entrega (24 horas depois).
  let dataEntrega = new Date(dataReserva);
  dataEntrega.setHours(dataEntrega.getHours() + 24);
  
  // Depois localizamos o armário emprestado na lista de armarios e atualizamos suas propriedades.
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;
  armarioEmprestado.dataReserva = dataReserva;
  armarioEmprestado.dataEntrega = dataEntrega;
  
  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Imprimimos uma mensagem de reserva para o usuário, incluindo a data de entrega.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! Entrega das chaves: ${dataEntrega.toLocaleString('pt-BR')}`;

  console.log(usuario);
  console.log(armarios);

}