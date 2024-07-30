export default class Element {
    constructor (type) {
        this.elementType = type;
        this.attributes = {};
        this.children = [];
        this.eventListeners = {};
    }

    buildElement() {
        var element = document.createElement(this.elementType);

        // Assign attributes to element
        for (const att in this.attributes) {
            element.setAttribute(att, this.attributes[att]);
        }

        // Assign event listeners to element
        for (const ev in this.eventListeners) {
           this.eventListeners[ev].forEach((fn) => {
                element.addEventListener(ev, fn);
            })
        }

        // Assign children to element
        if (this.text === undefined) {
            for (const child of this.children) {
                element.appendChild(child.buildElement());
            }
        } else {
            const realText = document.createTextNode(this.text);
            element.appendChild(realText);
        }


        return element;
    }

    setAttributes(object) {
        Object.assign(this.attributes, object);
        return this;
    }

    addChild(element) {
        this.text = undefined;
        this.children.push(element);
        return this;
    }

    setTextContent(text) {
        this.children = [];
        this.text = text;
        return this;
    }

    appendEventListener(event, callbackFn) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].push(callbackFn);
        } else {
            this.eventListeners[event] = [callbackFn];
        }
        return this;
    }
}