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

    findItem(widget, caption, index) {
        let item;
        let items;
        if (this.props.menuType === "navlist") {
            if (caption != null) {
                items = widget.getChildren();
                for (let i = 0; i < items.length; i++) {
                    if (items[i].domNode.innerText === caption) {
                        item = i;
                    }
                }
            } else if (index != null) {
                item = index;
            } else {
                console.error("Navigation item selector configuration error!");
            }
        } else {
            items = widget._menuItemMap;
            let i = 0;
            Object.keys(items).forEach(key => {
                if (caption != null) {
                    if (items[key].caption === caption) {
                        item = items[key].id;
                    }
                } else if (index != null) {
                    if (i === this.props.itemIndex) {
                        item = items[key].id;
                    }
                    i++;
                } else {
                    console.error("Navigation item selector configuration error!");
                }
            });
        }
        return item;
    }

    activateItem(widget, itemId) {
        widget._currentActive = itemId;
        widget._currentSelection = itemId;
        widget._initialActive = widget._currentActive;
        widget._initialSelection = widget._currentSelection;
        if ((widget._currentActive && this.props.menuType === "navtree") || this.props.menuType === "navlist") {
            widget._view.deactivateAll();
            widget._view.activate(widget._currentActive);
        } else if (widget._currentActive && this.props.menuType === "menubar") {
            widget._view.deselectAll();
            widget._view.select(widget._currentActive);
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (
                this.props.menuName.status === "available" &&
                (this.props.selectorType === "byIndex" || this.props.itemCaption.status === "available")
            ) {
                const widget = this.getWidget(this.props.menuName.value);
                if (widget && widget._loaded) {
                    let itemId;
                    try {
                        itemId =
                            this.props.selectorType === "byIndex"
                                ? this.findItem(widget, null, this.props.itemIndex)
                                : this.findItem(widget, this.props.itemCaption.value, null);
                        if (itemId !== undefined) {
                            this.activateItem(widget, itemId);
                        } else {
                            console.error("Navigation item selector configuration error!");
                        }
                        clearInterval(this.interval);
                    } catch (e) {
                        console.error("Navigation item selector configuration error!");
                        clearInterval(this.interval);
                    }
                }
            }
        }, 50);
    }

    render() {
        return <div style={{ display: "none" }} />;
    }
}

export default hot(NavigationItemSelector);
