## Strategy Pattern

- Giúp hệ thống 1 cách rõ ràng, dễ dàng mở rộng hệ thống hơn.
  Dưới đây là ví dụ về tính toán giá khi dùng voucher e-Commerce

```
/*
* Giá mặc định
* @params {*} originalPrice
* @return
*/

function defaultPrice(originalPrice) {
    return originalPrice
}

/*
* Giá đặt trước
* @params {*} originalPrice
* @return
*/

function preOrderPrice(originalPrice) {
    return originalPrice * 0.9
}

/*
* Giá black friday
* @params {*} originalPrice
* @return
*/

function defaultPrice(originalPrice) {
    return originalPrice * 0.6
}

/*
* Giá sale 11.11
* @params {*} originalPrice
* @return
*/

function defaultPrice(originalPrice) {
    return originalPrice * 0.8
}

- Dùng object ở đây vì sẽ có nhiều case và dễ scale trong tương lai (Nếu cần còn nếu không có thể dùng IF ELSE)
const getPriceStrategies= {
    blackFriday: blackFridayPrice,
    11.11: 11daysPrice,
    default: defaultPrice,
}

function getPrice(originalPrice, typePromotion) {
    return getPriceStrategies[typePromotion](originalPrice)
}
```

## Observer Pattern

- Xử lý thông báo hành động của 1 phần tử trong 1 nhóm chung.
  VD: Như khi vào 1 group chat thì khi có 1 người nhắn tin vào group thì các thành viên có trong nhóm đó sẽ nhận được
  thông báo về hành động đó. Và khi có người mới vào thì thông báo cũng sẽ được gửi cho người đó.

```
class Observer {
    let namePick;
    constructor(name) {
        //ES13
        <!-- this.namePick = name; -->
        namePick = name;
    }

    goToHelp(location) {
        console.log(namePick + ":::PING:::" + location)
    }

    updateStatus(location) {
        goToHelp(location)
    }
}

class Subject {
    - Khai báo mảng Observer
    let observerList = [];
    constructor() {
        observerList = [];
    }

    - Add những object Observer vào mảng chung
    addObserver(observer) {
        this.observerList.push(observer)
    }

    - Khi gọi hàm notify này sẽ truyền tới tất cả các object Observer có trong mảng observerList
    notify(location) {
        this.observerList.forEach(observer => observer.updateStatus(location))
    }
}

const subject = new Subject();

const riki = new Observer('riki');
const sniper = new Observer('sniper');

subject.addObserver(riki);
subject.addObserver(sniper);

subject.notify('long 151, lat 200');

Push và Pull ở các hệ thống lớn trong mô hình observer pattern
```

## Facade Pattern

- Đưa ra cách sử dụng 1 cách đơn giản nhất và ẩn đi quá trình xử lý phức tạp bên trong.
  VD: gọi 1 hàm để xử lý buy(price) với price là params, ẩn đi function xử lý tính toán giá.

```
class Discount {
    calc(value) {
        return value * 0.9
    }
}

class Shipping {
    calc() {
        return 5; //5 nghìn
    }
}

class Fees {
    calc(value) {
        return value * 1.05
    }
}

class ShopeeFacadePattern {
    let discount = null;
    let shipping = null;
    let fees = null;

    constructor() {
        discount = new Discount();
        shipping = new Shipping();
        fees = new Fees();
    }

    calc(price) {
        price = discount.calc(price);
        price = fees.calc(price);
        price += shipping.calc();

        return price;
    }
}

function buy(price) {
    const shopee = new ShopeeFacadePattern();

    console.log(shopee.calc(price));
}

```

## Proxy Pattern

- Gần giống như việc tạo ra 1 lớp trung gian để xử lý nhanh hơn thay thì xử lý trực tiếp giữa 2 object.
  VD: Khi muốn rút tiền từ ngân hàng thay vì phải ra làm việc trực tiếp với ngân hàng (Nhiều người cùng đến
  xử lý 1 lúc sẽ rất mất thời gian) thì sẽ đến các cây ATM vừa xử lý nhanh gọn và tiện lợi vì có nhiều hơn ngân hàng.
- Thực tế trong code là RestAPI của mình bị lộ end-points sẽ có nguy cơ dẫn đến bị các cuộc tấn công mạng nên ta cần
  1 proxy đứng trung

