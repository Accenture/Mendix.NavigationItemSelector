import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

class NavigationItemSelector extends Component {
    getWidget(widgetName) {
        let widget;
        try {
            widget = window.dijit.byNode(document.querySelector(".mx-name-" + widgetName));
        } catch (error) {
            console.log(error.message);
        }
        return widget;
    }

    findItem(widget, caption) {
        const items = widget._menuItemMap;
        let item;
        Object.keys(items).forEach(key => {
            if (items[key].caption === caption) {
                item = items[key].id;
            }
        });
        return item;
    }

    activateItem(widget, itemId) {
        widget._currentActive = itemId;
        widget._initialActive = widget._currentActive;
        if (widget._currentActive) {
            if (this.props.menuType === "navtree") {
                widget._view.deactivateAll();
                widget._view.activate(widget._currentActive);
            } else if (this.props.menuType === "menubar") {
                widget._view.deselectAll();
                widget._view.select(widget._currentActive);
            }
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.menuName.status === "available" && this.props.itemCaption.status === "available") {
                const widget = this.getWidget(this.props.menuName.value);
                if (widget && widget._loaded) {
                    const itemId = this.findItem(widget, this.props.itemCaption.value);
                    this.activateItem(widget, itemId);
                    clearInterval(this.interval);
                }
            }
        }, 50);
    }

    render() {
        return <div style={{ display: "none" }} />;
    }
}

export default hot(NavigationItemSelector);
