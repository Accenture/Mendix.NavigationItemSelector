import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";
import "./ui/NavigationItemSelector.css";

class NavigationItemSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { menu: null };
        this.observer = new window.MutationObserver(this.callback.bind(this));
        this.onMenuTrigger = this.onMenuTrigger.bind(this);
    }

    callback() {
        setTimeout(this.changeMenu.bind(this), 20);
    }

    onMenuTrigger = event => {
        var item = event.detail === undefined ? null : this.findItem(this.state.menu, event.detail);
        if (item !== null) {
            this.activateItem(this.state.menu, item);
            this.observer.observe(this.state.menu, { attributes: true, childList: true, subtree: true });
        }
    };

    changeMenu() {
        this.observer.disconnect();
        Array.from(this.state.menu.querySelectorAll(".active")).forEach(element => {
            if (element !== undefined) element.classList.remove("active");
        });
        this.observer.observe(this.state.menu, { attributes: true, childList: true, subtree: true });
    }

    findItem = (menu, itemName) => {
        if (menu == null) return null;
        var items = menu.getElementsByTagName("li");
        var item;
        Array.from(items).forEach(it => {
            if (it.innerText === itemName) {
                item = it;
            }
        });
        if (item === undefined) {
            return undefined;
        }
        return item.getElementsByTagName("a")[0];
    };

    activateItem = (menu, item) => {
        if (item !== undefined) {
            Array.from(menu.querySelectorAll("li a.active, li a.menu-active")).forEach(element => {
                if (element !== undefined) {
                    element.classList.remove("active");
                    element.classList.remove("menu-active");
                }
            });
            item.classList.add("menu-active");
        }
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.menuName.status === "available") {
                var _menu = document.querySelector(".mx-name-" + this.props.menuName.value);
                if (_menu !== undefined) {
                    this.setState({ menu: _menu });
                    document.addEventListener("menuTrigger", this.onMenuTrigger);
                    clearInterval(this.interval);
                }
            }
        }, 50);
    }

    componentWillUnmount() {
        removeEventListener("menuTrigger", this.onMenuTrigger);
        this.observer.disconnect();
    }
}

export default hot(NavigationItemSelector);
