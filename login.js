// =========================
// ELEMENTOS
// =========================

const loginForm = document.getElementById('loginForm');

const loginBtn = document.getElementById('loginBtn');

const errorMsg = document.getElementById('errorMsg');

const successMsg = document.getElementById('successMsg');


// =========================
// CAMINHO DO JSON
// =========================

const JSON_PATH = 'users.json';


// =========================
// FUNÇÕES
// =========================

function showError(message) {

  successMsg.style.display = 'none';

  errorMsg.textContent = message;

  errorMsg.style.display = 'block';

  setTimeout(() => {

    errorMsg.style.display = 'none';

  }, 4000);
}


function showSuccess(message) {

  errorMsg.style.display = 'none';

  successMsg.textContent = message;

  successMsg.style.display = 'block';
}


// =========================
// LOGIN
// =========================

loginForm.addEventListener('submit', async (e) => {

  e.preventDefault();

  const username =
    document
      .getElementById('usuario')
      .value
      .trim();

  const password =
    document
      .getElementById('senha')
      .value
      .trim();


  // =========================
  // VALIDAÇÃO
  // =========================

  if (!username || !password) {

    showError('Preencha todos os campos.');

    return;
  }


  // =========================
  // BOTÃO LOADING
  // =========================

  loginBtn.disabled = true;

  loginBtn.textContent = 'Entrando...';


  try {

    // =========================
    // BUSCA JSON
    // =========================

    const response = await fetch(JSON_PATH);


    // =========================
    // VERIFICA ERRO HTTP
    // =========================

    if (!response.ok) {

      throw new Error(
        `Erro HTTP: ${response.status}`
      );
    }


    // =========================
    // CONVERTE JSON
    // =========================

    const data = await response.json();


    // =========================
    // VALIDA ESTRUTURA
    // =========================

    if (
      !data.users ||
      !Array.isArray(data.users)
    ) {

      throw new Error(
        'Estrutura JSON inválida.'
      );
    }


    // =========================
    // PROCURA USUÁRIO
    // =========================

    const user = data.users.find(

      (u) =>

        u.username === username &&
        u.password === password

    );


    // =========================
    // LOGIN OK
    // =========================

    if (user) {

      // SALVA NO LOCAL STORAGE

      localStorage.setItem(
        'loggedUser',
        JSON.stringify(user)
      );


      // MOSTRA SUCESSO

      showSuccess(
        'Login realizado com sucesso!'
      );


      // REDIRECIONA

      setTimeout(() => {

        window.location.href =
          './dashboard.html';

      }, 1200);

    }

    // =========================
    // LOGIN INVÁLIDO
    // =========================

    else {

      showError(
        'Usuário ou senha incorretos.'
      );
    }

  }

  // =========================
  // ERROS
  // =========================

  catch (error) {

    console.error(error);

    showError(
      'Erro ao carregar users.json. Verifique a pasta assets e utilize Live Server.'
    );
  }

  // =========================
  // FINALIZA
  // =========================

  finally {

    loginBtn.disabled = false;

    loginBtn.textContent = 'Entrar';
  }

});