```
class Leader {
    receiveRequest(offer) {
        console.log(`result:::${offer}`)
    }
}

class Secretary {
    constructor() {
        this.leader = new Leader()
    }

    receiveRequest(offer) {
        this.leader.receiveRequest(offer)
    }
}

class Developer {
    constructor(offer) {
        this.offer = offer
    }

    //Gửi đến thư ký
    applyFor(target) {
        target.receiveRequest(this.offer)
    }
}

const devs = new Developer('anonsytick upto 5K USD')
devs.applyFor(new Secretary())
```

## Factory Pattern

- Simple Factory Pattern ưu điểm là được cung cấp 1 cơ chế đặc biệt để tạo đối tượng tách biệt việc tạo đối tượng với sử dụng đối tượng.
  Nhược điểm: Tập trung vào tính logic để tạo ra sản phẩm nên hàm xử lý rất nặng nề, nếu hàm lỗi thì sẽ lỗi cả hệ thống.

```
// without simple factory pattern

const serviceLogistics = (cargoVolume) => {
    switch (cargoVolume) {
        case '10':
            return {
                name: 'Truck 10'
                doors: 6,
                price: '100.000 VND'
            }

        case '20':
            return {
                name: 'Truck 20'
                doors: 16,
                price: '1.000.000 VND'
            }
    }
}

// with simple factory pattern
class ServiceLogistics {
    constructor(doors = 6, price = '100.000 VND', name = 'Truck 10') {
        this.name = name;
        this.doors = doors;
        this.price = price;
    }

    static getTransport = (cargoVolume) => {
        switch (cargoVolume) {
            case '10':
                return new ServiceLogistics()

            case '20':
                return new ServiceLogistics(16, '1.000.000 VND', 'Truck 20')
        }
    }
}
```

- Factory method giúp tránh việc sửa đổi phương thức sẵn có. Ví dụ như ở trên chúng ta đang
  thực hiện vận chuyển với xe tải nhưng khi mở rộng vận chuyển bằng đường thủy hoặc hàng không
  thì sẽ phải sửa đổi methods của class ServiceLogistics.

```
//create service Car
class Car {
    constructor(name = 'Ford', doors = 4, price = '10 VND' customerInfo = {}) {
        this.name = name;
        this.doors = doors;
        this.price = price;
        this.customerInfo = customerInfo;
    }
}


//create service Logistics
class ServiceLogistics {
    transportClass = Car;
    getTransport (customerInfo) => {
        return new this.transportClass(customerInfo)
    }
}

// order for customer by Car
const carService = new ServiceLogistics();
console.log('CarService:', carService.getTransport({
    customerInfo: {
        name: 'Tu',
        cargoVolume: '100 kg'
    }
}))

// Cach 1:
class Truck {
    constructor(name = 'Container', doors = 16, price = '100 VND' customerInfo = {}) {
        this.name = name;
        this.doors = doors;
        this.price = price;
        this.customerInfo = customerInfo;
    }
}

carService.transportClass = Truck
console.log('Truck Service', carService.getTransport({
    customerInfo: {
        name: 'TuVan',
        cargoVolume: '1000kg'
    }
}))

// Cach 2: Nên làm theo cách này vì tách riêng biệt
class TruckService extends ServiceLogistics {
    transportClass = Truck
}

const truckService = new TruckService();
console.log('Truck Service', truckService.getTransport({
    customerInfo: {
        name: 'TuVan',
        cargoVolume: '1000kg'
    }
}))
```

## Singleton Pattern

- Đảm bảo chỉ có duy nhất 1 instance để tránh lẵng phí tài nguyên

