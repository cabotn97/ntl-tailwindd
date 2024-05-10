(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('aMw3nNFMv0a1vV6yE');
})();

const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function(event) {
        event.preventDefault();

        btn.value = 'Enviando';

        const serviceID = 'service_y6186ww';
        const templateID = 'template_hekov68';

        if (grecaptcha.getResponse().length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Completar captcha',
                text: '',
                confirmButtonColor: '#41b6e6',
            })
        }
        else {
            emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Enviar';
                Swal.fire({
                    icon: 'success',
                    title: 'Enviado!',
                    text: '',
                    confirmButtonColor: '#41b6e6',
                })
                grecaptcha.reset();
                form.reset();
                }, (err) => {
                btn.value = 'Enviar';
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Intente de nuevo mas tarde',
                    confirmButtonColor: '#41b6e6',
                })
                grecaptcha.reset();
                form.reset();
            }); 
        }

        
});