// const navItems = document.querySelectorAll('.icon-navigation-bar .nav-item');

//     function setActiveItem(clickedItem) {
//         navItems.forEach(item => {
//             if (item !== clickedItem) {
//                 item.classList.remove('active-item');
//             }
//         });

//         clickedItem.classList.add('active-item');
//     }

//     navItems.forEach(item => {
//         item.addEventListener('click', function(event) {
//             if (this.getAttribute('href') === '#') {
//                 event.preventDefault();
//             }
//             setActiveItem(this);
//         });
//     });