import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

class NavigationItemSelector extends Component {
    constructor(props) {
        super(props);
    }

    findItem = (menu, itemName) => {
        if (menu == null) return null;
        var items = menu.getElementsByTagName("li");
        var item;
        Array.from(items).forEach(it => {
            if (it.innerText === itemName) {
                item = it;
                return;
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
            if (this.props.navigationItem.status == "available" && this.props.menuName.status == "available") {
                var menu = document.querySelector(".mx-name-" + this.props.menuName.value);
                var item = this.findItem(menu, this.props.navigationItem.value);
                if (item != null) {
                    if (item.classList.contains("active") == true) {
                        clearInterval(this.interval);
                    } else {
                        this.activateItem(menu, item);
                        item.focus();
                    }
                }
            }
        }, 500);
    }

    render() {
        return <div style={{ display: "none" }}></div>;
    }
}

export default hot(NavigationItemSelector);
