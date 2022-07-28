import breakpoints from '../utils/breakpoints';

const CLASSES = {
    mainMenuOpened: 'is-opened',
    bodyOverlay: 'has-overlay',
    scrollingDown: 'is-scrolling-down',
    menusOpened: 'is-menu-opened',
    sticky: 'is-sticky'
};
class MainMenu {
    constructor (selector) {
        this.element = document.querySelector(selector);
        this.menu = this.element.querySelector('.menu');
        this.mainButton = this.element.querySelector('button');
        this.dropdownsButtons = this.element.querySelectorAll('.has-children a[role="button"]');

        this.state = {
            isOpened: false,
            isActive: false,
            previousScrollY: window.scrollY
        };

        this.listen();
    }

    listen () {
        window.addEventListener('resize', this.resize.bind(this));
        this.mainButton.addEventListener('click', this.toggleMain.bind(this));
        this.dropdownsButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleDropdown(button);
            });
        });
        ['scroll', 'touchmove'].forEach(event => {
            window.addEventListener(event, this.onScroll.bind(this));
        });
    }

    resize () {
        this.state.isActive = window.innerWidth <= breakpoints.md;
    }

    toggleMain () {
        this.isOpened = !this.state.isOpened;
        this.mainButton.setAttribute('aria-expanded', this.state.isOpened);
        this.menu.classList.toggle(CLASSES.mainMenuOpened);
        document.body.classList.toggle(CLASSES.bodyOverlay);
    }

    toggleDropdown (button) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
    }

    onScroll () {
        const offset = this.element.offsetHeight,
            y = window.scrollY;

        console.log(y > offset);

        if (y > offset) {
            this.element.classList.add(CLASSES.sticky);
        } else {
            this.element.classList.remove(CLASSES.sticky);
        }

        if (y > this.state.previousScrollY && y > offset) {
            document.documentElement.classList.add(CLASSES.scrollingDown);
        } else {
            document.documentElement.classList.remove(CLASSES.scrollingDown);
        }

        this.state.previousScrollY = y;
    }
}

export default new MainMenu('header[role="banner"]');
