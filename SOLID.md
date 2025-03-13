## S-Single responsibility principe

- Một class chỉ lên chịu 1 trách nhiệm duy nhất
  VD: Đơn đặt hàng như vd bên dưới class Order chỉ có duy nhất trách nhiệm là 1 đơn hàng.
  Còn class OrderManager sẽ chịu trách nhiệm về quản lý đơn hàng như thêm đơn hàng mới, thêm sản phẩm vào đơn hàng, v.v...

```
class Order {
    constructor( userId ) {
        this.userId = userId
        this.timeOrder = Date.now()
        this.products = []
    }
}

class OrderManager {
    constructor() {
        this.order = null
    }

    //createOrder
    createOrder( userId ) {
        this.order = new Order( userId )
        return this.order
    }

    // addProduct
    addProduct( product) {
        this.order.products.push(product)
    }

    // getOrder
    getOrder() {
        return this.order
    }

    // Lý do viết method này vì nguyên tắc trách nhiệm đơn lẻ
    isValid() {
        return !!this.order.products.length
    }


    // sendOrder
    sendOrder() {
        if(this.isValid()) {
            this.orderSendMail = SendMailOrder();
            return this.orderSendMail.sendMail(this.order)
        }
        return 1;
    }
}

// Lý do tách send mail ra 1 class riêng mà không phải ở orderManager vì nếu để sendMail ở orderManager thì orderManager đang
phải chịu trách nhiệm thêm nhiệm vụ không phải của nó (VD: sendMail dùng của bên thứ 3, hoặc thay đổi api sendMail thì sẽ phải thay đổi cả object orderManager);

class SendMailOrder {
    // sendMail
    sendMail(order) {
        console.log(`Send Mail: `, order)
        return 1;
    }
}

const orderManager = new OrderManager();
orderManager.createOrder('userId-0001');
orderManager.addProduct({
    productId: 101,
    quantity: 2,
    price: 1000,
    unit: 'USD'
});
console.log('Order Info:', orderManager.getOrder());
```

## O-Open Closes Principle

- Đóng để sửa đổi, mở để mở rộng

```
class Socket {
    constructor(tivi, fridge) {
        this.tivi = tivi;
        this.fridge = fridge;
    }

    //connect to devices
    activate() {
        console.log('Connect to Socket')
        this.tivi.connect()
        this.fridge.connect()
    }
}

class Tivi {
    connect() {
        console.log('Connect to TV')
    }
}

class Fridge {
    connect() {
        console.log('Connect to Fridge')
    }
}

//test
const socket = new Socket(new Tivi(), new Fridge());
socket.activate()

//Thêm mới 1 thiết bị kết nối với ổ điện
- Without Open Closes Principle

class Fan {
    connect() {
        console.log('Connect to Fan')
    }
}

<!-- Vi phạm nguyên tắc đóng mở vì khi thêm 1 thiết bị mới thì phải thay đổi class Socket và các method thì Socket 
các bị phụ thuộc vào các class devices khiến khó bảo trì mở rộng -->

class Socket {
    constructor(tivi, fridge, fan) {
        this.tivi = tivi;
        this.fridge = fridge;
        this.fan = fan;
    }

    //connect to devices
    activate() {
        console.log('Connect to Socket')
        this.tivi.connect()
        this.fridge.connect()
        this.fan.connect()
    }
}

- With Open Closes Principle
<!-- Dễ bảo trì và mở rộng  -->
class Socket {
    constructor() {
        this.devices = []
    }

    //add device
    addDevice(device) {
        this.devices.push(device);
    }

    //connect to devices
    activate() {
        this.devices.forEach((device) => {
            device.connect();
        })
    }
}

const socket = new Socket();
socket.addDevice(new Tivi());
socket.addDevice(new Fridge());

socket.activate();

```
