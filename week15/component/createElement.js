export function createElement(Cls, attributes, ...children) {
    // console.log(arguments);
    let o;
    if (typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }


    for (let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }


    let visit = (children) => {
        for (let child of children) {
            if (typeof child === "object" && child instanceof Array) {
                visit(child);
                continue;
            }

            if (typeof child === "string") {
                child = new Text(child);
                // o.appendChild(child);
            }

            o.appendChild(child);
            // o.children.push(child);
        }
    }

    visit(children);
    // console.log(children);
    return o;
}

export class Text {
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }


}

export class Wrapper {
    constructor(type) {
        // console.log(config);
        this.children = [];
        this.root = document.createElement(type);
    }

    set class(v) {
        console.log("Parent::class", v);
    }

    set id(v) {
        console.log("Parent::id", v);
    }

    get style() {
        return this.root.style;
    }

    setAttribute(name, value) {
        // console.log(name, value);
        this.root.setAttribute(name, value);
    }

    mountTo(parent) {
        parent.appendChild(this.root);

        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }


    appendChild(child) {
        // this.root.appendChild(child);
        this.children.push(child);
        // child.mountTo(this.root);
    }

    addEventListener() {
        this.root.addEventListener(...arguments);
    }
}