import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateQuantity, removeFromCart, clearCart } from './cartSlice';
import './Cart.scss';

const Cart = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5;
    const total = subtotal + tax + shipping;

    const handleUpdateQuantity = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    if (items.length === 0) {
        return (
            <div className="container cart-empty">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven&apos;t added anything to your cart yet.</p>
                <Link to="/products" className="btn btn--primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h1 className="cart-page__title">Shopping Cart</h1>

            <div className="cart-page__grid">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item__image">
                                <img src={item.image} alt={item.title} />
                            </div>

                            <div className="cart-item__info">
                                <Link to={`/products/${item.id}`} className="cart-item__title">
                                    {item.title}
                                </Link>
                                <p className="cart-item__price">${item.price.toFixed(2)}</p>
                            </div>

                            <div className="cart-item__actions">
                                <div className="quantity-selector">
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button className="cart-item__remove" onClick={() => handleRemove(item.id)}>
                                    Remove
                                </button>
                            </div>

                            <div className="cart-item__total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}

                    <button className="cart-clear" onClick={() => dispatch(clearCart())}>
                        Clear Cart
                    </button>
                </div>

                <div className="cart-summary">
                    <h2 className="cart-summary__title">Order Summary</h2>
                    <div className="cart-summary__row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary__row">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary__row">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="cart-summary__total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout" className="btn btn--primary btn--full" style={{ textAlign: 'center', display: 'block' }}>
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
