function create(Cls, attributes, ...children) {
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

    for (let child of children) {
        if (typeof child === "string") {
            child = new Text(child);
            o.appendChild(child);
        }
        o.appendChild(child);
        // o.children.push(child);
    }
    // console.log(children);
    return o;
}

class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }


}

class Wrapper {
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
}

class MyComponent {
    constructor(config) {
        console.log(config);
        this.children = [];
        // this.root = document.createElement("div");
    }

    set class(v) {
        console.log("Parent::class", v);
    }

    set id(v) {
        console.log("Parent::id", v);
    }

    setAttribute(name, value) {
        // console.log(name, value);
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        // this.root.appendChild(child);
        this.children.push(child);
        // child.mountTo(this.root);
    }

    render() {
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent) {
        this.slot = <div></div>
        // parent.appendChild(this.root);
        for (let child of this.children) {
            // child.mountTo(this.root);
            this.slot.appendChild(child);
        }
        this.render().mountTo(parent);
    }
}


// let component = <div id="a" class="b" style="width: 100px;height: 100px;background: red;">
//     <div>text123</div>
//     <Div></Div>
//     <div></div>
// </div>;
let component = <MyComponent>
    <div>text text text</div>
</MyComponent>
component.mountTo(document.body);
console.log(component);


// component.setAttribute("id", "b");