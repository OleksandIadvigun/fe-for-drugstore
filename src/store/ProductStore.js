import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._size = 6
        this._page = 0
        this._search = ''
        this._sortField = 'price'
        this._sortDirection = 'ASC'
        this._products = []
        this._popularProducts = []
        this._orderNumber = ''
        this._selectedProduct = {}
        this._cartNumber = 0
        this._orderNumbers = []
        this._orderBought = []
        this._orderItems = []
        this._payment = false
        makeAutoObservable(this)
    }

    setPayment(boolean){
        this._payment = boolean
    }

    setSize(size) {
        this._size = size
    }

    setPage(page) {
        this._page = page
    }

    setProducts(products) {
        this._products = products
    }

    setPopularProducts(products) {
        this._popularProducts = products
    }

    setSearch(search) {
        this._search = search
    }

    setSelectedProduct(product) {
        this._selectedProduct = product
    }

    setSortField(sortField) {
        this._sortField = sortField
    }

    setSortDirection(sortDirection) {
        this._sortDirection = sortDirection
    }

    setTotalPages(total) {
        this._totalCounts = total
    }

    setLimit(limit) {
        this._limit = limit
    }

    setOrderItems(orderItems) {
        this._orderItems = orderItems
    }

    setOrderNumber(orderId) {
        this._orderNumber = orderId
    }

    setCartNumber(number){
        this._cartNumber = number
    }

    setOrderNumbers(numbers){
        this._orderNumbers = numbers
    }

    setOrderBought(number){
        this._orderBought = number
    }

    get size() {
        return this._size
    }

    get page() {
        return this._page
    }

    get products() {
        return this._products
    }

    get popularProducts() {
        return this._popularProducts
    }

    get search() {
        return this._search
    }

    get sortField() {
        return this._sortField
    }

    get selectedProduct() {
        return this._selectedProduct
    }

    get sortDirection() {
        return this._sortDirection
    }

    get totalPages() {
        return this._totalCounts
    }

    get limit() {
        return this._limit
    }

    get orderItems() {
        return this._orderItems
    }

    get orderNumber() {
        return this._orderNumber
    }
    get cartNumber(){
        return this._cartNumber
    }
    get orderNumbers(){
        return this._orderNumbers
    }
    get orderBought(){
        return this._orderBought
    }
    get payment(){
        return this._payment
    }
}
