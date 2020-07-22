import {createElement, Text, Wrapper} from "./createElement.js";
// import {Carousel} from "./carousel.view";

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
        this.position = 0;
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

        let nextPic = () => {
            let nextPosition = (this.position + 1) % this.data.length;

            let current = children[this.position];
            let next = children[nextPosition];

            current.style.transition = "ease 0s";
            next.style.transition  = "ease 0s";

            current.style.transform = `translateX(${ -100 * this.position}%)`;
            next.style.transform = `translateX(${100 -100 * nextPosition}%)`;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    current.style.transition = "ease 0.5s";
                    next.style.transition  = "ease 0.5s";

                    current.style.transform = `translateX(${-100 -100 * this.position}%)`;
                    next.style.transform = `translateX(${-100 * nextPosition}%)`;

                    this.position = nextPosition;
                })
            });

            setTimeout(nextPic, 3000);
        }

        // setTimeout(nextPic, 3000);

         return <div class="carousel">
            {children}
        </div>
    }

    mountTo(parent) {
        // for (let child of this.children) {
        //     // child.mountTo(this.root);
        //     this.slot.appendChild(child);
        // }
        let div = this.render();
        div.mountTo(parent);

        div.addEventListener("mousedown", (event) => {
            let startX = event.clientX, startY = event.clientY;
            let nextPosition = (this.position + 1) % this.data.length;
            let lastPosition = (this.position - 1 + this.data.length) % this.data.length;

            let current = div.children[this.position];
            let last = div.children[lastPosition];
            let next = div.children[nextPosition];

            current.style.transform = `translateX(${ -500 * this.position}px)`;
            last.style.transform = `translateX(${-500 -500 * lastPosition}px)`;
            next.style.transform = `translateX(${500 -500 * nextPosition}px)`;

            current.style.transition = "none";
            last.style.transition = "none";
            next.style.transition = "none";

            let move = (event) => {
                current.style.transform = `translateX(${event.clientX - startX - 500 * this.position}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
                // let range = nearest(event.clientX, event.clientY);
                // range.insertNode(dragable);
            };
            let up = (event) => {
                let offset = 0;

                if(event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX - startX < -250) {
                    offset = -1;
                }

                current.style.transition = "ease .5s";
                last.style.transition = "ease .5s";
                next.style.transition = "ease .5s";

                this.position += offset;

                current.style.transform = `translateX(${offset * 500 - 500 * this.position}px)`;
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

                this.position = (this.position - offset + this.data.length) % this.data.length;
                // baseX = baseX + event.clientX - startX, baseY = baseY + event.clientY - startY;
                document.removeEventListener("mousemove", move)
                document.removeEventListener("mouseup", up)
            };
            document.addEventListener("mousemove", move)
            document.addEventListener("mouseup", up)
        })
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