```
class RoundRobin {
    constructor() {
        // Mục đính là tránh tạo ra 1 object khác nhau trong cùng class để sử dụng singleton
        if(RoundRobin.instance) {
            reeturn RoundRobin.instance;
        }
        RoundRobin = this;
        this.servers = []
        this.index = 0
    }

    //add server
    addServer( server ) {
        this.servers.push(server);
    }

    isValid() {
        return !!this.servers.length
    }

    // get next server
    getNextServer () {
        if(this.isValid()) {
            throw new Error('No server available')
        }

        const server = this.server[this.index];
        // modules
        this.index = (this.index + 1) % this.servers.length;
        return server;
    }
}

const loadBalancer = new RoundRobin()
const loadBalancer1 = new RoundRobin()

loadBalancer.addServer('Server 01');
loadBalancer.addServer('Server 02');
loadBalancer.addServer('Server 03');

console.log(loadBalancer.getNextServer()) // Server 01
console.log(loadBalancer.getNextServer()) // 02
console.log(loadBalancer.getNextServer()) // 03
console.log(loadBalancer.getNextServer()) // 01
console.log(loadBalancer.getNextServer()) // 02
```

## Prototype Pattern

```
// define a prototype object for fifa online

class FifaOnlinePlayer {
    constructor( name, team, position, goals ) {
        this.name = name;
        this.team = team;
        this.position = position;
        this.goals = goals;
    }

    score() {
        this.goals++;
    }

    clone() {
        return new FifaOnlinePlayer(this.name, this.team, this.position, this.goals);
    }
}

FifaOnlinePlayer.prototype.starts = {
    minutesPayler: 0
}

// Create a new fifa online player prototype

const prototype = new FifaOnlinePlayer('CR7', 'Al', 'ST', 0);

// Create multiple instance of the fifa online player
const cr7 = prototype.clone();
cr7.starts.minusPlayed = 1000;
const m10 = prototype.clone();
m10.name = 'Messi';
m10.team = 'PSG';

cr7.score();
```

## Builder Pattern

- Chia 1 đối tượng phức tạp thành các phần nhỏ để dễ xử lý hơn.

```
class FifaOnlinePlayer {
    constructor( name, team, position, goals, starts ) {
        this.name = name;
        this.team = team;
        this.position = position;
        this.goals = goals;
        this.starts = starts;
    }
}

class FifaOnlinePlayerBuilder {
    constructor( name, team, position, goals, starts ) {
        this.name = '';
        this.team = '';
        this.position = '';
        this.goals = 0;
        this.starts = {};
    }

    withName( name ) {
        this.name = name;
        return this;
    }

    withTeam( team ) {
        this.team = team;
        return this;
    }

    withPosition( position ) {
        this.position = position;
        return this;
    }

    withGoals( goals ) {
        this.goals = goals;
        return this;
    }

    withStarts( starts ) {
        this.starts = starts;
        return this;
    }
}

const builderPattern = new FifaOnlinePlayerBuilder();

const cr7 = builderPattern
            .withName('Cr7')
            .withAge(39)
            .build()
```

## Adapter Pattern
- Mô hình chuyển đổi từ các mô hình không đồng nhất sang đồng nhất

```
// define the MomoPaymentAdapter class
class MomoPaymentAdapter {
    constructor( momoPayment ) {
        this.momoPayment = momoPayment;
    }

    //define the payWithVisa method that is required by the youtube registration process
    payWithVisa( visaPayment ) {
        const convertedPayment = this.convertToVisaPayment(this.momoPayment);

        visaPayment.pay(convertedPayment)
    }

    convertToVisaPayment( momoPayment ) {
        //convert to visa
        const conversionRate = 23000;
        const visaAmount = momoPayment.amount / conversionRate;
        const visaPayment = {
            cardNumber: momoPayment.cardNumber,
            expiredDate: momoPayment.expiredDate,
            cvv: momoPayment.cvv,
            amount: visaAmount,
        }

        return visaPayment;
    }
}

class VisaPayment {
    pay( payment ) {
        console.log(`Paying ${payment.amount} USD with Visa card ${payment.cardNumber}`)
        //TODO: payment processing logic...
    }
}

// define the MomoPayment
class MomoPayment {
    constructor(cardNumber, expiredDate, cvv, visaAmount) {
        this.cardNumber = cardNumber;
        this.expiredDate = expiredDate;
        this.cvv = cvv;
        this.amount = visaAmount;
    }
}

// create a momo
const momoPayment = new MomoPayment('123456789', '12/25', '123', 230000)

// Create a momo-to-visa adapter
const momoAdapter = new MomoPaymentAdapter(momoPayment);

// Create a visa payment
const visaPayment = new VisaPayment();

//Registration for Youtube 
momoAdapter.payWithVisa(visaPayment);
```