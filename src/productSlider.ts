import styles from './styles/_products.styles.scss';

customElements.define('custom-product',
    class extends HTMLElement {
        constructor() {
            super();

            const template: HTMLTemplateElement = document.getElementById('custom-product-template') as HTMLTemplateElement;
            const templateContent = template.content;
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    }
);

customElements.define('custom-products-bar',
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById('custom-products-bar-template');
            // @ts-ignore
            const templateContent = template.content;
            console.log('templateContent', templateContent)
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const productsStyle = document.createElement('style');
            productsStyle.type = 'text/css';
            productsStyle.appendChild(document.createTextNode(styles));
            shadowRoot.appendChild(productsStyle);
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    }
);