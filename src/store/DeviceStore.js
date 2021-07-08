import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedDevice = {}
        this._page = 1
        this._totalCounts = 0
        this._limit = 12
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedDevice(device){
        this._selectedDevice = device
    }

    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }

    setPage(page) {
        this._page = page
    }
    setTotalPages(total) {
        this._totalCounts = total
    }
    setLimit(limit) {
        this._limit = limit
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get selectedDevice() {
        return this._selectedDevice
    }

    get page() {
        return this._page
    }
    get totalPages() {
        return this._totalCounts
    }
    get limit() {
        return this._limit
    }
}
