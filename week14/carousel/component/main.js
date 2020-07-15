import {createElement, Text, Wrapper} from "./createElement.js";
/*
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
}*/


class Carousel {
    constructor(config) {
        // this.root = document.createElement("div");
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    set class(v) {
        console.log("Parent::class", v);
    }

    set id(v) {
        console.log("Parent::id", v);
    }

    setAttribute(name, value) {
        // console.log(name, value);
        this[name] = value;
    }

    appendChild(child) {
        // this.root.appendChild(child);
        this.children.push(child);
        // child.mountTo(this.root);
    }

    render() {
        let children = this.data.map(url => {
            let element = <img src={url}/>;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        });
        let position = 0;

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            current.style.transition = "ease 0s";
            next.style.transition  = "ease 0s";

            current.style.transform = `translateX(${ -100 * position}%)`;
            next.style.transform = `translateX(${100 -100 * nextPosition}%)`;

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    current.style.transition = "ease 0.5s";
                    next.style.transition  = "ease 0.5s";

                    current.style.transform = `translateX(${-100 -100 * position}%)`;
                    next.style.transform = `translateX(${-100 * nextPosition}%)`;

                    position = nextPosition;
                })
            });

            setTimeout(nextPic, 3000);
        }

        setTimeout(nextPic, 3000);

        return <div class="carousel">
            {children}
        </div>
    }

    mountTo(parent) {
        // for (let child of this.children) {
        //     // child.mountTo(this.root);
        //     this.slot.appendChild(child);
        // }
        this.render().mountTo(parent);
    }
}


// let component = <div id="a" class="b" style="width: 100px;height: 100px;background: red;">
//     <div>text123</div>
//     <Div></Div>
//     <div></div>
// </div>;
let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}>
</Carousel>
component.mountTo(document.body);
// console.log(component);


// component.setAttribute("id", "b");