export class Validator {
    constructor (value) {
        this.value = value
        this.result = []
    }
  
    isNotEmpty (msg) {
        if (!this.value) {
            this.result.push(msg)
        }

        return this
    }
    
    isLength (minLength, maxLength, msg) {
        if (this.value.length < minLength || this.value.length > maxLength) {
            this.result.push(msg)
        }
    
        return this
    }
  
    isEmail (msg) {
        if (!/\S+@\S+\.\S+/.test(this.email)) {
            this.result.push(msg)
        }
        
        return this
    }
}