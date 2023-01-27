import Books from '../models/book.model';
import Cart from '../models/cart.model';

/**Add book into cart if cart alreaddy exist
 *  otherwise create cart and add book into it 
 **/
export const addBookToCart = async (_id, body) => {
  const data = await Books.findOne({ _id: _id });
  let bookDetails = {
    'productId': data._id,
    'description': data.description,
    'bookName': data.bookName,
    'bookImage': data.bookImage,
    'author': data.author,
    'price': data.price
}

  if (data != null) {
    const book = []
    const cartData = await Cart.findOne({ userId: body.userId });
    if (cartData == null) {
      book.push(bookDetails)
      body.books = book
      const Createdata = await Cart.create({
        userId: body.userId,
        cart_total: data.price,
        books: body.books

      });
      return Createdata;
    } else {
      const bookExist = await cartData.books.find((value) => value._id == _id);
      console.log(bookExist)
      if (bookExist == null) {
        data.quantity = 1
        cartData.books.push(data)
        cartData.cart_total += data.price
        await cartData.save();
        return cartData

      } else {
        console.log(bookExist.quantity)
        bookExist.quantity += 1;
        cartData.cart_total += bookExist.price
        await cartData.save();
        return cartData
      }
    }
  } else {
    throw new Error("Book dosen't exist");
  }
};

/**remove book from cart if user already exist
 *  otherwise create cart and add book into it 
 **/
export const removeBookFromCart = async (_id, body) => {
  const cartData = await Cart.findOne({ userId: body.userId });
  if (cartData !== null) {
    const bookExist = await cartData.books.find((value) => value._id == _id);
    //console.log(bookExist)

    if (bookExist != null) {
      //console.log(bookExist.quantity)
      if (bookExist.quantity > 1) {
        bookExist.quantity -= 1;
        cartData.cart_total -= bookExist.price
        await cartData.save();
        return cartData
      } else {
        cartData.cart_total -= bookExist.price
        const removedBook = await cartData.books.splice(cartData.books.findIndex(a => a._id == _id), 1)
        cartData.save();
        return cartData
      }

    } else {
      throw new Error("book not exist in cart");
    }
  } else {
    throw new Error("cart dosen't exist");
  }
};