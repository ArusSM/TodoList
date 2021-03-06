class App {
    constructor() {
        this.listDom = document.querySelector("#list");
        this.todoList = []; // 작업들을 저장하는 배열
        this.titleInput = document.querySelector("#title");
        this.contentInput = document.querySelector("#content");
        this.garbage = document.querySelector("#garbage");
        this.msgBox = document.querySelector(".msg-box");

        this.idx = 0;

        this.init(); // 자기의 매서드인 init을 실행하는 것.
    }

    init() {
        this.listDom.innerHTML ="";
        document.querySelector("#addBtn").addEventListener("click", this.addTodo);
        this.garbage.addEventListener("dragover", e => e.preventDefault());
        this.garbage.addEventListener("drop", e => {
            const idx = e.dataTransfer.getData("idx") * 1;
            const target = this.todoList.find(x => x.idx === idx);

            //숙제. 현재 DOM은 지워지지만 todoList에서는 여전히 해당 아이템이 남아있다.
            // 따라서 todoList에서 지워지도록 하는 코드를 이곳에 작성하시고.
            // array splice를 횔용하면 됩니다. 다른 걸 써도 되요. filter를 이용해도 됩니다.
            this.todoList.splice(idx, 1);
            console.log(this.todoList);
            target.dom.classList.remove("spawn");
            target.dom.classList.add("off");
            setTimeout(() => {
               this.showToast("글 삭제가 완료되었습니다.");
               target.dom.remove(); 
            }, 1000);
            //숙제2. 삭제될 때 뿐 아니라 나타날 때도 애니메이션 되서 나타나도록 만드세요.
        });
    }

    //이벤트리스너용 매서드는 반드시 화살표함수로 지정해야 this 바인딩에 문제가 없다.
    addTodo = () => {
        const title = this.titleInput.value;
        const content = this.contentInput.value;
        //여기서 title === "" 또는 content === "" 이면 alert으로 경고를 띄우고 삽입되지 않게
        if(title === "" || content === "") {
            alert("제목이나 내용이 비어있으면 삽입할 수 없습니다.");
            return;
        }
        // DOM을 만들어서 listDom의 자식으로 넣어준다.
        const idx = ++this.idx;
        const dom = this.makeTodoDom({idx, title, content});

        dom.addEventListener("dragstart", e => {
            e.dataTransfer.setData("idx", idx);
        });
        this.todoList.push({ idx, title, content, dom });
        setTimeout(() => {
            dom.classList.add("spawn");    
        }, 0);
        
        this.listDom.appendChild(dom);
        //2. 여기서 삽입이 된 후에는 titleInput과 contentInput에 입력한 내용이 지워지도록
        // this.titleInput.value = "";
        this.titleInput.value = "";
        this.contentInput.value = "";
        this.showToast("글 작성이 완료되었습니다.");
    }

    makeTodoDom({idx, title, content}) {
        let div = document.createElement("div");
        div.innerHTML = 
            `<div class="item" data-idx="${idx}" draggable="true">
                <h4 class="title">${title}</h4>
                <span class="msg">${content}</span>
            </div>`;
        ;
        return div.firstChild;
    }

    showToast(msg) {
        this.msgBox.innerHTML = msg;
        this.msgBox.classList.add("on");
        setTimeout(() => {
            this.msgBox.classList.remove("on");
        }, 2000);
    }
}

window.onload = function() {
    const app = new App();
};