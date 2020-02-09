# E-commerce Website

* The front-end is similar to this one at https://github.com/dungvo0111/ecommercesite, selling Fortnite in-game items. 
* With Node.js, Express and Stripe, this project adds the back-end to allow users to make purchase by card. 
* The back-end is a simple one, which is set up via local host, port 5000. Front-end will send request of the order to that local host server. Then, once the server receives the request, it will send the purchase info and charge request to Stripe. The buyer info and expense can be tracked on seller's Stripe account. As a response, buyer will be notified by a Toast notification on whether the transaction is successful. 
