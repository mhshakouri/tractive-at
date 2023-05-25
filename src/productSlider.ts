import productsBarStyles from './styles/_products.styles.scss';
import productStyles from './styles/_product.styles.scss';
import { Product, products } from './scripts/mockdata';

customElements.define('custom-product',
    class extends HTMLElement {
        product!: Product
        constructor() {
            super();
            const template = document.getElementById('custom-product-template') as HTMLTemplateElement;
            const templateContent = template.content;
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const productStyle = document.createElement('style');
            productStyle.type = 'text/css';
            productStyle.appendChild(document.createTextNode(productStyles));
            shadowRoot.appendChild(productStyle);
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
        get productId() {
            return this.getAttribute('productid');
        }
        get productInfo() {
            return products.find(product => product.id === this.productId)
        }
        connectedCallback() {
            this.product = this.productInfo
            const productLink = this.shadowRoot.querySelector('a')
            productLink.href = this.product.link
            const productImage = this.shadowRoot.querySelector('img');
            productImage.setAttribute('src', this.product.img)
            productImage.setAttribute('alt', this.product.name)
            const productName = this.shadowRoot.querySelector('.name')
            productName.textContent = this.product.name
            const productPrice = this.shadowRoot.querySelector('.price')
            productPrice.textContent = this.product.price
            const productCtaText = this.shadowRoot.querySelector('button')
            productCtaText.textContent = 'Add to Cart'
        }


    }
);

customElements.define('custom-products-bar',
    class extends HTMLElement {
        scrollPercentage: number = 0
        settingScrollFromInput: boolean = false
        constructor() {
            super();
            const template = document.getElementById('custom-products-bar-template') as HTMLTemplateElement;
            const templateContent = template.content;
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const productsStyle = document.createElement('style');
            productsStyle.type = 'text/css';
            productsStyle.appendChild(document.createTextNode(productsBarStyles));
            shadowRoot.appendChild(productsStyle);
            const productsList = document.createElement('ul');
            products.forEach(product => {
                const productElement = `<custom-product productid="${product.id}"></custom-product>`
                productsList.innerHTML = `${productsList.innerHTML}${productElement}`
            })
            templateContent.querySelector('#productsPlaceholder').innerHTML = productsList.innerHTML

            // binding methods
            this.productsListScrollEventHandler = this.productsListScrollEventHandler.bind(this);
            this.sliderBarInputChangeEventHandler = this.sliderBarInputChangeEventHandler.bind(this);

            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
        get productsList(): HTMLElement {
            return this.shadowRoot.querySelector('#productsPlaceholder')
        }
        get slideBar(): HTMLElement {
            return this.shadowRoot.querySelector('.slidebar')
        }
        get sliderBarRangeInput(): HTMLInputElement {
            return this.slideBar.querySelector('input')
        }
        productsListScrollEventHandler() {
            if (!this.settingScrollFromInput) {
                this.scrollPercentage = (this.productsList.scrollLeft * 100) / Math.round((this.productsList.scrollWidth / 2.3))
                this.sliderBarRangeInput.value = this.scrollPercentage.toString()
                return
            }
            this.settingScrollFromInput = false
        }
        sliderBarInputChangeEventHandler() {
            this.settingScrollFromInput = true
            this.scrollPercentage = parseInt(this.sliderBarRangeInput.value)
            this.productsList.scrollLeft = ((this.scrollPercentage * this.productsList.scrollWidth) / 100) / 2.1
        }
        connectedCallback() {
            this.productsList.addEventListener('scroll', this.productsListScrollEventHandler)
            this.sliderBarRangeInput.addEventListener('change', this.sliderBarInputChangeEventHandler)
            this.sliderBarRangeInput.addEventListener('input', this.sliderBarInputChangeEventHandler)
        }

    }
);