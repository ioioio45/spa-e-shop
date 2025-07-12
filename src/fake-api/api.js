export default function handler(req, res) {
    const products = [
        { id: 1, name: "Футболка", price: 1299 },
        { id: 2, name: "Штаны", price: 2499 }
    ];

    const categories = [
        {id: 1, name: 'Футболки'},
        {id: 2, name: 'Штаны'},
    ];

    const users = [
        {id: 1, name: '', pass: '123', email: 'email', registerDate: 'asd'},
        {id: 2, name: '', pass: '123', email: 'email', registerDate: 'asd'},
    ];
    res.status(200).json({products, categories, users});
}