import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

class NavigationItemSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { menu: null };
        this.observer = new window.MutationObserver(this.callback.bind(this));
    }

    callback() {
        this.observer.disconnect();
        setTimeout(this.changeMenu.bind(this), 50);
    }

    changeMenu() {
        var item = this.findItem(this.state.menu, this.props.navigationItem.value);
        this.activateItem(this.state.menu, item);
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
        return item.getElementsByTagName("a")[0];
    };

    activateItem = (menu, item) => {
        Array.from(menu.getElementsByTagName("li")).forEach(element => {
            var a = element.getElementsByTagName("a")[0];
            a.classList.remove("active");
        });
        item.classList.add("active");
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.navigationItem.status === "available" && this.props.menuName.status === "available") {
                var _menu = document.querySelector(".mx-name-" + this.props.menuName.value);
                var item = this.findItem(_menu, this.props.navigationItem.value);
                this.activateItem(_menu, item);
                this.setState({ menu: _menu });
                this.observer.observe(_menu, { attributes: true, childList: true, subtree: true });
                clearInterval(this.interval);
            }
        }, 50);
    }
    componentWillUnmount() {
        this.observer.disconnect();
    }

    render() {
        return <div style={{ display: "none" }}></div>;
    }
}

export default hot(NavigationItemSelector);
