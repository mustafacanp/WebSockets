const ws = new WebSocket('ws://localhost:4000');

const PERFETTO_ITALIAN_NAMES = ['Michelangela', 'Ardito', 'Gian', 'Iacopo', 'Santino', 'Paolino', 'Pompeo', 'Rubina', 'Aristide', 'Marino', 'Sigismondo', 'Rico', 'Gherardo', 'Onofrio', 'Nereo',
                'Nunzia', 'Felice', 'Alessa', 'Stefano', 'Violante', 'Ernestina', 'Nerio', 'Isidoro', 'Ambrogio', 'Amore', 'Sansone', 'Donatella', 'Leandro', 'Peppi',
                'Calogera', 'Alina', 'Marisa', 'Cesarina', 'Alcide', 'Mirta', 'Viviana', 'Patrizia', 'Nazario', 'Donatello', 'Jacopo', 'Gino', 'Flaviana', 'Lorenzo', 'Bartolomeo'];
let name = '';

const _chat_window = document.querySelector('#chat-window');
const _button = document.querySelector('button');
const _message = document.querySelector('#message');
const _output = document.querySelector('#output');
const _name = document.querySelector('#name');

const sendMessage = () => {
    if(_message.value.length) {
        ws.send([`${name}:::${_message.value}`]);
        _message.value = '';
    }
};

// ws.onopen = (event) => {
//     ws.send('Someone connected!');
// };
_message.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        _button.click();
    }
});

ws.onmessage = (event) => {
    const p = document.createElement('p');
    const owner = event.data.split(':::')[0];
    const message = event.data.split(':::')[1];
    p.innerHTML = `<strong class="${event.data.includes(name) ? 'me' : ''}">${owner}</strong>: ${message}`;
    _output.append(p);
    scrollChatToBottom();
};

_button.addEventListener('click', () => {
    sendMessage();
    _message.focus();
});

const scrollChatToBottom = () => {
    _chat_window.scrollTop = _chat_window.scrollHeight;
}

(function() {
    name = PERFETTO_ITALIAN_NAMES[Math.floor(Math.random() * PERFETTO_ITALIAN_NAMES.length)];
    _name.innerHTML = name;
})();
