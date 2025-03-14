Sukurtas internetinės parduotuvės modelis. Naudota React, TypeScript ir Vite, db.json. Parduotuvė funkcionali:  vykdoma prekių peržiūra, vartotojų valdymas, forumas su įrašais ir atsiliepimais bei krepšelio valdymas.

Naudotos technologijos : React su TypeScript, Vite, JSON serveris, React Router DOM, SCSS, Bootstrap, Git, useReducer, useContext.

Projektas suskaidytas į pasikartojančius komponentus pvz. Navbar, ProductCard, BootstrapCard, NewUserForm, NewForumPostForm. Naudojamas React Router DOM, kuris leidžia naviguoti tarp kelių puslapių: Home, Clothes, Shoes, Accessories, Perfume, produkto detalių ir atsiliepimų puslapiai, krepšelio funkcionalumas, yra sukurti vartotojų puslapiai: Users List, User Profile, User Orders, Login, Register, forumo puslapiai: Forum, Forum Post Detail, New Forum Post, Global Search. Projektas naudoja JSON Server, kad imituotų REST API. Galimi šie endpoint'ai: /users, /categories, /products, /orders, /reviews, /posts. GET: sąrašo ir detalių vaizdai vartotojams, prekėms, įrašams, atsiliepimams ir užsakymams. POST: naujų vartotojų, įrašų, atsiliepimų kūrimas. PATCH/PUT: vartotojų profilių ir atsiliepimų atnaujinimas. DELETE: atsiliepimų (ir potencialiai kitų objektų) ištrynimas.

Naudojamas useState vietinei komponentų būsenai. UseReducer ir useContext krepšelio (CartContext) ir autentifikacijos (AuthContext) kontekstuose. Yra prisijungimo ir registracijos puslapiai, kurie leidžia vartotojams prisijungti ir užsiregistruoti.
User Profile puslapis leidžia peržiūrėti ir redaguoti vartotojo informaciją.
yra puslapis kuris rodo vartotojo užsakymų istoriją.
Vintage forume leidžiama vartotojams kurti ir peržiūrėti įrašus.
Produktų atsiliepimų funkcionalumas leidžia vartotojams palikti, atnaujinti ir ištrinti atsiliepimus.
Global Search funkcija leidžia ieškoti forumo įrašų pagal pavadinimą.