document.addEventListener('DOMContentLoaded', loaded);

function onKeyDown(ev) {

    if (ev.key == 'Enter') {
        ev.preventDefault();
        ev.target.parentNode.parentNode.children.item(1).children.item(0).focus();
    }
}

function loaded() {
    const titlebar = Array.from(document.querySelectorAll('.titlebar'));

    titlebar[0].onkeydown = onKeyDown;

    fetch('/api/getuser', {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('teamcode_auth_')}`
        },
        'body': JSON.stringify({'username': localStorage.getItem('teamcode_username_')})
    }).then(res => {
        res.json().then(data => {
            const username = document.querySelector('span[name="username"]');
            const id = document.querySelector('span[name="id"]');
            username.innerHTML = `${data['user']['username']}`
            id.innerHTML = `#${data['user']['id']}`

            fetch('/api/get_all_projects', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('teamcode_auth_')}`
                },
                'body': JSON.stringify({
                    'creatorId': data['user']['id']
                })
            }).then(resp => {
                resp.json().then(proj => {
                    const plates = document.querySelector('#plates');
                    proj.forEach(el => {
                        const child = document.createElement('div');
                        child.classList.add('project_plate');
                        child.classList.add('unselectable');
                        child.setAttribute('id', el.id);
                        child.setAttribute('creatorId', el.creatorId);
                        child.setAttribute('teamId', el.teamId);
                        child.onclick = (ev) => {
                            ev.preventDefault();

                            fetch('/api/get_project',{
                                'method': 'POST',
                                'headers': {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('teamcode_auth_')}`
                                },
                                'body': JSON.stringify({
                                    id: el.id
                                })
                            }).then(response => {
                                response.json().then(val => {
                                    document.querySelector('input[name="titlebar"]').value = val.title;
                                    document.querySelector('textarea').innerHTML = val.text;
                                });
                            });
                        };
                        const square = document.createElement('div');
                        square.classList.add('square');
                        const title = document.createElement('span');
                        title.innerHTML = el.title;
                        child.appendChild(square);
                        child.appendChild(title);
                        plates.appendChild(child);
                    });
                });
            });
        });
    });
}