import { User } from '../models/index.js';
import { signToken } from '../services/auth.js';

interface saveBookArgs {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image?: string;
  link?: string;
}

const resolvers = {
  Mutation : {
    createUser: async (_parent: any, args: { username: string; email: string; password: string }) => {
    const user = await User.create(args);
    const token = signToken(user.username, user.password, user._id);
    return { token, user };  

  },

  login: async (_parent: any, args: { username?: string; email?: string; password: string }) => {
    const user = await User.findOne({ email: args.email });
    
    if (!user) {
      throw new Error("Can't find this user");
    }

    const correctPw = await user.isCorrectPassword(args.password);

    if (!correctPw) {
      throw new Error('Wrong password!');
    }
    const token = signToken(user.username, user.password, user._id);
    return { token, user };
  },


  saveBook: async (_parent: any, args: { book: saveBookArgs }, context: any ) => {
    console.log(context.user, 'context.user in saveBook resolver');
    if (!context.user) {
      throw new Error('You need to be logged in!');
    }

    const newBook = {
      bookId: args.book.bookId,
      title: args.book.title,
      authors: args.book.authors,
      description: args.book.description,
      image: args.book.image || null,
      link: args.book.link || null
    };
    // Pulling from front end/user input

    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user._id },
      { $addToSet: { savedBooks: newBook } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error('Failed to save the book to savedBooks');
    }

    return updatedUser;
 
  },
  deleteBook: async (_parent: any, args: { bookId: string }, context: any ) => {
    
    if (!context.user) {
      throw new Error('You need to be logged in!');
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { savedBooks: { bookId: args.bookId } } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error('Failed to delete the book from savedBooks');
    }

    return updatedUser;
  },
  
  },
  Query: {
    getSingleUser: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
      const foundUser = await User.findOne({
        _id: context.user._id
      });

      return foundUser;

      }
      else {
        throw new Error('You need to be logged in!');
      }
    }
  },
};

export default resolvers;
