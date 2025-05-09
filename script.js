// To-Do List App
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
}

// Add todo to DOM
function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center p-2 bg-white rounded shadow';
    li.innerHTML = `
        <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
        <div>
            <button class="toggle-todo text-blue-800 mr-2" data-id="${todo.id}">✔</button>
            <button class="delete-todo text-red-600" data-id="${todo.id}">🗑</button>
        </div>
    `;
    todoList.appendChild(li);
}

// Save todos to localStorage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
addTodoButton.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        const todo = {
            id: Date.now(),
            text,
            completed: false
        };
        addTodoToDOM(todo);
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        saveTodos(todos);
        todoInput.value = '';
    }
});

// Handle todo actions
todoList.addEventListener('click', (e) => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains('delete-todo')) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        saveTodos(updatedTodos);
        todoList.innerHTML = '';
        loadTodos();
    }

    if (e.target.classList.contains('toggle-todo')) {
        const todo = todos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        saveTodos(todos);
        todoList.innerHTML = '';
        loadTodos();
    }
});

// Load todos on page load
loadTodos();

// Product Listing
const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999.99, rating: 4.5 },
    { id: 2, name: 'T-Shirt', category: 'clothing', price: 19.99, rating: 3.8 },
    { id: 3, name: 'Novel', category: 'books', price: 14.99, rating: 4.2 },
    { id: 4, name: 'Smartphone', category: 'electronics', price: 699.99, rating: 4.7 },
    { id: 5, name: 'Jeans', category: 'clothing', price: 49.99, rating: 4.0 },
    { id: 6, name: 'Textbook', category: 'books', price: 89.99, rating: 4.3 }
];

const productGrid = document.getElementById('product-grid');
const categoryFilter = document.getElementById('category-filter');
const sortOption = document.getElementById('sort-option');

// Render products
function renderProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card bg-gray-100 p-4 rounded-lg shadow-md';
        div.innerHTML = `
            <h3 class="text-lg font-semibold">${product.name}</h3>
            <p class="text-gray-600">Category: ${product.category}</p>
            <p class="text-gray-600">Price: $${product.price.toFixed(2)}</p>
            <p class="text-gray-600">Rating: ${product.rating}</p>
        `;
        productGrid.appendChild(div);
    });
}

// Filter and sort products
function updateProducts() {
    let filteredProducts = [...products];
    const category = categoryFilter.value;
    const sort = sortOption.value;

    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Sort products
    filteredProducts.sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'rating-desc') return b.rating - a.rating;
        return 0;
    });

    renderProducts(filteredProducts);
}

// Event listeners for filters and sorting
categoryFilter.addEventListener('change', updateProducts);
sortOption.addEventListener('change', updateProducts);

// Initial render
updateProducts();