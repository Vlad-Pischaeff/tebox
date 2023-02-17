'use strict';

// ⚠️ it is extra code, should be removed

module.exports = class UserDTO {
    id;

    constructor(model) {
        this.id = model._id.toString();
    }
};
