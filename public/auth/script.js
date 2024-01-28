const form = document.querySelector('form');
const login = document.querySelector('input[name="login"]')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (login.value.length != 0) {
        const myFormData = new FormData(e.target);

        const formDataObj = {
            'username': myFormData.get('login'),
            'email': myFormData.get('login'),
            'password': myFormData.get('password')
        };

        fetch('/api/auth', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(formDataObj)
        }).then(res => {
            res.json().then(data => {
                if (data['redirect_url'] != undefined) {
                    localStorage.setItem('teamcode_auth_',data['callback_data']['token']);
                    localStorage.setItem('teamcode_username_',data['callback_data']['user']['username']);
                    document.location = data['redirect_url'];
                }
            });
        });
    }
});