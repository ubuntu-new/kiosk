const state = () => ( {
    cart: [],
    dineOption: null,
    productList: null,
    pizzaList: [],
    ingredients: [],
});

const mutations = {
    'dine_option'(state, payload){
        state.dineOption = payload
    },
    'product_list'(state, payload){
        state.productList = payload
    },
    'pizza_list'(state, payload){
        state.pizzaList = payload
    },
    'ingredients_list'(state, payload){
        state.ingredients = payload
    },
    'add_to_cart'(state, payload){
        state.cart.push(payload);
    },
    'clear_cart'(state){
        state.cart = []
    },
    'DELETE_CART'(state, id){
        const currentCartToDelete = state.cart
        const indexToDelete = currentCartToDelete.findIndex(cart => {
            return cart.id == id
        })

        state.cart = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)]
        // state.totalAmount = totals(state.cart).amount
        // state.totalQuantity = totals(state.cart).qty
    },
};

const actions = {
    dineOption({commit}, payload) {
        commit('dine_option', payload)
    },
    addProductList({commit}, payload) {
        commit('product_list', payload)
    },
    addPizzaList({commit}, payload) {
        commit('pizza_list', payload)
    },
    addIngredientsList({commit}, payload) {
        commit('ingredients_list', payload)
    },
    addToCart({commit}, payload){
        commit('add_to_cart', payload)
    },
    clearCart({commit}){
        commit('clear_cart')
    },
    deleteCart({ commit }, id){
        commit('DELETE_CART', id)
    },
};

const getters = {
    dineOption(state) {
        return state.dineOption
    },
    productList(state) {
        return state.productList
    },
    pizzaList(state){
        return state.pizzaList
    },
    ingredientsList(state) {
        return state.ingredients
    },
    cartList(state) {
        return state.cart
    },
    cartTotalPrice(state){
        var totalPrice = 0;

        state.cart.forEach(x => {
            totalPrice = totalPrice + (Number(x.price) * Number(x.qty))
        });

        return totalPrice.toFixed(2)
    },
};

export default{
    // state, mutations, actions, getters
    state, mutations, actions, getters
};