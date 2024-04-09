const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        me: async() => {
            return User.find();
        }
    },

    Mutation:{
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return{token, user};
        },
        
        login: async(parent, {email, password}) => {
        const user = await User.findOne({email, password});
        if(!user){
            throw new AuthenticationError('Incorrect Login');
        }
        const correctPw = await User.isCorrectPassword(password);
        if(!correctPw){
            throw new AuthenticationError('Incorrect Login');
        }
        const token = signToken(user);
        return {token, user};
    },

    saveBook: async(parent, {book}, context) => {
        if(context.user){
            const updateUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: args.input}},
                {new: true}
            )
            return updateUser;
        }
    },
    deleteBook: async(parent, {book}, context) =>{
        if(context.user){
            const updateUser = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$pull: {saveBook: {bookId: args.bookId}}},
                {new:true}
            )
            return updateUser;
        }
    }
}
}

module.exports = resolvers;