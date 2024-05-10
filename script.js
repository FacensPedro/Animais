// URL base do projeto no Mockapi
const apiUrl = 'https://663d4dcb17145c4d8c393712.mockapi.io/Animais';

// Função para atualizar a lista de animais na página
function atualizarLista() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar dados da API');
            }
            return response.json();
        })
        .then(data => {
            const lista = document.getElementById('lista-animais');
            lista.innerHTML = ''; // Limpa a lista antes de adicionar novos itens
            data.forEach(animal => {
                const item = `${animal.id} - ${animal.name} (${animal.age} anos) – ${animal.raca}`;
                lista.innerHTML += `<li>${item}</li>`;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar animais:', error);
            alert('Erro ao buscar animais: ' + error.message);
        });
}

// Função para cadastrar múltiplos novos animais
function cadastrarAnimais() {
    const animais = [
        { Nome: 'Totó', Idade: 12, Raca: 'cachorro' },
        { Nome: 'Mingau', Idade: 3, Raca: 'gato' },
        { Nome: 'Rex', Idade: 5, Raca: 'cachorro' },
        { Nome: 'Felix', Idade: 4, Raca: 'gato' },
        { Nome: 'Bob', Idade: 7, Raca: 'cachorro' },
        { Nome: 'Garfield', Idade: 6, Raca: 'gato' },
        { Nome: 'Lola', Idade: 2, Raca: 'coelho' },
        { Nome: 'Pipoca', Idade: 1, Raca: 'hamster' },
        { Nome: 'Thor', Idade: 3, Raca: 'cachorro' },
        { Nome: 'Luna', Idade: 2, Raca: 'gato' }
    ];

    const promessas = animais.map(animal => {
        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: animal.Nome,
                age: animal.Idade,
                type: animal.Raca
            })
        });
    });

    Promise.all(promessas)
        .then(() => {
            console.log('Todos os animais foram cadastrados.');
            atualizarLista(); // Atualiza a lista após todos os cadastros
        })
        .catch(error => console.error('Erro ao cadastrar animais:', error));
}

// Adiciona o evento de clique ao botão "Cadastrar Animal"
document.getElementById('btnCadastrar').addEventListener('click', cadastrarAnimais);

// Atualiza a lista de animais ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarLista);