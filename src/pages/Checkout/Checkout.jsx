import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../features/cart/cartSlice';
import './Checkout.scss';

const Checkout = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5;
    const total = subtotal + tax + shipping;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Order Data:', data);
        setIsSubmitted(true);
        dispatch(clearCart());
    };

    if (isSubmitted) {
        return (
            <div className="container checkout-success">
                <div className="checkout-success__content">
                    <div className="checkout-success__icon">✓</div>
                    <h1>Order Confirmed!</h1>
                    <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                    <Link to="/products" className="btn btn--primary">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container checkout-empty">
                <h2>Your cart is empty</h2>
                <Link to="/products" className="btn btn--primary">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="container checkout-page">
            <h1 className="checkout-page__title">Checkout</h1>

            <div className="checkout-page__grid">
                <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                    <section className="checkout-form__section">
                        <h2>Personal Information</h2>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                {...register('fullName', { required: 'Full name is required' })}
                                placeholder="John Doe"
                                className={errors.fullName ? 'error' : ''}
                            />
                            {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                placeholder="john@example.com"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>
                    </section>

                    <section className="checkout-form__section">
                        <h2>Shipping Address</h2>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                {...register('address', { required: 'Address is required' })}
                                placeholder="123 Main St"
                                className={errors.address ? 'error' : ''}
                            />
                            {errors.address && <span className="error-message">{errors.address.message}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    id="city"
                                    {...register('city', { required: 'City is required' })}
                                    placeholder="New York"
                                    className={errors.city ? 'error' : ''}
                                />
                                {errors.city && <span className="error-message">{errors.city.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode">ZIP Code</label>
                                <input
                                    id="zipCode"
                                    {...register('zipCode', { required: 'ZIP is required' })}
                                    placeholder="10001"
                                    className={errors.zipCode ? 'error' : ''}
                                />
                                {errors.zipCode && <span className="error-message">{errors.zipCode.message}</span>}
                            </div>
                        </div>
                    </section>

                    <section className="checkout-form__section">
                        <h2>Payment Details</h2>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                id="cardNumber"
                                {...register('cardNumber', {
                                    required: 'Card number is required',
                                    pattern: {
                                        value: /^\d{16}$/,
                                        message: 'Invalid card number (16 digits)',
                                    },
                                })}
                                placeholder="1234 5678 1234 5678"
                                className={errors.cardNumber ? 'error' : ''}
                            />
                            {errors.cardNumber && <span className="error-message">{errors.cardNumber.message}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiry">Expiry Date</label>
                                <input
                                    id="expiry"
                                    placeholder="MM/YY"
                                    {...register('expiry', {
                                        required: 'Required',
                                        pattern: {
                                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                            message: 'MM/YY',
                                        },
                                    })}
                                    className={errors.expiry ? 'error' : ''}
                                />
                                {errors.expiry && <span className="error-message">{errors.expiry.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    id="cvv"
                                    type="password"
                                    placeholder="123"
                                    {...register('cvv', {
                                        required: 'Required',
                                        pattern: { value: /^\d{3}$/, message: '3 digits' },
                                    })}
                                    className={errors.cvv ? 'error' : ''}
                                />
                                {errors.cvv && <span className="error-message">{errors.cvv.message}</span>}
                            </div>
                        </div>
                    </section>

                    <button type="submit" className="btn btn--primary btn--full checkout-submit">
                        Place Order (${total.toFixed(2)})
                    </button>
                </form>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <div className="checkout-summary__items">
                        {items.map((item) => (
                            <div key={item.id} className="checkout-summary__item">
                                <img src={item.image} alt={item.title} />
                                <div className="details">
                                    <p className="title">{item.title}</p>
                                    <p className="qty">Qty: {item.quantity}</p>
                                </div>
                                <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-summary__totals">
                        <div className="row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="row">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="row total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
