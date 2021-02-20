
import { formHndler } from './js/app'


// sass and assest files
import './styles/style.scss'
import './assest/6.jpg'

//addEventListener for submit 
document.querySelector(".submit").addEventListener("click", function (event) {
    event.preventDefault();
    formHndler();
});

export {
    formHndler
   }
 
