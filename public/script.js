new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [],
		cart: [],
		loading: false,
		results: []
	},
	methods: {
		addCart(product) {
			this.total += product.price;
			var found = false;
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === product.id) {
					this.cart[i].qty++;
					found = true;
				}
			}
			if (!found) {
				this.cart.push({
					id: product.id,
					title: product.title,
					price: product.price,
					qty: 1
				});
			}
		},
		incQty(i) {
			this.cart[i].qty++;
			this.total += this.cart[i].price;
		},
		decQty(i) {
			if (this.cart[i].qty > 0) {
				this.cart[i].qty--;
				this.total -= this.cart[i].price;
				if (this.cart[i].qty === 0) {
					this.cart.splice(i, 1);
				}
			}
		},
		onSubmit(e) {
			this.produces = [];
			this.loading = true;
			const api = `/search/?q=${e.target[0].value}`;
			this.$http.get(api).then(res => {
				this.products = res.body
				this.loading = false;
			});
		}
	},
	filters: {
		currency: function(price) {
			return `£ ${price.toFixed(2)}`;
		}
	}
});
