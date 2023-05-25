

customElements.define('custom-product',
    class extends HTMLElement {
        constructor() {
            super();

            const template: HTMLTemplateElement = document.getElementById('custom-product-template') as HTMLTemplateElement;
            const templateContent = template.content;

            this.attachShadow({ mode: 'open' }).appendChild(
                templateContent.cloneNode(true)
            );
        }
    }
);

const slottedSpan = document.querySelector('my-paragraph span');

console.log(slottedSpan.assignedSlot);
console.log(slottedSpan.slot);