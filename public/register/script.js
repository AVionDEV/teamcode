const username = Array.from(document.querySelectorAll('input[name="username"]'))[0];

username.onblur = (ev) => {
    ev.preventDefault();

    const data = {
        username: ev.target.value
    };
    fetch('/api/getusername', {
        'method': 'POST',
        'body': JSON.stringify(data),
        'headers': {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then(data => {
            if (data.state) {
                ev.target.style.border = "1px solid green";
            } else {
                ev.target.style.border = "1px solid red";
            }
            ev.target.setAttribute('ok', data.state);
        });
    });
};

const passwords = Array.from(document.querySelectorAll('input[name="password"], input[name="password_repeat"]'));

function passwordCheck(ev) {
    ev.preventDefault();

    const cond = passwords[1].value == passwords[0].value;

    if (cond) {
        // passwords[0].style.border='1px solid green';
        passwords[1].style.border = '1px solid green';
    } else {
        // passwords[0].style.border='1px solid red';
        passwords[1].style.border = '1px solid red';
    }
    passwords[1].setAttribute('ok', cond);
};

passwords[0].oninput = passwordCheck;
passwords[1].oninput = passwordCheck;

const email = document.querySelector('input[name="email"]');

email.onblur = (ev) => {
    ev.preventDefault();

    const data = {
        email: ev.target.value
    };
    fetch('/api/getemail', {
        'method': 'POST',
        'body': JSON.stringify(data),
        'headers': {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then(data => {
            if (data.state) {
                ev.target.style.border = "1px solid green";
            } else {
                ev.target.style.border = "1px solid red";
            }
            ev.target.setAttribute('ok', data.state);
        });
    });
};

const form = document.getElementById('register_form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (passwords[1].getAttribute('ok') == "true" && username.getAttribute('ok') == 'true' && email.checkValidity()) {
        const myFormData = new FormData(e.target);

        const formDataObj = {};
        myFormData.forEach((value, key) => {
            if (key != 'password_repeat') {
                formDataObj[key] = value == '' ? null : value
            }
        });

        fetch('/api/register', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(formDataObj)
        }).then(res => {
            res.json().then(data => {
                if (data['redirect_url'] != undefined) {
                    document.location = data['redirect_url'];
                }
            });
        });
    }
});