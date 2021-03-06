'use strict';

var mongoose = require('mongoose');

var ForumThreadSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true
    },
    numberOfViews: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        ref: 'ForumCategory',
        trim: false,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: false,
        required: true
    },
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    deleted: Boolean
}, {
    timestamps: true
});


/**
 * Pre hook
 */

function findNotDeletedMiddleware(next) {
    this.where('deleted').in([false, undefined, null]);
    next();
}

ForumThreadSchema.pre('find', findNotDeletedMiddleware);
ForumThreadSchema.pre('findOne', findNotDeletedMiddleware);
ForumThreadSchema.pre('findOneAndUpdate', findNotDeletedMiddleware);
ForumThreadSchema.pre('count', findNotDeletedMiddleware);


/**
 * Methods
 */

ForumThreadSchema.methods = {

    /**
     * delete - change deleted attribute to true
     *
     * @param {Function} next
     * @api public
     */
    delete: function(next) {
        this.deleted = true;
        this.save(next);
    },

    /**
     * addView - add a visit to Forumthread
     *
     * @api public
     */
    addView: function() {
        if (this.numberOfViews) {
            this.numberOfViews++;
        } else {
            this.numberOfViews = 1;
        }
    }
};

module.exports = mongoose.model('ForumThread', ForumThreadSchema);
