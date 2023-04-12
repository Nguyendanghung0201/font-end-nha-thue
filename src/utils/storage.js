class Storage {

    constructor() {
        this._isSupport = true;
        try {
            const test = 'localStorage support test';
            localStorage.setItem('test', test);
            localStorage.removeItem('test')
        } catch (e) {
            this._isSupport = false
        }
    }

    static get timestamp() {
        return new Date() / 1000
    }

    static __isExpired(entity) {
        if (!entity) return true;
        return Storage.timestamp - (entity.timestamp + entity.expired_second) >= 0
    }

    /**
     *
     * @param {String} key
     * @param {mixed} value
     * @param {Number|String} expired_second default is 30 days
     * @returns {null|Storage}
     */
    set(key, value, expired_second = 60 * 60 * 24 * 30) {
        if (!this._isSupport) {
            return this
        }
        expired_second = parseInt(expired_second);
        if (expired_second < 1 || isNaN(expired_second)) expired_second = 60 * 60 * 24 * 30; // default is 30 days

        if (!key && !value) {
            console.error('missing parameter');
            return this
        }
        const entity = {
            timestamp: Storage.timestamp,
            expired_second,
            key,
            value
        };
        localStorage.setItem(key, JSON.stringify(entity));
        return this
    }

    get(key, defaultValue = null) {
        if (!this._isSupport) {
            return defaultValue
        }

        let entity;

        entity = localStorage.getItem(key);
        if (entity) {
            try {
                entity = JSON.parse(entity)
            } catch (e) {
                return defaultValue;
            }
        } else {
            return defaultValue
        }

        if (!entity.expired_second) return entity.value;

        if (Storage.__isExpired(entity)) {
            this.remove(key);
            return defaultValue
        } else {
            return entity.value
        }
    }

    add(key,value){
        if (!this._isSupport) {
            return this
        }
        if (!value) return
        let current = this.get(key)
        if (!current) this.set(key,null)
        let newVal = [].concat(current,value)
        this.set(key,newVal)
        return this
    }

    remove(key) {
        if (!this._isSupport) {
            return this
        }
        if (!key) {
            return this
        }
        localStorage.removeItem(key);
        return this
    }

    clear() {
        if (!this._isSupport) {
            return null
        }
        localStorage.clear();
        return this
    }

}

const StorageExpired = new Storage();

export default StorageExpired
