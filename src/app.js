require('./../style/app.scss')
let menuItems = document.getElementsByClassName('menu-item');
let navHome = document.getElementById('nav-Home');
let navAbout = document.getElementById('nav-About');
let navWork = document.getElementById('nav-Work');
let navContact = document.getElementById('nav-Contact');

let parallax = document.getElementById('parallax');
let anchorHome = document.getElementById('welcome').offsetTop;
let anchorAbout = document.getElementById('about').offsetTop;
let anchorWork = document.getElementById('work').offsetTop;
let anchorContact = document.getElementById('contact').offsetTop;

let previousActive = navHome;
console.log(anchorHome + ", " + anchorAbout + ", " + anchorWork + ", " + anchorContact);

function scrollToAnchor(anchor, duration) {
    console.log("scrolling to " + anchor);
    if (duration <= 0) return;
    let slidingElement = parallax;
    let difference = anchor - slidingElement.scrollTop + 1; // +1 is necessary, because otherwise scrollToAnchor will stop just before the anchor point.
    let perTick = difference / duration * 10;

    setTimeout(function() {
        slidingElement.scrollTop = slidingElement.scrollTop + perTick;
        if (slidingElement.scrollTop === anchor) return;
        scrollToAnchor(anchor, duration - 10);
    }, 10);
}

function changeActive(menuItem) {
    let i = 0;
    let length = menuItems.length;
    for (i=0; i < length; i++) {
        menuItems[i].classList.remove('active');
    }
    setTimeout(function() {menuItem.classList.add('active');}, 100);
}

function setActiveMenuItem() {
    let yPosition = parallax.scrollTop + 1;
    let activeMenuItem = navHome;
    console.log(yPosition);

    if (yPosition >= anchorAbout) {activeMenuItem = navAbout}
    if (yPosition >= anchorWork) {activeMenuItem = navWork}
    if (yPosition >= anchorContact) {activeMenuItem = navContact}
    console.log("activeMenuItem" + activeMenuItem);

    if (activeMenuItem != previousActive) {
        console.log('changing active menu item');
        changeActive(activeMenuItem);
        previousActive = activeMenuItem;
    }
}

function navigate(navElement, anchor) {
    navElement.classList.add('waiting');
    scrollToAnchor(anchor, 750);
    setTimeout(function() {navElement.classList.remove('waiting')}, 1000);
}

navHome.onclick= function() {
    navigate(event.target, anchorHome)
}
navAbout.onclick= function() {
    navigate(event.target, anchorAbout)
}
navWork.onclick= function() {
    navigate(event.target, anchorWork)
}
// navContact.onclick= scrollToAnchor.bind(this, anchorContact, 750);

navContact.onclick= function() {
    navigate(event.target, anchorContact)
}

parallax.onscroll = setActiveMenuItem;
