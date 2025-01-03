var phoneList = [
    {
        img: "images/iphone15.jpg",
        name: "iPhone 15 Pro Max",
        price: 1299,
        desc: "Chip A17 Pro, Camera 48MP, màn 6.7 inch"
    },
    {
        img: "images/iphone15pro.jpg", 
        name: "iPhone 15 Pro",
        price: 999,
        desc: "Chip A17 Pro, Camera 48MP, màn 6.1 inch"
    },
    {
        img: "images/iphone15plus.jpg",
        name: "iPhone 15 Plus",
        price: 899,
        desc: "Chip A16, Camera 48MP, màn 6.7 inch"
    },
    {
        img: "images/iphone15normal.jpg",
        name: "iPhone 15",
        price: 799,
        desc: "Chip A16, Camera 48MP, màn 6.1 inch"
    },
    {
        img: "images/iphone14promax.jpg",
        name: "iPhone 14 Pro Max",
        price: 999,
        desc: "Chip A16, Camera 48MP, màn 6.7 inch"
    },
    {
        img: "images/iphone14pro.jpg",
        name: "iPhone 14 Pro",
        price: 899,
        desc: "Chip A16, Camera 48MP, màn 6.1 inch"
    },
    {
        img: "images/iphone14plus.jpg",
        name: "iPhone 14 Plus",
        price: 799,
        desc: "Chip A15, Camera 12MP, màn 6.7 inch"
    },
    {
        img: "images/iphone14.jpg",
        name: "iPhone 14",
        price: 699,
        desc: "Chip A15, Camera 12MP, màn 6.1 inch"
    },
    {
        img: "images/iphone13.jpg",
        name: "iPhone 13",
        price: 599,
        desc: "Chip A15, Camera 12MP, màn 6.1 inch"
    },
    {
        img: "images/iphone13mini.jpg",
        name: "iPhone 13 Mini",
        price: 499,
        desc: "Chip A15, Camera 12MP, màn 5.4 inch"
    },
    {
        img: "images/iphonese.jpg",
        name: "iPhone SE 2022",
        price: 429,
        desc: "Chip A15, Camera 12MP, màn 4.7 inch"
    },
    {
        img: "images/iphone12.jpg",
        name: "iPhone 12",
        price: 599,
        desc: "Chip A14, Camera 12MP, màn 6.1 inch"
    }
];

var phonetype = 'iphone'

function displayPhone() {
    switch (phonetype) {
        case 'iphone':
            {
                let html = '<div class="row">';
                phoneList.forEach((phone, index) => {
                    if(index > 0 && index % 4 === 0) {
                        html += '</div><div class="row">';
                    }
                    html += `
                        <div class="col-md-3 mb-4">
                            <div class="card">
                                <img src="${phone.img}" class="card-img-top" alt="${phone.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${phone.name}</h5>
                                    <p class="card-text">$${phone.price}</p>
                                    <p class="card-text">${phone.desc}</p>
                                    <button onclick="addToCart('${phone.name}')" class="btn btn-primary">Mua hàng</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
                document.getElementById('phonelist').innerHTML = html;
            }
            break;
    }
}

// Gọi hàm displayPhone khi trang web được tải
document.addEventListener('DOMContentLoaded', function() {
    displayPhone();
});

// Khởi tạo giỏ hàng
let cart = [];

// Hàm thêm vào giỏ hàng
function addToCart(phoneName) {
    const phone = phoneList.find(p => p.name === phoneName);
    const existingItem = cart.find(item => item.name === phoneName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...phone,
            quantity: 1
        });
    }
    
    updateCartCount();

    // Tạo toast mới cho mỗi lần thêm vào giỏ hàng
    const toastContainer = document.querySelector('.toast-container');
    const newToast = document.createElement('div');
    newToast.className = 'toast';
    newToast.innerHTML = `
        <div class="toast-header bg-success text-white">
            <strong class="me-auto">Thông báo</strong>
            <button type="button" class="btn-close" data-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Đã thêm ${phoneName} vào giỏ hàng!
        </div>
    `;
    toastContainer.appendChild(newToast);

    // Hiển thị toast với animation
    setTimeout(() => {
        newToast.classList.add('showing');
    }, 10);

    // Tự động ẩn toast sau 2 giây
    setTimeout(() => {
        newToast.classList.add('hide');
        setTimeout(() => {
            newToast.remove();
        }, 1000); // Đợi animation kết thúc trong 1 giây rồi mới xóa toast
    }, 2000);
}

// Cập nhật số lượng hiển thị trên icon giỏ hàng
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Thay thế hàm showCart cũ bằng toggleCart
function toggleCart(event) {
    event.stopPropagation();
    updateCartDisplay();
    $('#cartModal').modal('show');
}

// Thêm hàm mới để cập nhật nội dung giỏ hàng
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    let html = '';
    let total = 0;

    if (cart.length === 0) {
        html = '<p class="text-center">Giỏ hàng trống</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h6>${item.name}</h6>
                        <p>Giá: $${item.price}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="btn btn-sm btn-secondary" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-secondary" onclick="updateQuantity('${item.name}', 1)">+</button>
                        <button class="btn btn-sm btn-danger ml-2" onclick="removeFromCart('${item.name}')">Xóa</button>
                    </div>
                </div>
            `;
        });
    }

    cartItems.innerHTML = html;
    document.getElementById('totalPrice').textContent = total;
}

// Sửa lại hàm updateQuantity và removeFromCart
function updateQuantity(phoneName, change) {
    const item = cart.find(item => item.name === phoneName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== phoneName);
        }
        updateCartCount();
        updateCartDisplay();
    }
}

function removeFromCart(phoneName) {
    cart = cart.filter(item => item.name !== phoneName);
    updateCartCount();
    updateCartDisplay();
}

// Thêm event listener để đóng dropdown khi click ra ngoài
document.addEventListener('click', function(event) {
    const cartDropdown = document.getElementById('cartDropdown');
    const cart = document.querySelector('.cart');
    
    if (!cart.contains(event.target) && !cartDropdown.contains(event.target)) {
        cartDropdown.style.display = 'none';
    }
});

// Sửa lại hàm checkout
function checkout() {
    if (cart.length > 0) {
        alert('Cảm ơn bạn đã mua hàng!');
        cart = [];
        updateCartCount();
        $('#cartModal').modal('hide');
    }
}